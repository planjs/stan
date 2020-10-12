import { relative, basename, extname } from 'path';
import { slash } from '@planjs/utils';

const absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/;
const relativePath = /^\.?\.\//;

export function isAbsolute(path: string) {
  return absolutePath.test(path);
}

export function isRelative(path: string) {
  return relativePath.test(path);
}

export function relativeId(id: string) {
  if (typeof process === 'undefined' || !isAbsolute(id)) return id;
  return relative(process.cwd(), id);
}

export function relativeNormalize(id: string) {
  return slash(relativeId(id));
}

export function getAliasName(id: string) {
  const base = basename(id);
  return base.substr(0, base.length - extname(id).length);
}
