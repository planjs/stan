# `babel-plugin-typescript-enum-iife`

> Transform typescript wrapper enum in IIFE, enum better tree-shaking

## Usage

`babel-plugin-ts-enum-iife` must be quoted first

`bablerc.json`
```json
{
  "plugins": [
    "babel-plugin-ts-enum-iife",
    "@babel/plugin-transform-typescript"
  ]
}
```

enum 
```typescript
enum Test {
  A,
  B
}
```

output

```js
const Test = function () {
  //__ENUM_IIFE__
  let Test;

  (function (Test) {
    Test[Test["A"] = 0] = "A";
    Test[Test["B"] = 1] = "B";
  })(Test || (Test = {}));

  return Test;
}();
```
