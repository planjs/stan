import { chalk, ora, relativeNormalize } from 'stan-utils';
import type { ProtoGenDTSOptions } from './type';
import writeDTS from './write-dts';
import writeReference from './write-reference';

function protoGenDTS(opts: ProtoGenDTSOptions) {
  const generatedFiles: string[] = [];
  for (let file of opts.files) {
    const readablyFile = relativeNormalize(file.file);
    const spinner = ora(
      `Generate ${chalk.yellow(readablyFile)} to ${chalk.greenBright(
        relativeNormalize(file.output!),
      )}`,
    ).start();
    try {
      const dts = writeDTS(file);
      spinner.succeed();
      generatedFiles.push(...dts);
      if (dts.length > 1) {
        console.log(
          `  > ${chalk.yellow(readablyFile)} Related modules: ` +
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
    writeReference(generatedFiles, referenceEntryFile);
    console.log(
      `Generate reference entry file: ${chalk.greenBright(relativeNormalize(referenceEntryFile))}`,
    );
  }
}

export default protoGenDTS;
