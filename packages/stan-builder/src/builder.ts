import path from 'path';
import fs from 'fs';
import {
  chalk,
  chokidar,
  copyFiles,
  lodash as _,
  slash,
  relativeNormalize,
  rimraf,
  multimatch,
  CopyTarget,
  pms,
} from 'stan-utils';

import getStanConfig from './get-stan-config';
import babel from './_babel';
import rollup from './_rollup';
import { getExistFile } from './utils';
import type { BuildOptions, BundleOptions, BaseBundleOptions } from './types';
import validOptions from './valid-options';

export function getBundleOpts(opts: BuildOptions): BundleOptions[] {
  const { cwd, args = {} } = opts;
  const entry = getExistFile({
    cwd,
    files: [
      'src/index.tsx',
      'src/index.ts',
      'src/index.jsx',
      'src/index.js',
      'src/index.mjs',
      'src/index.vue',
    ],
    returnRelative: true,
  });
  const bundleOpts = getStanConfig({ cwd });
  if (!bundleOpts.length) {
    bundleOpts.push(args.esm || args.cjs || args.umd || args.system ? {} : { esm: true });
  }
  return bundleOpts
    .map((stanConfig) => _.merge({ entry }, args, stanConfig))
    .filter((v) => !!v.entry && (v.esm || v.cjs || v.umd || v.system));
}

async function builder(opts: BuildOptions) {
  const bundleOptions = getBundleOpts(opts);
  const { cwd, rootPath, watch, verbose } = opts;

  if (bundleOptions.length) {
    await Promise.all(bundleOptions.map((v) => validOptions.validateAsync(v)));
    try {
      const dirs = Array.from(
        bundleOptions.reduce<Set<string>>((acc, options) => {
          if (options.bundler === 'rollup' || !options.bundler) {
            acc.add('dist');
          } else {
            options.esm && acc.add('es');
            options.cjs && acc.add('lib');
          }
          return acc;
        }, new Set()),
      );
      console.log(chalk.gray(`Clean up the ${dirs} directory.`));
      for (const dir of dirs) {
        rimraf.sync(path.join(cwd, dir));
      }
    } catch (e) {}

    const start = Date.now();

    for (const bundleOpt of bundleOptions) {
      const { bundler = 'rollup', entry, esm, umd, cjs, system, copy } = bundleOpt;
      const isBabel = (b: BundleOptions['esm'] | BundleOptions['cjs']) =>
        b === 'babel' || (b as BaseBundleOptions)?.bundler === 'babel' || bundler === 'babel';

      // bundle esm
      if (esm) {
        if (isBabel(esm)) {
          await babel({ cwd, rootPath, watch, type: 'esm', bundleOpt, verbose });
        } else {
          await rollup({ cwd, watch, type: 'esm', bundleOpt, verbose });
        }
      }

      // bundle cjs
      if (cjs) {
        if (isBabel(esm)) {
          await babel({ cwd, rootPath, watch, type: 'cjs', bundleOpt, verbose });
        } else {
          await rollup({ cwd, watch, type: 'cjs', bundleOpt, verbose });
        }
      }

      // bundle umd
      if (umd) {
        await rollup({ cwd, watch, type: 'umd', bundleOpt, verbose });
      }

      // bundle system
      if (system) {
        await rollup({ cwd, watch, type: 'system', bundleOpt, verbose });
      }

      // copy file
      if (copy) {
        if (!_.has(copy, 'verbose')) {
          copy.verbose = verbose;
        }
        if (!_.has(copy, 'cwd')) {
          copy.cwd = cwd;
        }
        await copyFiles(copy);
        if (watch && copy.targets) {
          const targets = Array.isArray(copy.targets) ? copy.targets : [copy.targets];
          const watcher = chokidar.watch(_.flatten(targets.map((v) => v.src)), {
            ignoreInitial: true,
          });

          const files: string[] = [];

          const copyChangeFile = () => {
            const _files = files.slice().map(slash);
            copyFiles({
              ...copy,
              targets: targets.reduce<CopyTarget[]>((acc, { src, ...o }) => {
                const matchFiles = multimatch(_files, src);
                if (matchFiles.length) {
                  acc.push({ src: matchFiles, ...o });
                }
                return acc;
              }, []),
            }).then(() => {
              _.eachRight(files, (item, index) => {
                if (_files.find((v) => v === item)) {
                  files.splice(index, 1);
                }
              });
            });
          };

          const debouncedCopyFiles = _.debounce(_.throttle(copyChangeFile, 500), 1000);

          watcher.on('all', (event, fullPath) => {
            const srcPath = path.parse(path.join(cwd, entry!)).dir;
            const relPath = fullPath.replace(srcPath, '');
            console.log(`[${event}] ${relativeNormalize(relPath)}`);
            if (!fs.existsSync(fullPath)) return;
            if (fs.statSync(fullPath).isFile()) {
              if (!files.includes(fullPath)) files.push(fullPath);
              debouncedCopyFiles();
            }
          });

          watcher.on('error', (error) => {
            console.error('Error:', error);
            console.error(error.stack);
          });

          process.on('SIGINT', () => {
            watcher.close();
          });
        }
      }
    }

    if (!watch) {
      console.log(chalk.cyan(`Build complete ${pms(Date.now() - start)}.`));
    }
    return;
  }

  return Promise.reject(new Error('No entry file'));
}

export default builder;
module.exports = exports = builder;
