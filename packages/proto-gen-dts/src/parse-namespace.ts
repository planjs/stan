import { lodash } from 'stan-utils';
import { Enum, MapField, Namespace, ReflectionObject, Service, Type } from 'protobufjs';
import {
  formatTS,
  getFieldIsRequired,
  getNamespaceRoot,
  getParentLookup,
  getReflectionParentName,
  isNamespace,
  protoTypeToTSType,
} from './util';

const dtsTemplate = `<%= comment %>
declare namespace <%= namespace %> {
<%= content %>
}`;

const interfaceTemplate = `<%= comment %>
export interface <%= name %> {
<%= content %>
}`;

const enumTemplate = `<%= comment %>
export const enum <%= name %> {
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
 * @param namespace
 * @param filename
 * @returns dts content
 */
function parseNamespace(namespace: Namespace, filename?: string): string {
  const moduleName = namespace.name;

  const parsedNestedList: string[] = [];

  // record generation history to prevent repeated generation
  const hasGenMap = {
    enums: new Set<string>(),
    services: new Set<string>(),
    interfaces: new Set<string>(),
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
  function processType(name: string, nested: Type) {
    parsedNestedList.push(
      interfaceExecutor({
        name,
        comment: genComment(nested.comment!),
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
      }),
    );
  }

  // process enum
  function processEnum(name: string, nested: Enum) {
    parsedNestedList.push(
      enumExecutor({
        name,
        comment: genComment(nested.comment!),
        content: Object.keys(nested.values)
          .reduce<string[]>((acc, field) => {
            if (nested.comments?.[field]) {
              acc.push(genComment(nested.comments[field]));
            }
            acc.push(`${field} = ${nested.values[field]},`);
            return acc;
          }, [])
          .join('\n'),
      }),
    );
  }

  // process service
  function processService(name: string, nested: Service) {
    parsedNestedList.push(
      serviceExecutor({
        name,
        comment: genComment(nested.comment!),
        content: nested.methodsArray
          .reduce<string[]>((acc, field) => {
            acc.push(
              serviceFNExecutor({
                name: field.name,
                requestType: replaceNamespacePrefix(field.requestType),
                responseType: replaceNamespacePrefix(field.responseType),
                comment: genComment(field.comment),
              }),
            );
            return acc;
          }, [])
          .join('\n'),
      }),
    );
  }

  // parse proto reflection obj
  function processNested(nested: ReflectionObject) {
    // it's not that the content in the current file is not generated
    // because the dependent modules will generate separate files
    if (nested.filename && nested.filename !== filename) return;
    const messageName = replaceNamespacePrefix(nested.name, nested);
    if (nested instanceof Type) {
      if (hasGenMap.interfaces.has(messageName)) return;
      hasGenMap.interfaces.add(messageName);
      processType(messageName, nested);
      // nested message
      eachNested(nested.nested!);
    } else if (nested instanceof Enum) {
      if (hasGenMap.enums.has(messageName)) return;
      hasGenMap.enums.add(messageName);
      processEnum(messageName, nested);
    } else if (nested instanceof Service) {
      if (hasGenMap.services.has(messageName)) return;
      hasGenMap.services.add(messageName);
      processService(messageName, nested);
      // nested message
      eachNested(nested.nested!);
    } else if (nested instanceof Namespace) {
      const parsed = parseNamespace(nested, filename);
      parsedNestedList.push(parsed.replace('declare namespace', 'namespace'));
    }
  }

  function eachNested(nested: { [k: string]: ReflectionObject }) {
    Object.keys(nested || {}).forEach((type) => processNested(nested![type]));
  }

  eachNested(namespace.nested!);

  return formatTS(
    dtsExecutor({
      namespace: moduleName!,
      comment: genComment(namespace.comment),
      content: parsedNestedList.join('\n\n'),
    }),
  );
}

export default parseNamespace;
