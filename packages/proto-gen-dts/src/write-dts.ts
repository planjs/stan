import path from 'path';
import { loadSync } from 'google-proto-files';
import { Namespace, Type, Service, Enum, ReflectionObject, IParseOptions } from 'protobufjs';
import { lodash, fs, prettier } from 'stan-utils';
import type { GenProtoFile } from './type';
const { bugs } = require('../package.json');

const dtsTemplate = `/** code generate by proto-gen-dts don't edit */
<%= comment %>
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

function protoTypeToJSType(input: string): string {
  const types = {
    number: ['int32', 'uint32', 'float', 'double', 'fixed32'],
    string: ['int64', 'uint64', 'string', 'bytes', 'fixed64'],
    boolean: ['bool'],
  };
  for (const type in types) {
    if (types[type].includes(input)) {
      return type;
    }
  }
  console.log(`Type ${input} not supported, report issue ${bugs.url}`);
  return input;
}

function parseNameSpace(namespace: Namespace, filename: string) {
  const moduleName = namespace.name;

  const dtsExecutor = lodash.template(dtsTemplate);
  const interfaceExecutor = lodash.template(interfaceTemplate);
  const enumExecutor = lodash.template(enumTemplate);
  const serviceExecutor = lodash.template(serviceTemplate);
  const serviceFNExecutor = lodash.template(serviceFNTemplate);

  const parsedNestedList: string[] = [];
  const hasGenMap = {
    enums: new Set<string>(),
    services: new Set<string>(),
    interfaces: new Set<string>(),
  };

  // construct the name of the message embedded in the message
  function replaceNamespacePrefix(name: string, parentName?: string) {
    // 不是当前文件内容不处理
    if (namespace.lookup(name)?.filename !== filename) {
      return name;
    }
    if (parentName && !name.includes('.')) {
      name = `${parentName}_${name}`;
    }
    return name.replace(`${moduleName}_`, '').replace('.', '_');
  }

  function genComment(str?: string | null) {
    if (!str) return '';
    return `/** ${str} */`;
  }

  // process interface
  function processType(nested: Type) {
    const interfaceName = replaceNamespacePrefix(nested.name, nested.parent?.name);
    if (hasGenMap.interfaces.has(interfaceName)) {
      return;
    }
    hasGenMap.interfaces.add(interfaceName);
    parsedNestedList.push(
      interfaceExecutor({
        name: interfaceName,
        comment: genComment(nested.comment!),
        content: nested.fieldsArray
          .reduce<string[]>((acc, field) => {
            const childrenNested = field.parent?.lookup(field.type);
            if (field.comment) {
              acc.push(genComment(field.comment));
            }
            if (childrenNested) {
              processNested(childrenNested);
              acc.push(
                `${field.name}?: ${replaceNamespacePrefix(
                  field.type,
                  childrenNested.parent!.name,
                )}${field.repeated ? '[]' : ''};`,
              );
            } else {
              acc.push(
                `${field.name}?: ${protoTypeToJSType(field.type)}${field.repeated ? '[]' : ''};`,
              );
            }
            return acc;
          }, [])
          .join('\n'),
      }),
    );
  }

  // process enum
  function processEnum(nested: Enum) {
    const enumName = replaceNamespacePrefix(nested.name, nested.parent?.name);
    if (hasGenMap.enums.has(enumName)) {
      return;
    }
    hasGenMap.enums.add(enumName);
    parsedNestedList.push(
      enumExecutor({
        name: enumName,
        comment: genComment(nested.comment!),
        content: Object.keys(nested.values)
          .reduce<string[]>((acc, field) => {
            acc.push(`${field} = ${nested.values[field]},`);
            return acc;
          }, [])
          .join('\n'),
      }),
    );
  }

  // process service
  function processService(nested: Service) {
    const serverName = replaceNamespacePrefix(nested.name, nested.parent?.name);
    if (hasGenMap.enums.has(serverName)) {
      return;
    }
    hasGenMap.enums.add(serverName);
    parsedNestedList.push(
      serviceExecutor({
        name: serverName,
        comment: genComment(nested.comment!),
        content: nested.methodsArray
          .reduce<string[]>((acc, field) => {
            acc.push(serviceFNExecutor({ ...field, comment: genComment(field.comment) }));
            return acc;
          }, [])
          .join('\n'),
      }),
    );
  }

  function processNested(nested: ReflectionObject) {
    // 不是当前文件内的内容不生成，因为相关依赖的模块会生成单独的文件
    if (nested.filename !== filename) {
      return;
    }
    if (nested instanceof Type) {
      processType(nested);
    } else if (nested instanceof Enum) {
      processEnum(nested);
    } else if (nested instanceof Service) {
      processService(nested);
    }
  }

  namespace.nestedArray.map(processNested);

  return prettier.format(
    dtsExecutor({
      namespace: moduleName!,
      comment: genComment(namespace.comment),
      content: parsedNestedList.join('\n\n'),
    }),
    {
      parser: 'typescript',
    },
  );
}

// 防止重复解析proto
const generatedFiles: string[] = [];

/**
 * 生成dts
 * @param proto
 * @param opts
 */
function writeDTS(proto: GenProtoFile, opts?: IParseOptions) {
  const root = loadSync(proto.file, {
    alternateCommentMode: true,
    ...opts,
  });
  const schema = root.toJSON().nested;

  const files: string[] = [];

  const moduleNames = Object.keys(schema!);
  for (const [index, moduleName] of moduleNames.entries()) {
    const reflection = root.lookup(moduleName);
    const file = root.files[index];
    if (reflection instanceof Namespace) {
      // 根据 files 的下标判断当前文件就按照输出，不是当前输出模块就按照源码相对位置，输出到输出的文件夹
      let outPath = path.resolve(proto.output!);
      if (proto.file !== file) {
        const { dir } = path.parse(proto.output!);
        const sourceRelative = path.relative(path.parse(file).dir, path.parse(proto.file!).dir);
        outPath = path.resolve(dir, sourceRelative, `${reflection.name}.d.ts`);
      }
      files.push(outPath);
      // 提高编译速度，减少重复的解析 如果已经生成则不生成
      if (!generatedFiles.includes(outPath)) {
        const parsed = parseNameSpace(reflection, file);
        fs.outputFileSync(outPath, parsed);
        generatedFiles.push(outPath);
      }
    }
    // TODO ...
  }
  return files;
}

export default writeDTS;
