import { BundleOptions } from './types';
import { getExistFile, tryDefault } from './utils';
import getBabelConfig from './get-babel-config';

export const CONFIG_FILE = ['.stanrc.js', '.stanrc.ts', '.stanrc.jsx', '.stanrc.tsx'];

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ cwd }: { cwd: string; rootPath?: string }): BundleOptions[] => {
  const configFile = getExistFile({ cwd, files: CONFIG_FILE });

  require('@babel/register')({
    ...getBabelConfig({
      target: 'node',
      typescript: true,
      cwd,
    }),
    extensions: ['.jsx', '.js', '.mjs', '.ts', '.tsx'],
    babelrc: false,
    cache: false,
  });

  if (configFile) {
    const config = tryDefault(require(configFile));
    return Array.isArray(config) ? config : [config];
  }

  return [];
};
