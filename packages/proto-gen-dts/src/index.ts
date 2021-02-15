import protoGenDTS from './gen-dts';

export { default as writeDTS, parseNameSpace, protoTypeToJSType } from './write-dts';
export { default as writeReference } from './write-reference';
export * from './type.d';

export default protoGenDTS;
