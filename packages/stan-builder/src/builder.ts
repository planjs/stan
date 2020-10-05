import { BuildOptions, BundleOptions, BaseBundleOptions } from './types';
import getStanConfig from './get-stan-config';
import babel from './_babel';
import rollup from './_rollup';
import { getExistFile } from './utils';
import { lodash as _ } from 'stan-utils';

export function getBundleOpts(opts: BuildOptions): BundleOptions[] {
  const { cwd, args = {} } = opts;
  const entry = getExistFile({
    cwd,
    files: ['src/index.tsx', 'src/index.ts', 'src/index.jsx', 'src/index.js'],
    returnRelative: true,
  });
  return getStanConfig({ cwd }).map((stanConfig) => {
    const bundleOpts: BundleOptions = _.merge(
      {
        entry,
      },
      args,
      stanConfig,
    );
    return bundleOpts;
  });
}

export default async function builder(opts: BuildOptions) {
  const bundleOptions = getBundleOpts(opts);
  const { cwd, rootPath, watch } = opts;

  for (const bundleOpt of bundleOptions) {
    const { bundler = 'rollup', esm, umd, cjs, system } = bundleOpt;

    const isBabel = (b: BundleOptions['esm'] | BundleOptions['cjs']) =>
      b === 'babel' || (b as BaseBundleOptions)?.bundler === 'babel' || bundler === 'babel';

    // bundle umd
    if (umd) {
      await rollup({ cwd, watch, type: 'umd', bundleOpt });
    }

    // bundle esm
    if (esm) {
      if (isBabel(esm)) {
        await babel({ cwd, rootPath, watch, type: 'esm', bundleOpt });
      } else {
        await rollup({ cwd, watch, type: 'esm', bundleOpt });
      }
    }

    // bundle cjs
    if (cjs) {
      if (isBabel(esm)) {
        await babel({ cwd, rootPath, watch, type: 'cjs', bundleOpt });
      } else {
        await rollup({ cwd, watch, type: 'cjs', bundleOpt });
      }
    }
  }
}
