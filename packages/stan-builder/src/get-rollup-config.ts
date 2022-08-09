import path from 'path';
import {
  ExternalOption,
  InputOptions,
  ModuleFormat,
  Plugin,
  OutputOptions,
  GlobalsOption,
  WarningHandlerWithDefault,
} from 'rollup';
import { terser } from 'rollup-plugin-terser';
import url from '@rollup/plugin-url';
import alias from '@rollup/plugin-alias';
import svgr from '@svgr/rollup';
import json from '@rollup/plugin-json';
import inject from '@rollup/plugin-inject';
import babel, { RollupBabelInputPluginOptions } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import builtinModules from 'builtin-modules';
import visualizer from 'rollup-plugin-visualizer';
import postcss from 'rollup-plugin-postcss';
import LessNpmImport from 'less-plugin-npm-import';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import type { default as vue } from 'rollup-plugin-vue';
import { chalk, lodash as _, relativeNormalize } from 'stan-utils';

import type { BundleOptions, CJSOptions, ESMOptions, SYSOptions, UMDOptions } from './types';
import getBabelConfig from './get-babel-config';
import { PackageJson } from './pkg';
import { getNodeModulePKG, parseMappingArgument, checkTSConfigIsExist } from './utils';

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
    minifyOnly,
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
    vuePluginOpts,
  } = bundleOpt;

  const input = path.join(cwd, entry!);
  const entryExt = path.extname(entry!);
  const isTypeScript = entryExt === '.ts' || entryExt === '.tsx' || checkTSConfigIsExist(cwd);
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
  const _minifyOnly = moduleOpts?.minifyOnly || minifyOnly;
  const _minify = _minifyOnly || moduleOpts?.minify || minify;
  const _file = moduleOpts?.file ?? file;

  let browser = _target === 'browser';
  if (['.tsx', '.jsx'].includes(path.extname(entry!))) {
    browser = true;
  }
  const runtimeHelpers = moduleOpts?.runtimeHelpers ?? _runtimeHelpers;
  const babelHelpers = runtimeHelpers ? 'runtime' : 'bundled';

  const babelOptions: RollupBabelInputPluginOptions = {
    ...getBabelConfig({
      type: format,
      typescript: true,
      target: _target,
      runtimeHelpers: runtimeHelpers,
      cwd,
    }),
    babelrc: false,
    configFile: false,
    exclude: /\/node_modules\//,
    babelHelpers,
    extensions,
  };
  if (babelPresets.length) babelOptions.presets = babelPresets;
  if (babelPlugins.length) babelOptions.plugins = babelPlugins;
  babelOptions.presets!.push(...extraBabelPresets);
  babelOptions.plugins!.push(...extraBabelPlugins);

  function getPlugins(format: ModuleFormat, isMin?: boolean): Plugin[] {
    const RollupPluginVue = getNodeModulePKG<typeof vue>('rollup-plugin-vue');
    const isUMD = format === 'umd';
    return [
      RollupPluginVue.default?.({
        css: true,
        ...(RollupPluginVue.version!.includes('6')
          ? {
              compileTemplate: true,
            }
          : {}),
        ...vuePluginOpts,
      }),
      aliasOpts && alias(aliasOpts),
      svgr(),
      url(),
      json(),
      postcss({
        extract: extractCSS,
        inject: injectCSS,
        minimize: !!isMin,
        ...postcssOpts,
        use: {
          stylus: {},
          sass: {},
          ...postcssOpts?.use,
          // less can't use ~
          less: {
            plugins: [new LessNpmImport({ prefix: '~' })],
            javascriptEnabled: true,
            ...postcssOpts?.use?.['less'],
          },
        },
        plugins: [
          ...(postcssOpts?.plugins || []),
          isMin &&
            cssnano({
              preset: 'default',
            }),
          autoprefixer({
            remove: false,
          }),
        ].filter(Boolean),
      }),
      injectOpts && inject(injectOpts),
      (replaceOpts || isUMD) &&
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
          ...replaceOpts,
        }),
      isTypeScript &&
        require('rollup-plugin-typescript2')({
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
      babel(babelOptions),
      isMin &&
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
    const PKGs: ExternalOption = [...extraExternals];
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
    function getExt() {
      return ['', ...[format, isMin && 'min', isMJS ? 'mjs' : 'js'].filter((v) => v)].join('.');
    }
    const fileName = _file || path.basename(entry!, entryExt);
    return path.join(cwd, `dist/${fileName + getExt()}`);
  }

  const output: OutputOptions = {
    format,
    sourcemap: _sourcemap,
    file: getOutputFilePath(),
    freeze: false,
  };

  const externalArr = getExternal();

  if (format === 'cjs') {
    output.esModule = false;
    output.exports = 'auto';
  }

  // process globals and name
  if (format === 'umd') {
    const _umd = umd as UMDOptions;
    const global: GlobalsOption = externalArr.reduce((globals, name) => {
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
    output.name = (_umd?.name || (pkg.name && _.camelCase(path.basename(pkg.name))) || '').replace(
      /^global\./,
      '',
    );
  }

  const onwarn: WarningHandlerWithDefault = (warning, next) => {};

  const external = (source: string) => {
    const isMatch = (() => {
      function test(arr: (string | RegExp)[], id: string, generated: boolean = false) {
        for (const exp of arr) {
          if (exp === id) return true;
          if (_.isRegExp(exp) && exp.test(id)) {
            if (verbose) {
              console.log(
                chalk.yellow(
                  `WARN The rule "${exp}" takes effect and the file "${relativeNormalize(id)}" ${
                    generated ? 'will be compiled' : 'will not be compiled'
                  }.`,
                ),
              );
            }
            return true;
          }
        }
        return false;
      }
      if (test(externalsExclude, source, true)) return false;
      return test(externalArr, source);
    })();

    if (isMatch && source === input) {
      console.log(
        chalk.red(
          `The parameter "externalArr" matches the entry file, force mismatch, please check configuration`,
        ),
      );
      return false;
    }

    return isMatch;
  };

  switch (format) {
    case 'system':
    case 'umd':
    case 'esm':
    case 'cjs':
      const plugins = getPlugins(format);
      return [
        !_minifyOnly && {
          input,
          output,
          inlineDynamicImports: true,
          plugins,
          external,
          onwarn,
        },
        !_minifyOnly &&
          (moduleOpts as ESMOptions)?.mjs && {
            input,
            output: {
              ...output,
              file: getOutputFilePath(false, true),
            },
            inlineDynamicImports: true,
            plugins,
            onwarn,
            external,
          },
        (_minifyOnly || _minify) && {
          input,
          output: {
            ...output,
            file: getOutputFilePath(true),
          },
          inlineDynamicImports: true,
          plugins: getPlugins(format, true),
          external,
          onwarn,
        },
      ].filter(Boolean) as IRollupOptions[];
    default:
      throw new Error(`Unsupported type ${format}`);
  }
}
