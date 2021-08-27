import path from 'path';
import { yParser, chalk, globby, updateNotifier } from 'stan-utils';

import protoGenDTS from './gen-dts';
import type { GenProtoFile } from './type';

const pkg = require('../package.json');

updateNotifier({
  pkg,
  updateCheckInterval: 0,
  shouldNotifyInNpmScript: true,
}).notify({ defer: true });

const { _: files, o, output, d, dir, e, entryfile, keepcase } = yParser(process.argv.slice(2));

const outputDir: string = output || o || '';
const protoDir: string = dir || d || '';
let entryDTS: string | boolean | void = entryfile || e;
if (entryDTS) {
  if (typeof entryDTS === 'boolean') {
    entryDTS = 'index.d.ts';
  } else if (!entryDTS.endsWith('.d.ts')) {
    entryDTS = entryDTS + '.d.ts';
  }
}
const genEntryFile = entryDTS ? entryDTS : outputDir ? path.join(outputDir, 'index.d.ts') : false;

if (protoDir) {
  try {
    files.push(...globby.sync(path.join(protoDir, '**/*.proto')));
  } catch (e) {
    console.log(chalk.red('Matching proto file error'), e);
    process.exit(1);
  }
}

try {
  protoGenDTS({
    files: files.map<GenProtoFile>((file) => {
      const { name, dir } = path.parse(file);
      return {
        file,
        output: outputDir.endsWith('.d.ts')
          ? outputDir
          : path.join(outputDir || dir, name + '.d.ts'),
      };
    }),
    referenceEntryFile: genEntryFile,
    protoParseOptions: {
      keepCase: !!keepcase,
    },
  });
  console.log(chalk.cyanBright('Compile successfully.'));
  process.exit(0);
} catch (e) {
  process.exit(1);
}
