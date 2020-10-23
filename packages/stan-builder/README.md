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

* Type: `string`
* Default：`src/index.js`

默认会查找 `src/index.tsx`, `src/index.ts`, `src/index.jsx`, `src/index.js`，如果存在，则会作为默认的 entry。如果库文件为 `typescript`，则需要在根目录配置`tsconfig.json`，否则会编译错误。
`babel` 模式下是编译 `entry` 所在文件夹的所有文件。

#### file 

指定输出文件名。

* Type: `string`
* Default：与 `entry` 相同的文件名，`entry.[umd|cjs|esm].[min].js` 默认自动增加后缀。

> - `[esm|cjs|umd].file` 优先级比这个高，没有配置则默认这个。

#### bundler

打包工具。

* Type: `rollup | babel`
> - `umd` `systemjs` 规范只支持使用 `rollup`。

#### runtimeHelpers

是否把 helper 方法不打包引入 `@babel/runtime` 。

> - 推荐开启，减少打包体积，公用项目内的 `runtime`。
> - 开启 `runtimeHelpers`，一定要在 dependencies 里有 `@babel/runtime` 依赖
> - `runtimeHelpers` 只对 esm 有效，cjs 下无效，因为 cjs 已经不给浏览器用了。

#### minify

是否压缩代码。

* Type: `boolean`
* Default: `false`

> - 开启会自动生成`.min`后缀的文件。  
> - `css` 使用 `postcss`，`js` 使用 `terser`。
> - `[esm|cjs|umd].minify` 优先级比这个高，没有配置则默认这个。
 
#### sourcemap
 
是否同步输出sourcemap。

* Type: `boolean`
* Default: `false`

#### esm

输出`esm`规范的代码。

* Type：`"rollup" | "babel" | { type, file, mjs, bundler, minify, sourcemap, target, runtimeHelpers } | `boolean``

#### cjs

输出`cjs`规范的代码。

* Type：`"rollup" | "babel" | { type, file, lazy, bundler, minify, sourcemap, target, runtimeHelpers } | `boolean``

#### cjs.lazy

是否开启 lazy require。

* Type: `boolean`
* Default: `false`

> 可加速命令行执行速度，同时减少依赖和耦合。

#### umd 

输出`umd`规范的代码。

* Type： `"rollup" | "babel" | { type, file, name, global, bundler, minify, sourcemap, target, runtimeHelpers } | `boolean``

#### umd.name

指定 `rollup` 的 [name](https://rollupjs.org/guide/en/#output-name) 配置。

* Type: `string` 
* Default：默认 camelCase packages.json 中的 `name`

#### umd.global

指定 `rollup` 的 [global](https://rollupjs.org/guide/en/#output-globals) 配置。

* Type: `react=React,react-dom=ReactDom | { pkg: global name }`

> - `external` 中的包默认会 camelCase 作为默认值。

#### target

配置是 node 库还是 browser 库，只作用于语法层。

* Type: `"node" | "browser"`
* Default: `"browser"`

> - 如果 `entry` 后缀为 `.jsx|.tsx` 默认为 `browser`。 


#### analyze

是否可视化展示打包的模块大小，使用 [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer) 。

* Type: `boolean`
* Default: `false`

#### copy.targets

是否打包同时复制文件。

* Type: `{ src, dest, rename, transform } | array` 
* Default: `undefined`

> - 这里使用 [globby](https://github.com/sindresorhus/globby) 匹配文件。
> - 如果 watch 模式，匹配到的文件也会 watch 并且copy。

#### copy.flatten

是否复制的时候删除目录结构。

* Type: `boolean`
* Default: `true`

#### rollup plugin options

* `nodeResolveOpts`: [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/blob/master/packages/node-resolve/README.md)
* `replaceOpts`: [@rollup/plugin-replace](https://github.com/rollup/plugins/blob/master/packages/replace/README.md)
* `commonjsOpts`: [@rollup/plugin-commonjs](https://github.com/rollup/plugins/blob/master/packages/commonjs/README.md)
* `injectOpts`: [@rollup/plugin-inject](https://github.com/rollup/plugins/blob/master/packages/inject/README.md)
* `terserOpts`: [rollup-plugin-terser](https://github.com/TrySound/rollup-plugin-terser)
* `typescript2Opts`: [rollup-plugin-typescript2](https://github.com/ezolenko/rollup-plugin-typescript2)
   > 如果项目内有 `typescript` 默认 `declaration: true`
* `aliasOpts`: [@rollup/plugin-alias](https://github.com/rollup/plugins/blob/master/packages/alias/README.md)
* `visualizerOpts`: [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)
* `postcssOpts`: [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss#readme)

> 如果是 ts 可以参考 `stan-builder/typings/types.d.ts` 中的 `BundleOptions`

## Usage in node
```js
const builder = require('stan-builder');

builder({ 
  verbose: true
}).then(() => {
    console.log("Build complete.")
})
```
