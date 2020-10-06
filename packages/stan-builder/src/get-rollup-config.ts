import path from 'path';
import { ExternalOption, InputOptions, ModuleFormat, Plugin, OutputOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import url from '@rollup/plugin-url';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import inject from '@rollup/plugin-inject';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import typescript2 from 'rollup-plugin-typescript2';
import { lodash as _ } from 'stan-utils';

import { BundleOptions, CJSOptions, ESMOptions, SYSOptions, UMDOptions } from './types';
import getBabelConfig from './get-babel-config';
import { PackageJson } from './pkg';

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
  const { type: format, cwd, bundleOpt } = opts;

  const {
    entry,
    esm,
    cjs,
    umd,
    system,
    file,
    target = 'browser',
    disableTypeCheck,
    minify,
    runtimeHelpers,
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
    extraRollupPlugins = [],
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

  const browser = moduleOpts?.target === 'browser' || target === 'browser';

  const babelHelpers =
    (format === 'cjs' || format === 'umd') && !browser
      ? 'bundled'
      : runtimeHelpers
      ? 'runtime'
      : 'bundled';
  const _runtimeHelpers = babelHelpers === 'runtime';
  const _sourcemap = moduleOpts?.sourcemap || sourcemap;
  const babelOptions = {
    ...getBabelConfig({
      type: format,
      typescript: true,
      target,
      runtimeHelpers: _runtimeHelpers,
    }),
    babelrc: false,
    exclude: /\/node_modules\//,
    extensions,
  };
  if (babelPresets.length) babelOptions.presets = babelPresets;
  if (babelPlugins.length) babelOptions.plugins = babelPlugins;
  babelOptions.presets.push(...extraBabelPresets);
  babelOptions.plugins.push(...extraBabelPlugins);

  function getPlugins(): Plugin[] {
    return [
      babel({
        ...babelOptions,
        babelHelpers,
      }),
      alias(),
      url(),
      json(),
      injectOpts && inject(injectOpts),
      replace && replace(replaceOpts),
      isTypeScript &&
        typescript2({
          cwd,
          tsconfig: path.join(cwd, 'tsconfig.json'),
          clean: true,
          tsconfigDefaults: {
            compilerOptions: {
              declaration: true,
              emitDeclarationOnly: true,
            },
          },
          typescript: require('typescript'),
          useTsconfigDeclarationDir: true,
          check: !disableTypeCheck,
        }),
      commonjs({ extensions, ...commonjsOpts }),
      resolve({
        mainFields: ['module', 'jsnext:main', 'main'],
        browser,
        extensions,
        ...nodeResolveOpts,
      }),
      ...extraRollupPlugins,
    ].filter(Boolean);
  }

  function getExternal(): ExternalOption {
    if (format === 'umd') {
      return Object.keys(pkg?.peerDependencies! || {});
    }
    return [
      _runtimeHelpers ? /@babel\/runtime/ : '',
      ...Object.keys(pkg?.dependencies || {}),
      ...Object.keys(pkg?.peerDependencies || {}),
    ].filter(String);
  }

  function getOutputFilePath(suffix = ''): string {
    const mjs = !!(moduleOpts as ESMOptions)?.mjs;
    const fileName =
      moduleOpts?.file ||
      file ||
      [path.basename(entry!, entryExt), format, suffix, mjs ? 'mjs' : 'js']
        .filter(String)
        .join('.');
    return path.join(cwd, `dist/${fileName}`);
  }

  const minifyPlugin = [
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
      ...terserOpts,
    }),
  ];

  const output: OutputOptions = {
    format,
    sourcemap: _sourcemap,
    file: getOutputFilePath(),
  };

  if (format === 'cjs') {
    output.esModule = false;
    output.exports = 'auto';
  }

  if (format === 'umd') {
    const _umd = umd as UMDOptions;
    output.globals = _umd?.globals;
    output.name = _umd?.name || (pkg.name && _.camelCase(path.basename(pkg.name)));
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
          plugins: getPlugins(),
          external: getExternal(),
        },
        (moduleOpts as ESMOptions)?.mjs && {
          input,
          output,
          plugins: getPlugins(),
          external: getExternal(),
        },
        (moduleOpts?.minify ?? minify) && {
          input,
          output: {
            ...output,
            file: getOutputFilePath('min'),
          },
          plugins: [...getPlugins(), ...minifyPlugin],
          external: getExternal(),
        },
      ].filter(Boolean) as IRollupOptions[];
    default:
      throw new Error(`Unsupported type ${format}`);
  }
}
