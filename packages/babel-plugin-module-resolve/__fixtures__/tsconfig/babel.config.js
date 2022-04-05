const babelPluginModuleResolve = require('../../lib');

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [[babelPluginModuleResolve]],
};
