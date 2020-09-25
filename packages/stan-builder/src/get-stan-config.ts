import { BundleOptions } from './types';
import { getExistFile, tryDefault } from './utils';

export const CONFIG_FILE = ['.stanrc.js', '.stanrc.ts'];

export default ({ cwd }: { cwd: string; rootPath?: string }): BundleOptions[] => {
  const configFile = getExistFile({ cwd, files: CONFIG_FILE });

  if (configFile) {
    const config = tryDefault(require(configFile));
    const stanConfig = Array.isArray(config) ? config : [config];
    // TODO 错误校验
    return stanConfig;
  }

  return [];
};
