import protoGenDTS from './gen-dts';

export { default as writeDTS, parseNameSpace } from './write-dts';
export { default as writeReference } from './write-reference';
export * from './type.d';

export default protoGenDTS;
