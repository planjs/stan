import { relative, basename, extname } from 'path';
import { slash } from '@planjs/utils';

const absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/;
const relativePath = /^\.?\.\//;

/**
 * 判断是否绝对路径
 * @param path
 */
export function isAbsolute(path: string) {
  return absolutePath.test(path);
}

/**
 * 检查是否相对路径
 * @param path
 */
export function isRelative(path: string) {
  return relativePath.test(path);
}

/**
 * 获取相对 cwd 的 linux 文件路径
 * @param id
 */
export function relativeId(id: string) {
  if (typeof process === 'undefined' || !isAbsolute(id)) return id;
  return relative(process.cwd(), id);
}

/**
 * 序列化成linux文件路径
 * @param id
 */
export function relativeNormalize(id: string) {
  return slash(relativeId(id));
}

/**
 * 获取文件名
 * @param id
 */
export function getAliasName(id: string) {
  const base = basename(id);
  return base.substr(0, base.length - extname(id).length);
}
