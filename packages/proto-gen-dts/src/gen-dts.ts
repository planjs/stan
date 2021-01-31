import { chalk, ora, relativeNormalize } from 'stan-utils';
import type { ProtoGenDTSOptions } from './type';
import writeDTS from './write-dts';

function protoGenDTS(opts: ProtoGenDTSOptions) {
  for (let file of opts.files) {
    const spinner = ora(
      `Generate ${chalk.yellow(relativeNormalize(file.file))} to ${chalk.greenBright(file.output)}`,
    ).start();
    try {
      writeDTS(file);
      spinner.succeed();
    } catch (e) {
      spinner.fail(e?.message || e);
      throw e;
    }
  }
}

export default protoGenDTS;
