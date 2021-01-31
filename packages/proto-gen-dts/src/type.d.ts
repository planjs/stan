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
}
