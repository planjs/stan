import path from 'path';
import { loadSync, getProtoPath } from 'google-proto-files';
import { Namespace, Type, Service, Enum, MapField } from 'protobufjs';
import { lodash, fs, chalk } from 'stan-utils';

import type { ReflectionObject, IParseOptions } from 'protobufjs';
import type { GenProtoFile } from './type';

import {
  formatTS,
  protoTypeToTSType,
  writeBanner,
  reportIssues,
  replaceSamePath,
  getReflectionParentName,
  getParentLookup,
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

/**
 * parsed proto content to dts content
 * @param namespace
 * @param filename
 * @returns dts content
 */
export function parseNameSpace(namespace: Namespace, filename?: string): string {
  const moduleName = namespace.name;

  const dtsExecutor = lodash.template(dtsTemplate);
  const interfaceExecutor = lodash.template(interfaceTemplate);
  const enumExecutor = lodash.template(enumTemplate);
  const serviceExecutor = lodash.template(serviceTemplate);
  const serviceFNExecutor = lodash.template(serviceFNTemplate);

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
    // 没有文件标识不处理
    if (!_filename) {
      return name;
    }
    // 不是当前文件不处理
    if (_filename !== filename) {
      const arr = name.split('.');
      if (arr.length > 1) {
        return `${arr[0]}.${arr.slice(1).join('_')}`;
      }
    }
    if (field && !name.includes('.')) {
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
            let fieldContent = `${field.name}${field.required ? '' : '?'}: `;
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
    // 不是当前文件内的内容不生成，因为相关依赖的模块会生成单独的文件
    if (nested.filename && nested.filename !== filename) return;
    const messageName = replaceNamespacePrefix(nested.name, nested);
    if (nested instanceof Type) {
      if (hasGenMap.interfaces.has(messageName)) return;
      hasGenMap.interfaces.add(messageName);
      processType(messageName, nested);
      // 处理嵌套 message
      nested.nestedArray?.forEach(processNested);
    } else if (nested instanceof Enum) {
      if (hasGenMap.enums.has(messageName)) return;
      hasGenMap.enums.add(messageName);
      processEnum(messageName, nested);
    } else if (nested instanceof Service) {
      if (hasGenMap.services.has(messageName)) return;
      hasGenMap.services.add(messageName);
      processService(messageName, nested);
      // 处理嵌套 message
      nested.nestedArray?.forEach(processNested);
    } else if (nested instanceof Namespace) {
      const parsed = parseNameSpace(nested);
      parsedNestedList.push(parsed.replace('declare namespace', 'namespace'));
    }
  }

  namespace.nestedArray?.forEach(processNested);

  return formatTS(
    dtsExecutor({
      namespace: moduleName!,
      comment: genComment(namespace.comment),
      content: parsedNestedList.join('\n\n'),
    }),
  );
}

/**
 * record parsed files
 */
const parsedFiles: string[] = [];

/**
 * generate dts file
 * @param proto
 * @param opts
 * @returns generate files
 */
export default function writeDTS(proto: GenProtoFile, opts?: IParseOptions): string[] {
  const { generateDependentModules = true } = proto;

  const root = loadSync(proto.file, {
    alternateCommentMode: true,
    ...opts,
  });

  if (!root.nestedArray.length) {
    console.log(chalk.yellowBright(`Warning "${proto.file}" is empty`));
    return [];
  }

  const files: string[] = [];

  for (const [index, reflection] of root.nestedArray.entries()) {
    let file = root.files[index];
    if (reflection instanceof Namespace) {
      // skip empty namespace
      if (!reflection.nestedArray.length) {
        console.log(chalk.yellowBright(`Warning "${file}" is empty`));
        continue;
      }
      let outPath = path.resolve(proto.output!);
      if (proto.file !== file) {
        // skip dependent modules
        if (!generateDependentModules) continue;
        const { dir } = path.parse(proto.output!);
        // internal proto file, beautify the generation path
        if (file.startsWith(getProtoPath())) {
          file = replaceSamePath(getProtoPath(), file);
        }
        // generate a file based on the relative position of the file
        const { dir: importDir, name: fileName } = path.parse(replaceSamePath(proto.file, file));
        outPath = path.resolve(dir, importDir, `${fileName}.d.ts`);
      } else {
        parsedFiles.push(outPath);
      }
      files.push(outPath);
      // the dependent file contains a compiled file that is not parsed
      if (parsedFiles.includes(outPath) && proto.file !== file) {
        continue;
      }
      const parsed = parseNameSpace(reflection, file);
      fs.outputFileSync(outPath, writeBanner(parsed));
    } else {
      console.log(
        chalk.yellowBright(
          `Check whether the version of protobufjs that google-proto-files depends on is consistent with the version of protobufjs in the project.`,
        ),
      );
      throw new Error(reportIssues({ title: `Type ${reflection?.name} not supported.` }));
    }
  }
  return files;
}
