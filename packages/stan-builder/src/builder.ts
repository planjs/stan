import { BuildOptions, ESMOptions } from './types';
import getStanConfig from './get-stan-config';
import babel from './_babel';
import rollup from './_rollup';

export default async function builder(opts: BuildOptions) {
  const { cwd, rootPath, watch } = opts;
  const buildOptions = getStanConfig({ cwd, rootPath });
  for (const buildOpt of buildOptions) {
    const { bundler = 'rollup' } = buildOpt;

    if (buildOpt?.esm) {
      const esm = buildOpt.esm;
      if (esm === 'babel' || (esm as ESMOptions)?.bundler === 'babel') {
        await babel();
      } else {
        await rollup();
      }
    }
  }
}
