import { lodash } from 'stan-utils';
import { Enum, MapField, Method, Namespace, ReflectionObject, Service, Type } from 'protobufjs';
import {
  formatTS,
  getFieldIsRequired,
  getNamespaceRoot,
  getParentLookup,
  getReflectionParentName,
  isNamespace,
  protoTypeToTSType,
} from './util';
import type {
  Visitor,
  VisitorFNReturnType,
  TSServiceItemDeclarationContent,
  TSMessageDeclarationContent,
  TSEnumDeclarationContent,
  TSServiceDeclarationContent,
} from './type';

const dtsTemplate = `<%= comment %>
declare namespace <%= namespace %> {
<%= content %>
}`;

const interfaceTemplate = `<%= comment %>
export interface <%= name %> {
<%= content %>
}`;

const enumTemplate = `<%= comment %>
export enum <%= name %> {
<%= content %>
}`;

const serviceTemplate = `<%= comment %>
export interface <%= name %>Service {
<%= content %>
}`;

const serviceFNTemplate = `<%= comment %>
<%= name %><R extends <%= requestType %>, O>(r: R, o?: O): Promise<<%= responseType %>>,`;

const dtsExecutor = lodash.template(dtsTemplate);
const interfaceExecutor = lodash.template(interfaceTemplate);
const enumExecutor = lodash.template(enumTemplate);
const serviceExecutor = lodash.template(serviceTemplate);
const serviceFNExecutor = lodash.template(serviceFNTemplate);

/**
 * Parsed proto content to dts content
 * @description Nested message names will be spliced by _
 * @param namespace {Namespace}
 * @param filename {string}
 * @param visitor {Visitor}
 * @returns dts content
 */
