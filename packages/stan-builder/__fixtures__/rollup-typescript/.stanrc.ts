export default {
  bundler: 'rollup',
  esm: {
    mjs: true
  },
  cjs: true,
  umd: {
    name: 'pkg',
    minify: true
  },
  runtimeHelpers: true,
  sourcemap: false,
  minify: false,
  copy: {
    targets: [{ src: 'src/**/*.scss', dest: 'dist/scss' }],
    flatten: false
  },
};
