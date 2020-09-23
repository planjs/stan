import { lodash as _ } from 'stan-utils';

export interface RollupOptions {
  cwd: string;
  entry: string | string[];
  watch?: boolean;
}

async function build(entry: string, opts: Omit<RollupOptions, 'entry'>) {
  console.log(entry, opts);
}

export default async function (opts: RollupOptions) {
  const { entry, ...o } = opts;
  const entries = _.uniq(_.flattenDeep([entry]));
  for (const _entry of entries) {
    await build(_entry, o);
  }
}
