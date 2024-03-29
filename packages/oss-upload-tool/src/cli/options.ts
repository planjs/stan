import { commander, chalk } from 'stan-utils';

import type { OSSUploadOptions } from '../types';
import { ALIOSS_ENDPOINT_KEY, BUCKET_KEY, REGION_KEY, SECRET_ID, SECRET_KEY } from '../consts';
import { safeSetEnv } from '../utils';

const pkg = require('../../package.json');

commander.option('-V, --verbose', 'Output verbose messages on internal operations');
commander.option('--oss [COS|ALI|S3]', 'OSS Type only supported COS|ALI|S3');
commander.option('-t, --targets <list>', 'Upload targets local path', collect);
commander.option('-d, --dest <list>', 'Upload remote directory', collect);
commander.option('--flatten', 'Delete the directory structure of uploaded files', booleanify);
commander.option('--secret_id [string]', 'OSS SecretId params');
commander.option('--secret_key [string]', 'OSS SecretKey params');
commander.option('--bucket [string]', 'OSS Bucket params');
commander.option('--origin [string]', 'Accessible cdn address');
commander.option('--existCheck [string]', 'If the file exists, skip uploading');
commander.option('--region [string]', 'OSS Region params');
commander.option('--endpoint [string]', 'Ali OSS endpoint params');

commander.name(pkg.name);
commander.version(pkg.version);

export default function parseArgv(args: string[]): OSSUploadOptions | void {
  commander.parse(args);

  // if (!commander.args.length) {
  //   commander.outputHelp();
  //   return;
  // }

  const opts = commander.opts();

  const errors: string[] = [];

  if (!opts?.targets?.length) {
    errors.push('Please specify the file to upload, use -t.');
  }

  if (errors.length) {
    console.error(chalk.red(`${pkg.name} error:`));
    errors.forEach(function (e) {
      console.error(chalk.redBright('  ' + e));
    });
    return;
  }

  const { secret_id, secret_key, bucket, region, endpoint, existCheck } = opts;

  // setup env
  safeSetEnv(SECRET_ID, secret_id);
  safeSetEnv(SECRET_KEY, secret_key);
  safeSetEnv(BUCKET_KEY, bucket);
  safeSetEnv(REGION_KEY, region);
  safeSetEnv(ALIOSS_ENDPOINT_KEY, endpoint);

  return {
    cwd: process.cwd(),
    verbose: !!opts.verbose,
    type: opts.oss,
    targets: (opts?.targets || []).filter(Boolean).map((src: string) => {
      return {
        src,
        dest: opts.dest,
        flatten: opts.flatten,
      };
    }),
    existCheck,
  };
}

function collect(value: string | any, previousValue: Array<string>): Array<string> {
  if (typeof value !== 'string') return previousValue;

  const values = value.split(',');

  return previousValue ? previousValue.concat(values) : values;
}

function booleanify(val: any): boolean | any {
  // eslint-disable-next-line eqeqeq
  if (val === 'true' || val == 1) {
    return true;
  }

  // eslint-disable-next-line eqeqeq
  if (val === 'false' || val == 0 || !val) {
    return false;
  }

  return val;
}
