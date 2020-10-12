import { join, relative } from 'path';
import { existsSync } from 'fs';

export function getExistFile({
  cwd,
  files,
  returnRelative,
}: {
  cwd: string;
  files: string[];
  returnRelative?: boolean;
}): string | void {
  for (const file of files) {
    const absFilePath = join(cwd, file);
    if (existsSync(absFilePath)) {
      return returnRelative ? file : absFilePath;
    }
  }
}

export function tryDefault(obj: any) {
  return obj.default || obj;
}

const absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/;
const relativePath = /^\.?\.\//;

export function isAbsolute(path: string) {
  return absolutePath.test(path);
}

export function isRelative(path: string) {
  return relativePath.test(path);
}

export function normalize(path: string) {
  if (path.indexOf('\\') === -1) return path;
  return path.replace(/\\/g, '/');
}

export default function relativeId(id: string) {
  if (typeof process === 'undefined' || !isAbsolute(id)) return id;
  return relative(process.cwd(), id);
}
