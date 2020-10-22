[npm]: https://img.shields.io/npm/v/stan-builder
[npm-url]: https://www.npmjs.com/package/stan-builder
[size]: https://packagephobia.now.sh/badge?p=stan-builder
[size-url]: https://packagephobia.now.sh/result?p=stan-builder

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![NPM downloads](http://img.shields.io/npm/dm/stan-builder.svg?style=flat)][npm-url]

# `stan-builder`

> 集成 `rollup` `babel` 常用打包配置.

## Install

Using npm:

```console
npm install stan-builder --save-dev
```

## Features
* ✔︎ 支持 typeScript
* ✔︎ 支持 cjs、esm、umd、systemjs 四种格式的打包
* ✔︎ esm 支持生成 mjs，直接为浏览器使用
* ✔︎ 支持 postcss
* ✔︎ 支持打包成 node browser 用的代码

## Usage

```shell script
# Bundle library
stan-builder 

# Bundle dev
stan-builder -w
```

## Config
新建配置文件 `.stanrc.ts` `.stanrc.js` `.stanrc.tsx`
```typescript
// BundleOptions
export default {
  esm: true,
  umd: true,
  target: 'browser',
}
```

### Bundle Options
#### entry

指定入口文件。

* Type: `string | string[]`
* Default：`src/index.js`

默认会查找 `src/index.tsx`, `src/index.ts`, `src/index.jsx`, `src/index.js`，如果存在，则会作为默认的 entry。如果库文件为 `typescript`，则需要在根目录配置`tsconfig.json`，否则会编译错误。