function parseNamespace(namespace: Namespace, filename?: string, visitor?: Visitor): string {
  const moduleName = namespace.name;

  const parsedNestedList: string[] = [];

  // record generation history to prevent repeated generation
  const hasGenMap = {
    enums: new Map<string, TSEnumDeclarationContent>(),
    services: new Map<string, TSServiceDeclarationContent>(),
    interfaces: new Map<string, TSMessageDeclarationContent>(),
  };

  // construct the name of the message embedded in the message
  function replaceNamespacePrefix(name: string, field?: ReflectionObject) {
    const _filename = namespace.lookup(name)?.filename;
    // not current namespace types
    if (_filename !== filename) {
      const arr = name.split('.');
      // other files, search from the GoogleProtoFilesRoot
      const lastNamespaceIndex = arr.findIndex(
        (_, index) =>
          !isNamespace(getNamespaceRoot(namespace).lookup(arr.slice(0, index + 1).join('.'))!),
      );
      if (!lastNamespaceIndex) {
        return name;
      }
      return [arr.slice(0, lastNamespaceIndex).join('.'), arr.slice(lastNamespaceIndex).join('_')]
        .filter(String)
        .join('.');
    }
    if (field && !name.includes('.')) {
      if (isNamespace(field.parent!)) {
        return name;
      }
      name = `${getReflectionParentName(field)}_${name}`;
    }
    return name.replace(new RegExp(`^${moduleName}_`), '').replace(/\./g, '_');
  }

  // gen common
  function genComment(str?: string | null) {
    if (!str) return '';
    const lines = str.replace(/\r\n/g, '/n').split('\n');
    return lines.map((v) => `// ${v}`).join('\n');
  }

  // process interface
  function processType(name: string, nested: Type): TSMessageDeclarationContent {
    const comment = genComment(nested.comment!);

    const schema: TSMessageDeclarationContent = {
      name,
      comment,
      fieldList: nested.fieldsArray.reduce<TSMessageDeclarationContent['fieldList']>(
        (acc, field) => {
          const childrenNested = getParentLookup({
            field,
            root: namespace,
            type: field.type,
          });
          const endPrefix = field.repeated ? '[]' : '';

          acc.push({
            key: field.name,
            reflection: childrenNested,
            comment: genComment(field.comment),
            isRequired: getFieldIsRequired(field),
            isArray: field.repeated,
            isMap: field instanceof MapField,
            value:
              field instanceof MapField
                ? `Record<${protoTypeToTSType(field.keyType)}, ${
                    childrenNested
                      ? replaceNamespacePrefix(field.type, childrenNested)
                      : protoTypeToTSType(field.type) || replaceNamespacePrefix(field.type)
                  }>;`
                : `${
                    childrenNested
                      ? replaceNamespacePrefix(field.type, childrenNested)
                      : protoTypeToTSType(field.type) || replaceNamespacePrefix(field.type)
                  }${endPrefix};`,
          });
          return acc;
        },
        [],
      ),
    };

    function parse() {
      let content: VisitorFNReturnType;

      if (visitor?.TSMessageDeclaration) {
        content = visitor.TSMessageDeclaration(schema, nested);
      }

      if (content === false) return '';
      if (content) return content;

      return interfaceExecutor({
        name,
        comment,
        content: nested.fieldsArray
          .reduce<string[]>((acc, field) => {
            const childrenNested = getParentLookup({ field, root: namespace, type: field.type });
            if (field.comment) {
              acc.push(genComment(field.comment));
            }
            const endPrefix = field.repeated ? '[]' : '';
            let fieldContent = `${field.name}${getFieldIsRequired(field) ? '' : '?'}: `;
            if (field instanceof MapField) {
              fieldContent += `Record<${protoTypeToTSType(field.keyType)}, ${
                childrenNested
                  ? replaceNamespacePrefix(field.type, childrenNested)
                  : protoTypeToTSType(field.type) || replaceNamespacePrefix(field.type)
              }>;`;
            } else {
              fieldContent += `${
                childrenNested
                  ? replaceNamespacePrefix(field.type, childrenNested)
                  : protoTypeToTSType(field.type) || replaceNamespacePrefix(field.type)
              }${endPrefix};`;
            }
            acc.push(fieldContent);
            return acc;
          }, [])
          .join('\n'),
      });
    }

    parsedNestedList.push(parse());

    return schema;
  }

  // process enum
  function processEnum(name: string, nested: Enum): TSEnumDeclarationContent {
    const comment = genComment(nested.comment!);

    const schema = {
      name,
      comment,
      fieldList: Object.keys(nested.values).map((key) => ({
        key,
        value: nested.values[key],
        comment: genComment(nested.comments?.[key]),
      })),
    };

    function parse() {
      let content: VisitorFNReturnType;

      if (visitor?.TSEnumDeclaration) {
        content = visitor.TSEnumDeclaration!(schema, nested);
      }

      if (content === false) return '';
      if (content) return content;

      return enumExecutor({
        name,
        comment,
        content: Object.keys(nested.values)
          .reduce<string[]>((acc, field) => {
            if (nested.comments?.[field]) {
              acc.push(genComment(nested.comments[field]));
            }
            acc.push(`${field} = ${nested.values[field]},`);
            return acc;
          }, [])
          .join('\n'),
      });
    }

    parsedNestedList.push(parse());

    return schema;
  }

  // process service
  function processService(name: string, nested: Service): TSServiceDeclarationContent {
    const comment = genComment(nested.comment!);

    function handleFieldItemObj(field: Method): TSServiceItemDeclarationContent {
      return {
        name: field.name,
        requestType: replaceNamespacePrefix(field.requestType),
        responseType: replaceNamespacePrefix(field.responseType),
        options: field.options,
        comment:
          genComment(field.comment) +
          // services options as remark
          (field.options
            ? Object.keys(field.options!)
                .reduce<string[]>(
                  (acc, k) => {
                    acc.push(`// svr options: ${k} = ${field.options![k]}`);
                    return acc;
                  },
                  ['\n'],
                )
                .join('\n')
            : ''),
      };
    }

    const schema: TSServiceDeclarationContent = {
      name,
      comment,
      fieldList: nested.methodsArray.map(handleFieldItemObj),
    };

    function parse() {
      let content: VisitorFNReturnType;

      if (visitor?.TSServiceDeclaration) {
        content = visitor.TSServiceDeclaration(schema, nested);
      }

      if (content === false) return '';
      if (content) return content;

      return serviceExecutor({
        name,
        comment,
        content: nested.methodsArray
          .reduce<string[]>((acc, field) => {
            let content: VisitorFNReturnType;

            if (visitor?.TSServiceItemDeclaration) {
              content = visitor.TSServiceItemDeclaration(handleFieldItemObj(field), field);
            }

            if (content === false) return acc;
            if (content) {
              acc.push(content);
              return acc;
            }

            acc.push(
              serviceFNExecutor({
                name: field.name,
                requestType: replaceNamespacePrefix(field.requestType),
                responseType: replaceNamespacePrefix(field.responseType),
                comment:
                  genComment(field.comment) +
                  // services options as remark
                  (field.options
                    ? Object.keys(field.options!)
                        .reduce<string[]>(
                          (acc, k) => {
                            acc.push(`// svr options: ${k} = ${field.options![k]}`);
                            return acc;
                          },
                          ['\n'],
                        )
                        .join('\n')
                    : ''),
              }),
            );
            return acc;
          }, [])
          .join('\n'),
      });
    }

    parsedNestedList.push(parse());

    return schema;
  }

  // parse proto reflection obj
  function processNested(nested: ReflectionObject) {
    // it's not that the content in the current file is not generated
    // because the dependent modules will generate separate files
    if (nested.filename && nested.filename !== filename) return;
    const messageName = replaceNamespacePrefix(nested.name, nested);
    if (nested instanceof Type) {
      if (hasGenMap.interfaces.has(messageName)) return;
      hasGenMap.interfaces.set(messageName, processType(messageName, nested));
      // nested message
      eachNested(nested.nested!);
    } else if (nested instanceof Enum) {
      if (hasGenMap.enums.has(messageName)) return;
      hasGenMap.enums.set(messageName, processEnum(messageName, nested));
    } else if (nested instanceof Service) {
      if (hasGenMap.services.has(messageName)) return;
      hasGenMap.services.set(messageName, processService(messageName, nested));
      // nested message
      eachNested(nested.nested!);
    } else if (nested instanceof Namespace) {
      const parsed = parseNamespace(nested, filename, visitor);
      parsedNestedList.push(parsed.replace('declare namespace', 'namespace'));
    }
  }

  function eachNested(nested: { [k: string]: ReflectionObject }) {
    Object.keys(nested || {}).forEach((type) => processNested(nested![type]));
  }

  eachNested(namespace.nested!);

  const comment = genComment(namespace.comment);

  visitor?.EmitTSNamespaceDeclaration?.({
    namespace,
    comment,
    filename,
    moduleName,
    ...hasGenMap,
  });

  return formatTS(
    dtsExecutor({
      namespace: moduleName!,
      comment,
      content: parsedNestedList.join('\n\n'),
    }),
  );
}

export default parseNamespace;
