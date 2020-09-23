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
  esm?: ESMOptions;
  cjs?: CJSOptions;
  umd?: UMDOptions;
  /**
   * css modules 配置
   */
  cssModules?: any;
  /**
   * rollup 的 external
   * @note 不推荐设置，默认以下配置
   *  打包esm, cjs时 dependencies 和 peerDependencies 里的内容会被 external
   *  打包umd时 peerDependencies 会被 external
   */
  external?: string[];
  /**
   * rollup 的 external 保留内部默认处理，新增 external
   */
  extraExternal?: string[];
}

export interface BuildOptions {
  cwd: string;
  watch?: boolean;
  args?: BundleOptions;
}
