# `babel-plugin-module-resolve`

> A [Babel](http://babeljs.io) plugin to import similar to webpack alias.   
> Implemented based on plugin [enhanced-resolve](http://github.com/webpack/enhanced-resolve).

## Example

Simplify the `require` `import` `System.import` `System.import` path.

```js
// simple @utils -> <root dir>/utils
import t from '@utils';
// instead
import t from '../../utils/index';

const t = require('@utils');
// instead
const t = require('../../utils/index');
```

## Usage

Install the plugin

```
npm install --save-dev babel-plugin-module-resolve`
```

or

```
yarn add --dev babel-plugin-module-resolve`
```

Specify the plugin in your `.babelrc` with the custom root or alias. Here's an example:

```json
{
  "plugins": [
    [
      "module-resolve",
      {
        "roots": ["./src"],
        "alias": {
          "@/*": ["./*"],
          "assets": ["./assets"]
        }
      }
    ]
  ]
}
```

Also supports the use of `paths` configuration in `jsconfig` and `tsconfig`.

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Options
Detailed reference [enhanced-resolve](http://github.com/webpack/enhanced-resolve). 

#### roots

Parsed root directory
* Type: `array`
* Default: `cwd | compilerOptions.baseUrl`

#### alias

Alias configuration
* Type: `object`
* Default: `{ @: resolve('src') } | compilerOptions.paths`

#### extensions

Parse file types
* Type: `array`
* Default: `['.js', '.jsx', '.es', '.es6', '.mjs', '.ts', '.tsx']`
