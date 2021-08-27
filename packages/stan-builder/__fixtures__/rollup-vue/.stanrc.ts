export default {
  bundler: 'rollup',
  esm: {
    mjs: true
  },
  umd: {
    name: 'pkg',
    minify: true
  },
  extraExternals: ['vue'],
  runtimeHelpers: true,
  sourcemap: false,
  minify: false,
};
