#!/usr/bin/env node

const { updateNotifier, signale } = require('stan-utils');
const pkg = require('../package.json');
const builder = require('../lib').default;
const parseArgv = require('../lib/cmd-options').default;

updateNotifier({ pkg }).notify({ defer: true });

const opts = parseArgv(process.argv);

if (opts) {
  builder(opts).catch((e) => {
    signale.error(e);
    process.exit(1);
  });
}
