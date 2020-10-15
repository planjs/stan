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
