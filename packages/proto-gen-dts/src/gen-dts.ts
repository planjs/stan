import path from 'path';
import { chalk, ora, relativeNormalize } from 'stan-utils';

import type { ProtoGenDTSOptions } from './type';
import writeDTS from './write-dts';
import writeReference from './write-reference';

/**
 * proto generate dts
 * @param opts
 * @returns parsedFiles path
 */
function protoGenDTS(opts: ProtoGenDTSOptions): string[] {
  if (!opts.files.length) {
    throw new Error('please enter the proto file');
  }

  const parsedFiles: string[] = [];

  for (let file of opts.files) {
    const readablyFile = relativeNormalize(file.file);
    const _file = {
      ...file,
    };
    if (!_file.output) {
      const { dir, name } = path.parse(file.file);
      _file.output = path.join(dir, name + '.d.ts');
    }
    const spinner = ora(
      `Generate ${chalk.yellow(readablyFile)} to ${chalk.greenBright(
        relativeNormalize(_file.output!),
      )}`,
    ).start();
    try {
      const dts = writeDTS(_file, opts.protoParseOptions);
      spinner.succeed();
      parsedFiles.push(...dts);
      if (dts.length > 1) {
        console.log(
          `  > ${chalk.yellow(readablyFile)} dependent modules: ` +
            chalk.greenBright(dts.slice(1).map(relativeNormalize).join(' ')),
        );
      }
    } catch (e) {
      spinner.fail(e?.message || e);
      throw e;
    }
  }

  if (opts.referenceEntryFile !== false) {
    const referenceEntryFile = opts.referenceEntryFile || 'index.d.ts';
    writeReference(parsedFiles, referenceEntryFile);
    console.log(
      `Generate reference entry file: ${chalk.greenBright(relativeNormalize(referenceEntryFile))}`,
    );
  }

  return parsedFiles;
}

export default protoGenDTS;
