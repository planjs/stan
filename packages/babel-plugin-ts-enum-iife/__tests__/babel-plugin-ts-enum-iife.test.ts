import { transform } from '@babel/core';
const babelPluginTypescriptEnumIife = require('../src');

describe('babel-plugin-typescript-enum-iife', () => {
  it('needs tests', () => {
    const src = transform(
      `enum Test {
  A,
  B
}`,
      {
        plugins: [babelPluginTypescriptEnumIife, '@babel/plugin-transform-typescript'],
        babelrc: false,
        configFile: false,
      },
    )?.code;

    expect(src).toEqual(
      `const Test = function () {
  //__ENUM_IIFE__
  let Test;

  (function (Test) {
    Test[Test["A"] = 0] = "A";
    Test[Test["B"] = 1] = "B";
  })(Test || (Test = {}));

  return Test;
}();`,
    );
  });
});
