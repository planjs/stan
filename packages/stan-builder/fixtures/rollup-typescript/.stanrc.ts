export default {
  bundler: 'rollup',
  esm: true,
  cjs: true,
  umd: {
    name: 'pkg',
  },
  runtimeHelpers: true,
  sourcemap: false,
  minify: false,
  copy: {
    targets: [{ src: 'src/**/*.scss', dest: 'dist/scss' }],
    flatten: false
  },
};
