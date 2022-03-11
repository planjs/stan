# stan

[![test](https://github.com/planjs/stan/actions/workflows/test.yml/badge.svg)](https://github.com/planjs/stan/actions/workflows/test.yml)

> Collection of front-end engineering tools

## Intro

Front-end related tools to improve development efficiency.

## Tools

|                                                                                 |                                                                                                                                                   |                                                             |
|---------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| [stan-builder](./packages/stan-builder/README.md)                               | [![](https://img.shields.io/npm/dt/stan-builder.svg?style=flat-square)](https://www.npmjs.com/package/stan-builder)                               | build `'js' 'ts' 'react-component' 'vue-component'` library |
| [proto-gen-dts](./packages/proto-gen-dts/README.md)                             | [![](https://img.shields.io/npm/dt/proto-gen-dts.svg?style=flat-square)](https://www.npmjs.com/package/proto-gen-dts)                             | `protobuf` generate `typescript` dictionary type file       |
| [babel-plugin-ts-enum-iife](./packages/babel-plugin-ts-enum-iife/README.md)     | [![](https://img.shields.io/npm/dt/babel-plugin-ts-enum-iife.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-ts-enum-iife)     | enum better `tree-shaking`                                  |
| [babel-plugin-module-resolve](./packages/babel-plugin-module-resolve/README.md) | [![](https://img.shields.io/npm/dt/babel-plugin-module-resolve.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-module-resolve) | support `alias` import                                      |

## Contributing

This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) which leverages [yarn](https://yarnpkg.com/) for dependency management.

To begin, please install `yarn`:

```sh
npm install yarn -g
```

### Working with Packages

All packages are kept in the `/packages` directory.

#### Publishing:

```shell
yarn release
```

#### Running Tests:

To run tests on all packages which have changes:

```shell
yarn test
```

## Contributors
[CONTRIBUTING](./CONTRIBUTING.md)

## Special thanks
> Thanks to jetbrains for providing great IDEs and open source licensing

[<img src="docs/assets/jetbrains-variant.png" alt="ad_anim_none.gif" width="160">](https://www.jetbrains.com/)

## License

[MIT](LICENSE)
