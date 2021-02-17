import { updateNotifier, signale } from 'stan-utils';

import parseArgv from './options';
import builder from '../builder';

const pkg = require('../../package.json');

updateNotifier({
  pkg,
  updateCheckInterval: 0,
  shouldNotifyInNpmScript: true,
}).notify({ defer: true });

const opts = parseArgv(process.argv);

if (opts) {
  builder(opts)
    .then(() => {
      if (!opts.watch) process.exit(0);
    })
    .catch((e) => {
      signale.error(e);
      process.exitCode = (typeof e?.code === 'number' && e.code) || 1;
      process.exit();
    });
}
