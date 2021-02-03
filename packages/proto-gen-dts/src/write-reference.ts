import path from 'path';
import { fs, prettier } from 'stan-utils';

function writeReference(dts: string[], entryFilepath: string) {
  entryFilepath = path.resolve(entryFilepath);
  const content = [...new Set(dts)]
    .sort()
    .map((d) => `/// <reference path="${path.relative(path.parse(entryFilepath).dir, d)}" />`)
    .join('\n');
  fs.outputFileSync(
    entryFilepath,
    prettier.format(`/** code generate by proto-gen-dts don't edit */\n\n${content}`, {
      parser: 'typescript',
    }),
  );
}

export default writeReference;
