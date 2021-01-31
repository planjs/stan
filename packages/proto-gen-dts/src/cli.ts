import path from 'path';
import { yParser, chalk, glob } from 'stan-utils';
import protoGenDTS from './gen-dts';
import type { GenProtoFile } from './type';

const { _: files, o, output, d, dir } = yParser(process.argv.slice(2));

const outputDir = output || o || '';
const protoDir = dir || d || '';

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
        output: path.join(outputDir || dir, name + '.d.ts'),
      };
    }),
  });
  console.log(chalk.greenBright('Generate dictionary file successfully'));
} catch (e) {
  console.log(chalk.red('proto-gen-dts error'), e);
  process.exit(1);
}
