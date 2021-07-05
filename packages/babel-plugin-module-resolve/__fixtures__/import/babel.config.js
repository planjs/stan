const babelPluginModuleResolve = require('../../lib');

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [[babelPluginModuleResolve]],
};
