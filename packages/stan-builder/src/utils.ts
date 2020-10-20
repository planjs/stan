import { join } from 'path';
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

/**
 * Parses values of the form "$=jQuery,React=react" into key-value object.
 */
export function parseMappingArgument(
  globalStrings: string,
  processValue?: (v: string, k: string) => string[] | string | void,
) {
  const globals = {};
  globalStrings.split(',').forEach((globalString) => {
    let [key, value] = globalString.split('=');
    if (processValue) {
      const r = processValue(value, key);
      if (r !== undefined) {
        if (Array.isArray(r)) {
          [value, key] = r;
        } else {
          value = r;
        }
      }
    }
    globals[key] = value;
  });
  return globals;
}
