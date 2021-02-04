import path from 'path';
import { fs, prettier, slash } from 'stan-utils';

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
    prettier.format(`/** code generate by proto-gen-dts don't edit */\n\n${content}`, {
      parser: 'typescript',
    }),
  );
}

export default writeReference;
