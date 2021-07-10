import protoGenDTS from './gen-dts';

export { default as writeDTS } from './write-dts';
export { default as parseNamespace } from './parse-namespace';
export { default as writeReference } from './write-reference';
export type { GenProtoFile, ProtoGenDTSOptions } from './type.d';

export default protoGenDTS;
