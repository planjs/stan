import { OSSUploadOptions, OSSUploadLocalItem } from './types';

export type UploadOptions = {
  onProgress: (loaded: number, total: number, speed: number) => void;
};

export abstract class Client<Options = {}, UploadParams = {}> {
  opt: OSSUploadOptions;

  protected constructor(options: OSSUploadOptions) {
    this.opt = options;
  }

  /**
   * 上传单个文件
   * @param item
   * @param params
   * @param options
   */
  abstract upload(
    item: OSSUploadLocalItem,
    params?: Partial<UploadParams>,
    options?: UploadOptions,
  ): Promise<{ url: string }>;

  /**
   * 检查系统默认的配置
   * 敏感配置建议通过环境或者系统配置获取，不要直接暴露到项目中
   */
  abstract get globalOptions(): Partial<Options>;

  /**
   * 通用上传参数
   */
  abstract get globalUploadParams(): Partial<UploadParams>;
}
