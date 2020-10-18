import { joi } from 'stan-utils';

const schema = joi
  .object({
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
    babelPlugins: joi.array().items(joi.string(), joi.array().items(joi.string(), joi.object())),
    babelPresets: joi.array().items(joi.string(), joi.array().items(joi.string(), joi.object())),
    extraBabelPlugins: joi
      .array()
      .items(joi.string(), joi.array().items(joi.string(), joi.object())),
    extraBabelPresets: joi
      .array()
      .items(joi.string(), joi.array().items(joi.string(), joi.object())),
    extraExternal: joi.array().items(joi.string(), joi.object().regex()),
    externalPeerDependenciesOnly: joi.bool(),
    extraPostCSSPlugins: joi.array().items(joi.any()),
    extraRollupPlugins: joi.array().items(joi.any()),
    nodeResolveOpts: joi.object(),
    replaceOpts: joi.object(),
    commonjsOpts: joi.object(),
    injectOpts: joi.object(),
    terserOpts: joi.object(),
    typescript2Opts: joi.object(),
    aliasOpts: joi.object(),
    visualizerOpts: joi.object(),
    postcssOpts: joi.object(),
    copy: joi.object(),
  })
  .unknown();

export default schema;
