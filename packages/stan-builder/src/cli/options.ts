import { commander } from 'stan-utils';
import { BuildOptions } from '../types';

const pkg = require('../../package.json');

commander.option('-e, --entry <filename>', 'Entry file');
commander.option('-f, --file <filename>', 'Output filename');
commander.option('-b, --bundler [rollup|babel]', 'Use rollup or babel to package', 'rollup');
commander.option('-w, --watch', 'Recompile files on changes');
commander.option('-t, --target [node|browser]', 'Node or Browser lib', 'browser');
commander.option('-min, --minify', 'Minify code');
commander.option('--sourcemap', 'Generate sourcemap');
commander.option('--analyze', 'Analyze bundle');
commander.option('--runtime', 'Babel runtime');
commander.option('--verbose', 'Output verbose messages on internal operations');
commander.option('--umd [filename]', 'Output as umd specification');
commander.option('--system [filename]', 'Output as systemjs specification');
commander.option('--cjs [filename]', 'Output as cjs specification');
commander.option('--esm [filename]', 'Output as esm specification');
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
      analyze: !!opts.analyze,
      runtimeHelpers: !!opts.runtime,
      umd:
        typeof booleanify(opts.umd) === 'boolean'
          ? opts.umd
          : opts.umd
          ? {
              file: opts.umd,
            }
          : false,
      system:
        typeof booleanify(opts.system) === 'boolean'
          ? opts.system
          : opts.system
          ? {
              file: opts.system,
            }
          : false,
      cjs:
        typeof booleanify(opts.cjs) === 'boolean'
          ? opts.cjs
          : opts.cjs
          ? {
              file: opts.cjs,
            }
          : false,
      esm:
        typeof booleanify(opts.esm) === 'boolean'
          ? opts.esm
          : opts.esm
          ? {
              file: opts.esm,
            }
          : false,
      sourcemap: opts.sourcemap,
    },
  };
}

function collect(value: string | any, previousValue: Array<string>): Array<string> {
  if (typeof value !== 'string') return previousValue;

  const values = value.split(',');

  return previousValue ? previousValue.concat(values) : values;
}

function booleanify(val: any): boolean | any {
  if (val === 'true' || val == 1) {
    return true;
  }

  if (val === 'false' || val == 0 || !val) {
    return false;
  }

  return val;
}
