import { BundleOptions } from './types';

export interface BabelOptions {
  cwd: string;
  entry: string | string[];
  watch?: boolean;
  bundleOptions: BundleOptions;
}

export default async function babelBuild(entry: string, opts: BabelOptions) {
  console.log(entry, opts);
}
