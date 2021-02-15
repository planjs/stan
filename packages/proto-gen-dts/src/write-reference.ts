import path from 'path';
import { fs, slash } from 'stan-utils';

import { formatTS } from './util';

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
  fs.outputFileSync(
    entryFilepath,
    formatTS(`/** code generate by proto-gen-dts don't edit */\n\n${content}`),
  );
}

export default writeReference;
