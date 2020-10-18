import { joi } from 'stan-utils';

const schema = joi.object({
  bundler: joi.string().allow('rollup', 'babel').default('rollup'),
  target: joi.string().allow('node', 'browser'),
  file: joi.string(),
  entry: joi.string(),
  esm: [joi.bool(), joi.object()],
  cjs: [joi.bool(), joi.object()],
  umd: [joi.bool(), joi.object()],
  disableTypeCheck: joi.bool(),
  analyze: joi.bool(),
  minify: joi.bool(),
  sourcemap: joi.bool(),
  runtimeHelpers: joi.bool(),
  copy: joi.object(),
  babelPlugins: joi.array().items(joi.string(), joi.array().items(joi.string(), joi.object())),
  babelPresets: joi.array().items(joi.string(), joi.array().items(joi.string(), joi.object())),
});

export default schema;
