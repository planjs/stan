import { BundleOptions } from './types';
import { getExistFile, tryDefault } from './utils';
import getBabelConfig from './get-babel-config';

export const CONFIG_FILE = ['.stanrc.js', '.stanrc.ts'];

export default ({ cwd }: { cwd: string; rootPath?: string }): BundleOptions[] => {
  const configFile = getExistFile({ cwd, files: CONFIG_FILE });

  require('@babel/register')({
    ...getBabelConfig({
      target: 'node',
      typescript: true,
    }),
    extensions: ['.jsx', '.js', '.mjs', '.ts', '.tsx'],
    babelrc: false,
    cache: false,
  });

  if (configFile) {
    const config = tryDefault(require(configFile));
    const stanConfig = Array.isArray(config) ? config : [config];
    // TODO 错误校验
    return stanConfig;
  }

  return [];
};
