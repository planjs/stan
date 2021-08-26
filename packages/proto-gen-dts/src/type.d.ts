import type { IParseOptions, Enum, Type, Service, Method, ReflectionObject } from 'protobufjs';

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
  /**
   * protobuf parse options
   * priority is higher than {ProtoGenDTSOptions.protoParseOptions}
   * @link {protobuf.IParseOptions}
   */
  protoParseOptions?: IParseOptions;
}

export type VisitorFNReturnType = string | void | false;

export type TSEnumDeclarationContent = {
  name: string;
  comment: string;
  fieldList: Array<{
    key: string;
    value: number;
    comment: string;
  }>;
};

export type TSMessageDeclarationContent = {
  name: string;
  comment: string;
  fieldList: Array<{
    key: string;
    /**
     * Base type or proto message name
     */
    value: string;
    isArray?: boolean;
    isMap?: boolean;
    /**
     * @default false
     */
    isRequired?: boolean;
    comment: string;
    /**
     * if value is proto message
     */
    reflection?: ReflectionObject | null;
  }>;
};

export type TSServiceItemDeclarationContent = {
  name: string;
  /**
   * Base type or proto message name
   */
  requestType: string;
  /**
   * Base type or proto message name
   */
  responseType: string;
  comment: string;
  /**
   * rpc options
   */
  options?: Record<string, any>;
};

export type TSServiceDeclarationContent = {
  name: string;
  comment: string;
  fieldList: Array<TSServiceItemDeclarationContent>;
};

export interface Visitor {
  /**
   * enum processor
   * @param content {TSEnumDeclarationContent}
   * @param reflection {Enum}
   * @constructor
   */
  TSEnumDeclaration?: (content: TSEnumDeclarationContent, reflection: Enum) => VisitorFNReturnType;
  /**
   * message processor
   * @param content {TSMessageDeclarationContent}
   * @param reflection {Type}
   * @constructor
   */
  TSMessageDeclaration?: (
    content: TSMessageDeclarationContent,
    reflection: Type,
  ) => VisitorFNReturnType;
  /**
   * service processor
   * @param content {string}
   * @param reflection {TSServiceDeclarationContent}
   * @constructor
   */
  TSServiceDeclaration?: (
    content: TSServiceDeclarationContent,
    reflection: Service,
  ) => VisitorFNReturnType;
  /**
   * services rpc item processor
   * if TSServiceDeclaration return {string|false}, won't execute
   * @param content {TSServiceItemDeclarationContent}
   * @param reflection {Type}
   * @constructor
   */
  TSServiceItemDeclaration?: (
    content: TSServiceItemDeclarationContent,
    reflection: Method,
  ) => VisitorFNReturnType;
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
   * @link {protobuf.IParseOptions}
   * @default { alternateCommentMode: true }
   */
  protoParseOptions?: IParseOptions;
}
