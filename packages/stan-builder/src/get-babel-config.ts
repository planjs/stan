import { PluginItem } from '@babel/core';
import { ModuleFormat } from 'rollup';

import type { BundleOptions } from './types';
const browserslist = require('../template/browserslist.js');

export type GetBabelConfigOptions = {
  target: BundleOptions['target'];
  type?: ModuleFormat;
  typescript?: boolean;
  runtimeHelpers?: boolean;
  verbose?: boolean;
  lazy?: boolean;
};

export default function getBabelConfig(
  opts: GetBabelConfigOptions,
): {
  presets: PluginItem[];
  plugins: PluginItem[];
} {
  const { type, typescript, target, verbose, lazy, runtimeHelpers } = opts;
  const isBrowser = target === 'browser';

  return {
    presets: [
      typescript && require.resolve('@babel/preset-typescript'),
      [
        require.resolve('@babel/preset-env'),
        {
          targets: isBrowser ? { browsers: browserslist } : { node: 8 },
          debug: verbose,
          modules: type === 'esm' ? false : 'auto',
        },
      ],
      isBrowser && require.resolve('@babel/preset-react'),
    ].filter(Boolean) as PluginItem[],
    plugins: [
      type === 'cjs' &&
        lazy &&
        !isBrowser && [
          require.resolve('@babel/plugin-transform-modules-commonjs'),
          {
            lazy: true,
          },
        ],
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-do-expressions'),
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      require.resolve('@babel/plugin-transform-spread'),
      require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
      require.resolve('@babel/plugin-proposal-optional-chaining'),
      runtimeHelpers && [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          useESModules: isBrowser && type === 'esm',
          version: require('@babel/runtime/package.json').version,
        },
      ],
    ].filter(Boolean) as PluginItem[],
  };
}
