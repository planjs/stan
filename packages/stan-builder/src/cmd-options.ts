import { commander } from 'stan-utils';
import { BuildOptions } from './types';

const pkg = require('../package.json');

commander.option('-e, --entry', 'Entry file');
commander.option('-f, --file', 'Output filename');
commander.option('-min, --minify', 'Minify code', booleanify, false);
commander.option('-b, --bundler [rollup|babel]', 'Use rollup or babel to package', 'rollup');
commander.option('-w, --watch', 'Recompile files on changes', booleanify, false);
commander.option('-map, --sourcemap', 'Generate sourcemap', booleanify, true);
commander.option('--verbose', 'Output verbose messages on internal operations', booleanify);
commander.option('-t, --target [node|browser]', 'Node or Browser lib', 'browser');
commander.option('--umd [filename]', 'Output as umd specification', false);
commander.option('--cjs [filename]', 'Output as cjs specification', true);
commander.option('--esm [filename]', 'Output as esm specification', true);
commander.option('--plugins [list]', 'Babel plugin', collect);
commander.option('--presets [list]', 'Babel presets', collect);

commander.version(pkg.version);

export default function parseArgv(args: string[]): BuildOptions | void {
  commander.parse(args);

  const errors: string[] = [];

  if (errors.length) {
    console.error(`${pkg.name}:`);
    errors.forEach(function (e) {
      console.error('  ' + e);
    });
    return;
  }

  const opts = commander.opts();

  return {
    cwd: process.cwd(),
    verbose: !!opts.verbose,
    watch: !!opts.watch,
    args: {
      entry: opts.entry,
      minify: !!opts.minify,
      file: opts.file,
      bundler: opts.bundler,
      target: opts.target,
      babelPlugins: opts.plugins,
      babelPresets: opts.presets,
      umd: opts.umd,
      cjs: opts.umd,
      esm: opts.umd,
      sourcemap: opts.sourcemap,
    },
  };
}

function booleanify(val: any): boolean {
  if (val === 'true' || val == 1) {
    return true;
  }

  if (val === 'false' || val == 0 || !val) {
    return false;
  }

  return !!val;
}

function collect(value: string | any, previousValue: Array<string>): Array<string> {
  if (typeof value !== 'string') return previousValue;

  const values = value.split(',');

  return previousValue ? previousValue.concat(values) : values;
}
