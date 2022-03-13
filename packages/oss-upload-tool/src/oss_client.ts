import { OSSUploadOptions, OSSUploadLocalItem } from './types';

export abstract class Client<Options = {}, UploadOptions = {}> {
  opt: OSSUploadOptions;

  protected constructor(options: OSSUploadOptions) {
    this.opt = options;
  }

  /**
   * 上传单个文件
   * @param item
   * @param params
   */
  abstract upload(item: OSSUploadLocalItem, params?: Partial<UploadOptions>): Promise<any>;

  /**
   * 检查系统默认的配置
   * 敏感配置建议通过环境或者系统配置获取，不要直接暴露到项目中
   */
  abstract get globalOptions(): Partial<Options>;

  /**
   * 通用上传参数
   */
  abstract get globalUploadParams(): Partial<UploadOptions>;
}
