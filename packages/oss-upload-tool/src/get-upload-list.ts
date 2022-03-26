import path from 'path';
import { isString, isUndefined, slash } from '@planjs/utils';
import { fs } from 'stan-utils';

import { OSSUploadOptions, OSSUploadLocalItem, OSSUploadTarget } from './types';

function getUploadList(
  matchPaths: string[],
  dest: string,
  opt?: Pick<OSSUploadOptions, 'cwd'> & Pick<OSSUploadTarget, 'rename' | 'transform' | 'flatten'>,
): OSSUploadLocalItem[] {
  const { flatten, rename, transform, cwd = process.cwd() } = opt || {};
  return matchPaths.reduce<OSSUploadLocalItem[]>((acc, src) => {
    const { name, base, dir, ext } = path.parse(src);
    const destinationFolder = flatten || (!flatten && !dir) ? dest : path.join(dest, dir);
    const outDir = path.join(
      destinationFolder,
      !isUndefined(rename) ? (isString(rename) ? rename : rename(name, ext.slice(1))) : base,
    );
    const filePath = path.resolve(cwd, src);
    if (fs.statSync(filePath).isFile()) {
      acc.push({
        filePath,
        path: slash(outDir),
        content: transform?.(fs.readFileSync(filePath)),
      });
    }
    return acc;
  }, []);
}

export default getUploadList;
