import type COS from 'cos-nodejs-sdk-v5';
import type AOSS from 'ali-oss';

/**
 * 上传参数
 */
type UploadParams = Partial<COS.UploadFileParams> | Partial<AOSS.PutObjectOptions>;

/**
 * 对象存储类型
 */
export enum OSSToolClientType {
  COS,
  AOSS,
}

export interface OSSUploadLocalItem {
  /**
   * 本地文件路径
   */
  filePath: string;
  /**
   * 上传访问路径
   */
  path: string;
  /**
   * 自定义文件内容
   */
  content?: string | Buffer;
}

export interface OSSUploadTarget {
  /**
   * 文件 globby 匹配
   */
  src: string | string[];
  /**
   * 上传目录
   */
  dest: string | string[];
  /**
   * 更改输出文件名
   */
  rename?: ((name: string, ext: string) => string) | string;
  /**
   * 更改输出目录
   * @param path
   */
  transform?: (content: string | Buffer) => string | Buffer;
  /**
   * 删除上传文件的目录结构
   * @default true
   */
  flatten?: boolean;
}

export interface OSSUploadOptions {
  /**
   * 腾讯云初始化SDK参数
   * https://github.com/tencentyun/cos-nodejs-sdk-v5
   */
  COSOptions?: COS.COSOptions;
  /**
   * 阿里云OSS初始化参数
   * https://github.com/ali-sdk/ali-oss#node-usage
   */
  AOSSOptions?: AOSS.Options;
  /**
   * 上传参数
   */
  uploadParams?: UploadParams;
  /**
   * 对象存储服务商
   * @default COS
   */
  type?: keyof typeof OSSToolClientType;
  /**
   * 需要上传的文件
   */
  targets: OSSUploadTarget[] | OSSUploadTarget;
  /**
   * 日志
   */
  verbose?: boolean;
  /**
   * 并行上传数量
   * @default 3
   */
  parallelLimit?: number;
  /**
   * 上传超时时间
   */
  timeout?: number;
  /**
   * 重试次数
   */
  maxAttempts?: number;
  /**
   * 匹配执行目录
   * @default process.cwd()
   */
  cwd?: string;
}
