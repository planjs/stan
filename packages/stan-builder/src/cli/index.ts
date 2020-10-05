import { updateNotifier, signale } from 'stan-utils';

import parseArgv from './options';
import builder from '../builder';

const pkg = require('../../package.json');

updateNotifier({ pkg }).notify({ defer: true });

const opts = parseArgv(process.argv);

if (opts) {
  builder(opts).catch((e) => {
    signale.error(e);
    process.exit(1);
  });
}
