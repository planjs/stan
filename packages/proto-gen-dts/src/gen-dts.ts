import { chalk, ora, relativeNormalize } from 'stan-utils';
import type { ProtoGenDTSOptions } from './type';
import writeDTS from './write-dts';

function protoGenDTS(opts: ProtoGenDTSOptions) {
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
      console.log(
        `  > ${chalk.yellow(readablyFile)} Related modules: ` +
          chalk.greenBright(dts.slice(1).map(relativeNormalize).join(' ')),
      );
    } catch (e) {
      spinner.fail(e?.message || e);
      throw e;
    }
  }
}

export default protoGenDTS;
