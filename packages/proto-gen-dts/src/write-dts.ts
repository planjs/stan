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
  console.log(`${input} 为转换的类型，提交issu${bugs.url}`);
  return input;
}

function writeDTS(proto: GenProtoFile) {
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

  const root = loadSync(proto.file);
  const schema = root.toJSON().nested;

  let moduleName: string;

  function replaceNamespacePrefix(name: string, parentName?: string) {
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
    if (nested instanceof Type) {
      processType(nested);
    } else if (nested instanceof Enum) {
      processEnum(nested);
    } else if (nested instanceof Service) {
      processService(nested);
    }
  }

  for (moduleName in schema) {
    const reflection = root.lookup(moduleName);
    if (reflection instanceof Namespace) {
      reflection.nestedArray.map(processNested);
    }
    // TODO ...
  }

  fs.outputFileSync(
    proto.output!,
    prettier.format(
      dtsExecutor({
        namespace: moduleName!,
        interfaces: interfaces.join('\n\n'),
        enums: enums.join('\n'),
        services: services.join('\n'),
      }),
      {
        parser: 'typescript',
      },
    ),
  );
}

export default writeDTS;
