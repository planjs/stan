import { rollup, watch } from 'rollup';
import { chalk, signale, slash } from 'stan-utils';

import { BundleOptions, OutputModule } from './types';
import getRollupConfig from './get-rollup-config';

export interface RollupOptions {
  cwd: string;
  watch?: boolean;
  type: OutputModule;
  target?: 'browser' | 'node';
  bundleOpt: BundleOptions;
}

export default async function rollupBuild(opts: RollupOptions) {
  const { cwd, type, bundleOpt, target } = opts;
  const rollupConfigs = getRollupConfig({ cwd, bundleOpt, type, target });
  for (const rollupConfig of rollupConfigs) {
    if (opts.watch) {
      const watcher = watch([
        {
          ...rollupConfig,
          watch: {},
        },
      ]);
      watcher.on('event', (event) => {
        if (event.code === 'ERROR' && event?.error) {
          signale.error(event.error);
        } else if (event.code === 'START') {
          console.log(`[${type}] Rebuild since file changed`);
        }
      });
      process.once('SIGINT', () => {
        watcher.close();
      });
    } else {
      const { output, ...input } = rollupConfig;
      console.log(
        `Compile ${chalk.green(
          slash((input.input! as string).replace(`${cwd}/`, '')),
        )} to ${type} ${chalk.yellow(slash(output.file!.replace(`${cwd}/`, '')))}`,
      );
      const bundle = await rollup(input);
      await bundle.write(output);
    }
  }
}
