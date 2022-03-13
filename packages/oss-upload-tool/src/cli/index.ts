import { updateNotifier, signale } from 'stan-utils';
import ossUpload from '../oss';
import parseArgv from './options';

const pkg = require('../../package.json');

updateNotifier({
  pkg,
  updateCheckInterval: 0,
  shouldNotifyInNpmScript: true,
}).notify({ defer: true });

const opts = parseArgv(process.argv);

if (opts) {
  ossUpload(opts).catch((e) => {
    signale.error(e);
    process.exitCode = (typeof e?.code === 'number' && e.code) || 1;
    process.exit();
  });
}
