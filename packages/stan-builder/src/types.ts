import type { Plugin } from 'rollup';
import type { FilterPattern } from '@rollup/pluginutils';
import type { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve';
import type { RollupReplaceOptions } from '@rollup/plugin-replace';
import type { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import type { RollupInjectOptions } from '@rollup/plugin-inject';
import type { Options as RollupTerserOptions } from 'rollup-plugin-terser';
import type { RPT2Options } from 'rollup-plugin-typescript2';
import type { RollupAliasOptions } from '@rollup/plugin-alias';
import type { PluginVisualizerOptions } from 'rollup-plugin-visualizer';
import type { PostCSSPluginConf } from 'rollup-plugin-postcss';
import type { VuePluginOptions } from 'rollup-plugin-vue';
import type { CopyOptions } from 'stan-utils';

export type BundleType = 'rollup' | 'babel';

export type OutputModule = 'cjs' | 'esm' | 'system' | 'umd';

export interface BaseBundleOptions {
  file?: string;
  /**
   * 打包工具
   * @default rollup
   */
  bundler?: BundleType;
  /**
   * 压缩代码
   * js terser
   * @default false
   */
  minify?: boolean;
  /**
   * 输出sourcemap
   * @default false
   */
  sourcemap?: boolean;
  /**
   * 配置 node 或者 browser 库
   */
  target?: 'node' | 'browser';
  runtimeHelpers?: boolean;
}

export interface UMDOptions extends BaseBundleOptions {
  name?: string;
  /**
   * 可以支持 $=jquery,React=react
   */
  globals?: Record<string, string> | string;
}

export interface ESMOptions extends BaseBundleOptions {
  mjs?: boolean;
}

export interface CJSOptions extends BaseBundleOptions {
  /**
   * 导入模块的延迟初始化
   * https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
   */
  lazy?: boolean;
}

export interface SYSOptions extends BaseBundleOptions {}

/**
 * build options
 */
export interface BundleOptions extends BaseBundleOptions {
  /**
   * 入口文件
   * @default src/index.js, src/index.ts, src/index.tsx, src/index.jsx
   */
  entry?: string;
  esm?: ESMOptions | BundleType | boolean;
  cjs?: CJSOptions | BundleType | boolean;
  umd?: UMDOptions | boolean;
  system?: SYSOptions | boolean;
  include?: FilterPattern;
  disableTypeCheck?: boolean;
  /**
   * 配置是否提取 css 为单独文件。
   */
  extractCSS?: boolean;
  /**
   * 是否在 <head>里注入css, 如果extractCSS: true，则为false
   */
  injectCSS?: boolean;
  /**
   * 打包的模块大小可视化展示
   * 使用了 rollup-plugin-visualizer
   */
  analyze?: boolean;
  /**
   * babel plugin 配置
   * @note 不推荐配置 会覆盖默认调优的配置
   */
  babelPlugins?: any[];
  /**
   * babel presets
   * @note 不推荐配置 会覆盖默认调优的配置
   */
  babelPresets?: string[];
  /**
   * 新增 babel plugin
   */
  extraBabelPlugins?: any[];
  /**
   * 新增 babel presets
   */
  extraBabelPresets?: any[];
  /**
   * rollup 的 external 保留内部默认处理，新增 external
   * 打包esm, cjs时 dependencies 和 peerDependencies 里的内容会被 external
   * 打包umd时 peerDependencies 会被 external
   */
  extraExternals?: (string | RegExp)[];
  /**
   * 配置依赖不 external
   */
  externalsExclude?: (string | RegExp)[];
  /**
   * 只external peerDependencies
   */
  externalPeerDependenciesOnly?: boolean;
  /**
   * 配置额外 postcss plugin
   */
  extraPostCSSPlugins?: any[];
  /**
   * 配置额外 rollup plugin
   */
  extraRollupPlugins?: Plugin[];
  /**
   * 配置 @rollup/plugin-node-resolve 参数
   */
  nodeResolveOpts?: RollupNodeResolveOptions;
  /**
   * 配置 @rollup/plugin-replace 参数
   */
  replaceOpts?: RollupReplaceOptions;
  /**
   * 配置 @rollup/plugin-commonjs 参数
   */
  commonjsOpts?: RollupCommonJSOptions;
  /**
   * 配置 @rollup/plugin-inject 参数
   */
  injectOpts?: RollupInjectOptions;
  /**
   * 配置 rollup-plugin-terser 参数
   */
  terserOpts?: RollupTerserOptions;
  /**
   * 配置 rollup-plugin-typescript2 参数
   */
  typescript2Opts?: RPT2Options;
  /**
   * 配置 @rollup/plugin-alias 参数
   */
  aliasOpts?: RollupAliasOptions;
  /**
   * 配置 rollup-plugin-visualizer
   */
  visualizerOpts?: PluginVisualizerOptions;
  /**
   * 配置 rollup-plugin-postcss
   */
  postcssOpts?: PostCSSPluginConf;
  /**
   * copy 文件
   * 如果是watch模式，这些复制的文件也会被watch
   */
  copy?: CopyOptions;
  /**
   * vue 插件配置
   * https://www.npmjs.com/package/rollup-plugin-vue
   */
  vuePluginOpts?: VuePluginOptions;
}

export interface BuildOptions {
  cwd: string;
  rootPath?: string;
  watch?: boolean;
  args?: BundleOptions;
  verbose?: boolean;
}
