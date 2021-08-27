import path from 'path';
import { fs, slash } from 'stan-utils';

import { formatTS, writeBanner } from './util';

/**
 * generate reference
 * @param dts
 * @param entryFilepath
 */
function writeReference(dts: string[], entryFilepath: string) {
  entryFilepath = path.resolve(entryFilepath);
  const content = [...new Set(dts)]
    .sort()
    .map(
      (d) => `/// <reference path="${slash(path.relative(path.parse(entryFilepath).dir, d))}" />`,
    )
    .join('\n');
  fs.outputFileSync(entryFilepath, formatTS(writeBanner(content)));
}

export default writeReference;
