import { rollup, watch, RollupError } from 'rollup';
import { chalk, signale, ora, relativeNormalize, relativeId, pms } from 'stan-utils';

import { BundleOptions, OutputModule } from './types';
import getRollupConfig from './get-rollup-config';

export interface RollupOptions {
  cwd: string;
  watch?: boolean;
  type: OutputModule;
  target?: 'browser' | 'node';
  bundleOpt: BundleOptions;
}

export default async function rollupBuild(opts: RollupOptions): Promise<void> {
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
        if (event.code === 'START') {
          console.log(chalk.cyan(`${chalk.greenBright(`[${type}]`)} waiting for changes..`));
        } else if (event.code === 'BUNDLE_START') {
          console.log(
            chalk.cyan(
              `Compile ${chalk.bold(
                Array.isArray(event.input)
                  ? event.input.map(relativeId).join(', ')
                  : relativeId(event.input as string),
              )} → ${chalk.bold(event.output.map(relativeId).join(', '))}...`,
            ),
          );
        } else if (event.code === 'BUNDLE_END') {
          console.log(
            chalk.green(
              `Created ${chalk.bold(event.output.map(relativeId).join(', '))} in ${chalk.bold(
                pms(event.duration),
              )}`,
            ),
          );
        } else if (event.code === 'ERROR') {
          handleError(event.error, true);
        }
      });
      process.on('SIGINT', () => {
        watcher.close();
      });
    } else {
      const { output, ...input } = rollupConfig;
      const spinner = ora(
        `Compile ${chalk.green(relativeNormalize(input.input! as string))} -> ${chalk.yellow(
          relativeNormalize(output.file!),
        )}`,
      ).start();
      try {
        const bundle = await rollup(input);
        await bundle.write(output);
        spinner.succeed();
      } catch (e) {
        const err = e as RollupError;
        spinner.fail();
        handleError(err);
        return Promise.reject(err);
      }
    }
  }
}

/**
 * rollup error
 * @param err
 * @param recover
 * https://github.com/rollup/rollup/blob/8ca712d68bd6f6038ee219c4002cf33d6f4e83ed/cli/logging.ts
 */
function handleError(err: RollupError, recover = false) {
  let description = err.message || err;
  if (err.name) description = `${err.name}: ${description}`;
  const message = (err.plugin ? `(plugin ${err.plugin}) ${description}` : description) || err;

  console.log(chalk.bold(chalk.red(`[!] ${chalk.bold(message.toString())}`)));

  if (err.url) {
    console.log(chalk.cyan(err.url));
  }

  if (err.loc) {
    console.log(`${relativeId((err.loc.file || err.id)!)} (${err.loc.line}:${err.loc.column})`);
  } else if (err.id) {
    console.log(relativeId(err.id));
  }

  if (err.frame) {
    console.log(chalk.dim(err.frame));
  }

  if (err.stack) {
    console.log(chalk.dim(err.stack));
  }

  console.log('');

  if (!recover) process.exit(1);
}
