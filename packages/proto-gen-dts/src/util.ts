import path from 'path';
import { prettier } from 'stan-utils';
import type { Field, Namespace, ReflectionObject } from 'protobufjs';

const { name, bugs } = require('../package.json');

/**
 * prettier format ts content
 * @param content
 * @param opts
 * @returns parsed content
 */
export function formatTS(content: string, opts?: prettier.Options): string {
  const prettierFormatOpts: prettier.Options = {
    ...opts,
    parser: 'typescript',
  };

  // read project prettier config
  const prettierrc = prettier.resolveConfigFile.sync();
  if (prettierrc) {
    Object.assign(prettierrc, prettier.resolveConfig.sync(prettierrc));
  }

  return prettier.format(content, prettierFormatOpts);
}

// https://developers.google.com/protocol-buffers/docs/proto3#json
const Types = {
  number: ['int32', 'uint32', 'sint32', 'sfixed32', 'float', 'double', 'fixed32'],
  string: ['int64', 'uint64', 'sint64', 'sfixed64', 'string', 'bytes', 'fixed64'],
  boolean: ['bool'],
};

/**
 * process proto type convert ts type
 * @param input proto type
 * @returns ts type
 */
export function protoTypeToTSType(input: string): keyof typeof Types | void {
  let type: keyof typeof Types;
  for (type in Types) {
    if (Types[type].includes(input)) {
      return type;
    }
  }
}

/**
 * get field root type
 * @param field
 */
export function getFieldRootType(field: Field): Namespace | null {
  let parent = field.parent;
  while (parent?.parent) {
    parent = parent.parent;
  }
  return parent;
}

/**
 * use parent lookup
 * @param field
 * @param root
 * @param type
 */
export function getParentLookup({
  field,
  root,
  type,
}: {
  field: Field;
  root: Namespace;
  type: string;
}): ReflectionObject | null {
  let parent = field.parent;
  while (parent) {
    const res = parent.lookup(type);
    if (res) return res;
    parent = parent.parent;
  }
  return root.lookup(type);
}

export function getReflectionParentName(field: ReflectionObject) {
  let parent = field.parent;
  let namePath = [parent?.name];
  while (parent?.parent && parent?.name) {
    parent = parent?.parent!;
    namePath.unshift(parent.name);
  }
  return namePath.filter(Boolean).join('_');
}

/**
 * replace same real path
 * @param base
 * @param file
 */
export function replaceSamePath(base: string, file: string) {
  base = path.resolve(base);
  file = path.resolve(file);
  const a = base.split(path.sep);
  const b = file.split(path.sep);
  const index = a.findIndex((v, i) => b[i] !== v);
  if (~index) {
    return path.join(...b.slice(index));
  }
  return file;
}

/**
 * document banner
 * @param content file text content
 */
export function writeBanner(content: string) {
  return `/** code generate by ${name} don't edit */\n\n${content}`;
}

/**
 * output issues uri
 * @param opt
 */
export function reportIssues(opt: { labels?: string; title?: string; template?: string }) {
  const { labels = 'bug', title = '', template = 'bug_report.md' } = opt;
  const uri = `${
    bugs.url
  }/new?assignees=&labels=${labels}&template=${template}&title=${encodeURIComponent(title)}`;
  return `${title}\nPlease report issues ${uri}`;
}
