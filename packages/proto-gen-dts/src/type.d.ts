import type { IParseOptions, Enum, Type, Service } from 'protobufjs';

export interface GenProtoFile {
  /**
   * proto 路径
   */
  file: string;
  /**
   * 输出地址，可以带文件名（后缀为dts）
   * @description 如果是文件夹请以 / 结尾，则默认输出到文件夹，文件名为 {proto file name}.d.ts
   * @default 跟proto同目录
   */
  output?: string;
  /**
   * 生成proto依赖的模块
   * @default true
   */
  generateDependentModules?: boolean;
}

export interface Visitor {
  /**
   * enum processor
   * @param name
   * @param reflection
   * @constructor
   */
  TSEnumDeclaration?: (name: string, reflection: Enum) => string;
  /**
   * message processor
   * @param name
   * @param reflection
   * @constructor
   */
  TSMessageDeclaration?: (name: string, reflection: Type) => string;
  /**
   * service processor
   * @param name
   * @param reflection
   * @constructor
   */
  TSServiceDeclaration?: (name: string, reflection: Service) => string;
}

export interface ProtoGenDTSOptions {
  files: GenProtoFile[];
  /**
   * generate hook
   */
  visitor?: Visitor;
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
