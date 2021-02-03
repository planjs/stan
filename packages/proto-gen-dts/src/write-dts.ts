import path from 'path';
import { loadSync } from 'google-proto-files';
import { Namespace, Type, Service, Enum, ReflectionObject } from 'protobufjs';
import { lodash, fs, prettier } from 'stan-utils';
import type { GenProtoFile } from './type';
const { bugs } = require('../package.json');

const dtsTemplate = `/** code generate by proto-gen-dts don't edit */
declare namespace <%= namespace %> {
<%= enums %>

<%= interfaces %>

<%= services %>
}`;

const interfaceTemplate = `export interface <%= name %> {
<%= content %>
}`;

const enumTemplate = `export const enum <%= name %> {
<%= content %>
}`;

const serviceTemplate = `export interface <%= name %>Service {
<%= content %>
}`;
const serviceFNTemplate = `<%= name %><R extends <%= requestType %>, O>(r: R, o?: O): Promise<<%= responseType %>>,`;

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

  const interfaces: string[] = [];
  const enums: string[] = [];
  const services: string[] = [];
  const hasGenMap = {
    enums: new Set<string>(),
    services: new Set<string>(),
    interfaces: new Set<string>(),
  };

  // construct the name of the message embedded in the message
  function replaceNamespacePrefix(name: string, parentName?: string) {
    // 不是当前文件内容不处理
    // TODO 需要检查内嵌message的引用
    if (namespace.lookup(name)?.filename !== filename) {
      return name;
    }
    if (parentName && !name.includes('.')) {
      name = `${parentName}_${name}`;
    }
    return name.replace(`${moduleName}_`, '').replace('.', '_');
  }

  // process interface
  function processType(nested: Type) {
    const interfaceName = replaceNamespacePrefix(nested.name, nested.parent?.name);
    if (hasGenMap.interfaces.has(interfaceName)) {
      return;
    }
    hasGenMap.interfaces.add(interfaceName);
    interfaces.push(
      interfaceExecutor({
        name: interfaceName,
        content: nested.fieldsArray
          .reduce<string[]>((acc, field) => {
            const childrenNested = field.parent?.lookup(field.type);
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
    enums.push(
      enumExecutor({
        name: enumName,
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
    services.push(
      serviceExecutor({
        name: serverName,
        content: nested.methodsArray
          .reduce<string[]>((acc, field) => {
            acc.push(serviceFNExecutor(field));
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
      interfaces: interfaces.join('\n\n'),
      enums: enums.join('\n'),
      services: services.join('\n'),
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
 */
function writeDTS(proto: GenProtoFile) {
  const root = loadSync(proto.file);
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
