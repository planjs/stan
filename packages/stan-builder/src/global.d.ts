declare module '@rollup/plugin-url' {
  import type { Plugin } from 'rollup';
  export default function url(): Plugin;
}

declare module 'less-plugin-npm-import' {
  class Importer {
    constructor(opt?: { prefix?: string });
  }
  export default Importer;
}
