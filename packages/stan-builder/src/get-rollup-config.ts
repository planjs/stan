import path from 'path';
import {
  ExternalOption,
  InputOptions,
  ModuleFormat,
  Plugin,
  OutputOptions,
  GlobalsOption,
} from 'rollup';
import { terser } from 'rollup-plugin-terser';
import url from '@rollup/plugin-url';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import inject from '@rollup/plugin-inject';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import builtinModules from 'builtin-modules';
import typescript2 from 'rollup-plugin-typescript2';
import visualizer from 'rollup-plugin-visualizer';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import { lodash as _ } from 'stan-utils';

import { BundleOptions, CJSOptions, ESMOptions, SYSOptions, UMDOptions } from './types';
import getBabelConfig from './get-babel-config';
import { PackageJson } from './pkg';
import { parseMappingArgument } from './utils';

export type IRollupOptions = InputOptions & { output: OutputOptions };

export type GetRollupConfigOptions = {
  cwd: string;
  target: BundleOptions['target'];
  type?: ModuleFormat;
  typescript?: boolean;
  /**
   * https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
   * @default true bundled
   * false runtime
   */
  runtimeHelpers?: boolean;
  verbose?: boolean;
  lazy?: boolean;
  bundleOpt: BundleOptions;
};

export default function getRollupConfig(opts: GetRollupConfigOptions): IRollupOptions[] {
  const { type: format, cwd, bundleOpt, verbose } = opts;

  const {
    entry,
    esm,
    cjs,
    umd,
    system,
    file,
    target = 'browser',
    extractCSS = false,
    injectCSS = true,
    analyze,
    disableTypeCheck,
    minify,
    runtimeHelpers: _runtimeHelpers,
    sourcemap,
    babelPlugins = [],
    extraBabelPlugins = [],
    babelPresets = [],
    extraBabelPresets = [],
    injectOpts,
    terserOpts,
    replaceOpts,
    commonjsOpts,
    nodeResolveOpts,
    typescript2Opts,
    postcssOpts,
    aliasOpts,
    visualizerOpts,
    extraExternals = [],
    externalsExclude = [],
    extraRollupPlugins = [],
    externalPeerDependenciesOnly = false,
  } = bundleOpt;

  const input = path.join(cwd, entry!);
  const entryExt = path.extname(entry!);
  const isTypeScript = entryExt === '.ts' || entryExt === '.tsx';
  const extensions = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'];

  const moduleOpts: UMDOptions | ESMOptions | CJSOptions | SYSOptions | null = {
    umd,
    cjs,
    esm,
    system,
  }?.[format!];

  let pkg = {} as PackageJson;
  try {
    pkg = require(path.join(cwd, 'package.json'));
  } catch (e) {}

  const _target = moduleOpts?.target ?? target;
  const _sourcemap = moduleOpts?.sourcemap ?? sourcemap;
  const _minify = moduleOpts?.minify ?? minify;
  const _file = moduleOpts?.file ?? file;

  let browser = _target === 'browser';
  if (['.tsx', '.jsx'].includes(path.extname(entry!))) {
    browser = true;
  }
  const runtimeHelpers = moduleOpts?.runtimeHelpers ?? _runtimeHelpers;
  const babelHelpers = runtimeHelpers ? 'runtime' : 'bundled';

  const babelOptions = {
    ...getBabelConfig({
      type: format,
      typescript: true,
      target: _target,
      runtimeHelpers: runtimeHelpers,
    }),
    babelrc: false,
    exclude: /\/node_modules\//,
    extensions,
  };
  if (babelPresets.length) babelOptions.presets = babelPresets;
  if (babelPlugins.length) babelOptions.plugins = babelPlugins;
  babelOptions.presets.push(...extraBabelPresets);
  babelOptions.plugins.push(...extraBabelPlugins);

  function getPlugins(isMin?: boolean): Plugin[] {
    return [
      alias(aliasOpts),
      url(),
      json(),
      postcss({
        extract: extractCSS,
        inject: injectCSS,
        minimize: !!isMin,
        ...postcssOpts,
        plugins: [
          ...(postcssOpts?.plugins || []),
          isMin &&
            cssnano({
              preset: 'default',
            }),
          autoprefixer(),
        ].filter(Boolean),
      }),
      injectOpts && inject(injectOpts),
      replace && replace(replaceOpts),
      isTypeScript &&
        typescript2({
          cwd,
          clean: true,
          tsconfigDefaults: {
            compilerOptions: {
              declaration: true,
              sourceMap: _sourcemap,
              jsx: 'preserve',
            },
          },
          verbosity: verbose ? 3 : 1,
          cacheRoot: `./node_modules/.cache/.ts2_cache_${format}`,
          typescript: require('typescript'),
          useTsconfigDeclarationDir: true,
          check: !disableTypeCheck,
          ...typescript2Opts,
        }),
      commonjs(commonjsOpts),
      resolve({
        mainFields: ['module', 'jsnext:main', 'main'],
        browser,
        extensions,
        preferBuiltins: target === 'node',
        ...nodeResolveOpts,
      }),
      babel({
        ...babelOptions,
        babelHelpers,
      }),
      minify &&
        terser({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
          },
          ...terserOpts,
        }),
      (analyze || !_.isEmpty(visualizerOpts)) && visualizer(visualizerOpts),
      ...extraRollupPlugins,
    ].filter(Boolean);
  }

  function getExternal(): (string | RegExp)[] {
    let PKGs: ExternalOption = [...extraExternals];
    PKGs.push(...Object.keys(pkg?.peerDependencies! || {}));
    if (format !== 'umd') {
      if (!externalPeerDependenciesOnly) {
        PKGs.push(...Object.keys(pkg?.dependencies || {}));
      }
      if (runtimeHelpers) {
        PKGs.push(/@babel\/runtime/);
      }
    }
    // @see https://github.com/rollup/plugins/tree/master/packages/node-resolve/#resolving-built-ins-like-fs
    if (!browser) {
      PKGs.concat(builtinModules);
    }
    return PKGs.filter((v) => !externalsExclude.includes(v));
  }

  function getOutputFilePath(isMin = false, isMJS = false): string {
    const fileName =
      _file ||
      [path.basename(entry!, entryExt), format, isMin && 'min', isMJS ? 'mjs' : 'js']
        .filter((v) => v)
        .join('.');
    return path.join(cwd, `dist/${fileName}`);
  }

  const output: OutputOptions = {
    format,
    sourcemap: _sourcemap,
    file: getOutputFilePath(),
    freeze: false,
  };

  const external = getExternal();
  const plugins = getPlugins();

  if (format === 'cjs') {
    output.esModule = false;
    output.exports = 'auto';
  }

  // process globals and name
  if (format === 'umd') {
    const _umd = umd as UMDOptions;
    const global: GlobalsOption = external.reduce((globals, name) => {
      if (name instanceof RegExp) name = name.source;
      if (name.match(/^[a-z_$][a-z0-9_\-$]*$/)) {
        globals[name] = _.camelCase(name);
      }
      return globals;
    }, {});
    if (typeof _umd?.globals === 'string') {
      Object.assign(global, parseMappingArgument(_umd?.globals));
    } else {
      Object.assign(global, _umd?.globals || {});
    }
    output.globals = global;
    output.name = (_umd?.name || (pkg.name && _.camelCase(path.basename(pkg.name)))).replace(
      /^global\./,
      '',
    );
  }

  switch (format) {
    case 'system':
    case 'umd':
    case 'esm':
    case 'cjs':
      return [
        {
          input,
          output,
          inlineDynamicImports: true,
          plugins,
          external,
        },
        (moduleOpts as ESMOptions)?.mjs && {
          input,
          output: {
            ...output,
            file: getOutputFilePath(false, true),
          },
          inlineDynamicImports: true,
          plugins,
          external,
        },
        _minify && {
          input,
          output: {
            ...output,
            file: getOutputFilePath(true),
          },
          inlineDynamicImports: true,
          plugins: getPlugins(true),
          external,
        },
      ].filter(Boolean) as IRollupOptions[];
    default:
      throw new Error(`Unsupported type ${format}`);
  }
}
