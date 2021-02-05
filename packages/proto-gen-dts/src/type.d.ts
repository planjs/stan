import type { IParseOptions } from 'protobufjs';

export interface GenProtoFile {
  /**
   * proto 路径
   */
  file: string;
  /**
   * 输出地址，可以带文件名（后缀为dts）
   * @default 跟proto同目录
   */
  output?: string;
}

export interface ProtoGenDTSOptions {
  files: GenProtoFile[];
  /**
   * 输出生成 dts 的 reference 导入
   * @default index.d.ts
   */
  referenceEntryFile?: string | false;
  /**
   * protobuf parse options
   * @default { alternateCommentMode: true }
   */
  protoParseOptions?: IParseOptions;
}
