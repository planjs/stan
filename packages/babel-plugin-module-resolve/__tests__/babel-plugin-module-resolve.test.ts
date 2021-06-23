import { transform } from '@babel/core';
import { stripIndent } from 'common-tags';
const babelPluginModuleResolve = require('../src');

describe('babel-plugin-module-resolve', () => {
  it('needs tests', () => {
    const src = transform(`import test from '@/assets/a.png';`, {
      plugins: [
        babelPluginModuleResolve,
        ['@babel/plugin-transform-modules-commonjs', { noInterop: true }],
      ],
    })?.code;
    expect(stripIndent(src!)).toEqual(stripIndent`
    "use strict";

    var _a = require("@/assets/a.png");`);
  });
});
