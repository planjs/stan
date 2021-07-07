import type { IParseOptions, Enum, Type, Service } from 'protobufjs';

export interface GenProtoFile {
  /**
   * proto path
   */
  file: string;
  /**
   * dts output directory
   * If it is / at the end, the directory will generate dts with the same name as proto
   * @default Same directory as proto
   */
  output?: string;
  /**
   * generate proto dependent modules
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
   * generate dts reference unified export
   * If does not generate set false
   * @default index.d.ts
   */
  referenceEntryFile?: string | false;
  /**
   * protobuf parse options
   * @default { alternateCommentMode: true }
   */
  protoParseOptions?: IParseOptions;
}
