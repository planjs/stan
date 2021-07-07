import path from 'path';
import { chalk, relativeNormalize, pms, slash } from 'stan-utils';

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
    throw new Error('Please enter the proto file');
  }

  const parsedFiles: string[] = [];

  for (const file of opts.files) {
    const readablyFile = relativeNormalize(file.file);
    const _file = {
      ...file,
    };
    const { dir, name } = path.parse(file.file);
    if (!_file.output) {
      _file.output = path.join(dir, name + '.d.ts');
    }
    if (slash(_file.output).slice(-1) === '/') {
      _file.output = path.join(_file.output, name + '.d.ts');
    }
    const startTime = Date.now();
    console.log(
      `Compile ${chalk.yellow(readablyFile)} → ${chalk.cyan(relativeNormalize(_file.output!))}...`,
    );
    try {
      const dts = writeDTS(_file, {
        alternateCommentMode: true,
        ...opts.protoParseOptions,
        ...file.protoParseOptions,
      });
      parsedFiles.push(...dts);
      if (dts.length) {
        console.log(
          `Created ${chalk.cyan(relativeNormalize(_file.output!))} in ${chalk.bold(
            pms(Date.now() - startTime),
          )}`,
        );
      }
      if (dts.length > 1) {
        console.log(
          `  > ${chalk.cyan(relativeNormalize(_file.output!))} dependent modules: ` +
            chalk.greenBright(dts.slice(1).map(relativeNormalize).join(' ')),
        );
      }
    } catch (e) {
      console.log(`Build ${chalk.red(readablyFile)} error: `, e);
      throw e;
    }
  }

  if (opts.referenceEntryFile !== false) {
    const referenceEntryFile = opts.referenceEntryFile || 'index.d.ts';
    writeReference(parsedFiles, referenceEntryFile);
    console.log(
      `Created reference entry file: ${chalk.greenBright(relativeNormalize(referenceEntryFile))}`,
    );
  }

  return parsedFiles;
}

export default protoGenDTS;
