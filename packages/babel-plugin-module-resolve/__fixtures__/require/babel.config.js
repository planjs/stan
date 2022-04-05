const path = require('path');
const babelPluginModuleResolve = require('../../lib');

const src = path.join(__dirname, 'src');

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      babelPluginModuleResolve,
      {
        roots: [src],
        alias: {
          '@': src,
        },
      },
    ],
  ],
};
