import { Plugin } from 'rollup';
import { FilterPattern } from '@rollup/pluginutils';
import { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve';
import { RollupReplaceOptions } from '@rollup/plugin-replace';
import { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import { RollupInjectOptions } from '@rollup/plugin-inject';

export type BundleType = 'rollup' | 'babel';

export interface BaseOutputOptions {
  file?: string;
  /**
   * 开启压缩
   * @default false
   */
  bundler: BundleType;
  minify?: boolean;
  sourcemap?: boolean;
  /**
   * 配置 node 或者 browser 库
   */
  target?: 'node' | 'browser';
}

export interface UMDOptions extends BaseOutputOptions {
  name?: string;
}
export interface ESMOptions extends BaseOutputOptions {}
export interface CJSOptions extends BaseOutputOptions {}

export interface BundleOptions extends BaseOutputOptions {
  /**
   * 入口文件
   */
  entry?: string;
  runtimeHelpers?: boolean;
  esm?: ESMOptions | BundleType | false;
  cjs?: CJSOptions | BundleType | false;
  umd?: UMDOptions | false;
  include?: FilterPattern;
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
   * css modules 配置
   */
  cssModules?: any;
  /**
   * rollup 的 external 保留内部默认处理，新增 external
   * 打包esm, cjs时 dependencies 和 peerDependencies 里的内容会被 external
   * 打包umd时 peerDependencies 会被 external
   */
  extraExternal?: string[];
  /**
   * 配置依赖不 external
   */
  externalsExclude?: string[];
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
}

export interface BuildOptions {
  cwd: string;
  watch?: boolean;
  rootPath?: string;
  args?: BundleOptions;
}
