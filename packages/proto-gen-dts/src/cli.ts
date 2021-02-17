import path from 'path';
import { yParser, chalk, glob, updateNotifier } from 'stan-utils';
import protoGenDTS from './gen-dts';
import type { GenProtoFile } from './type';

const pkg = require('../package.json');

updateNotifier({
  pkg,
  updateCheckInterval: 0,
  shouldNotifyInNpmScript: true,
}).notify({ defer: true });

const { _: files, o, output, d, dir, e, entryfile } = yParser(process.argv.slice(2));

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
const genEntryFile = entryDTS ? entryDTS : outputDir ? outputDir + 'index.d.ts' : false;

if (protoDir) {
  try {
    files.push(...glob.sync(path.join(protoDir, '**/*.proto')));
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
  });
  console.log(chalk.greenBright('Generate dictionary file successfully'));
} catch (e) {
  console.log(chalk.red('proto-gen-dts error'), e);
  process.exit(1);
}
