import { lodash as _ } from 'stan-utils';
import { BundleOptions } from './types';

export interface RollupOptions {
  cwd: string;
  entry: string | string[];
  watch?: boolean;
  bundleOptions: BundleOptions;
}

export async function rollupBuild(entry: string, opts: RollupOptions) {
  console.log(entry, opts);
}

export default async function (opts: RollupOptions) {
  const { entry } = opts;
  const entries = _.uniq(_.flattenDeep([entry]));
  for (const _entry of entries) {
    await rollupBuild(_entry, opts);
  }
}
