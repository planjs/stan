export default {
  bundler: 'rollup',
  cjs: true,
  runtimeHelpers: true,
  sourcemap: false,
  minify: false,
  copy: {
    targets: {
      src: 'src/**/*.{scss,less}',
      dest: 'dist'
    },
    verbose: true,
    flatten: false
  }
}
