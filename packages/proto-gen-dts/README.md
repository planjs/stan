# `proto-gen-dts`

> Convert `proto` file to `typescript` type definition file;   
> All that is needed at present has been completed,  enjoy 😊

## Install

```shell
# global
npm i proto-gen-dts -g
```

## Features
* ✔︎ Support `proto2` `proto3`
* ✔︎ Support generate `proto` dependent modules 
* ✔︎ Support generate `dts` entry file
* ✔︎ Support all `proto` `message type`
* ✔︎ Support generate `service` to `interfaces`
* ✔︎ Keep generating comments and order

## Usage

```js
// use in nodejs
const protoGenDts = require('proto-gen-dts');

const dtsFiles = protoGenDts({
  files: [
    {
      file: 'hello.proto',
      output: 'typings/hello.d.ts',
    }
  ],
  referenceEntryFile: 'typings/index.d.ts'
})
```

```shell
# use in shell
# single file
proto-gen-dts hello.proto -o typings/hello.d.ts -e typings/index.d.ts
# dir
proto-gen-dts -d protos/ -o typings/
# use npx
npx proto-gen-dts -d protos/ -o typings/
# --keepcase, Converted to camel case by default
proto-gen-dts -d protos/ -o typings/ --keepcase
```

## Example
`hello.proto`
```proto
syntax = "proto3";

package hello;

service Hello {
  /**
  hello
   */
  rpc SayName (SayNameReq) returns (SayNameRsp) {};
}

message Core {
  string firstName = 1;
}

enum Direct {
  Nil = 0;
  Up = 1;
  Down = 2;
}

// 测试评论
message SayNameReq {
  // 用户模型
  message User {
    // 用户名
    string name = 1;
    string avatar = 2;
  }
  string full_name = 1;
  Core core = 2;
  repeated User user = 3;
  Direct direct = 4;
}

message SayNameRsp {
  string realName = 1;
}
```
output `typings/hello.d.ts`
```typescript
/** code generate by proto-gen-dts don't edit */

declare namespace hello {
  export interface HelloService {
    /** hello */
    SayName<R extends SayNameReq, O>(r: R, o?: O): Promise<SayNameRsp>;
  }

  export interface Core {
    firstName?: string;
  }

  export const enum Direct {
    Nil = 0,
    Up = 1,
    Down = 2,
  }

  /** 用户模型 */
  export interface SayNameReq_User {
    /** 用户名 */
    name?: string;
    avatar?: string;
  }

  /** 测试评论 */
  export interface SayNameReq {
    fullName?: string;
    core?: Core;
    user?: SayNameReq_User[];
    direct?: Direct;
  }

  export interface SayNameRsp {
    realName?: string;
  }
}
```

`referenceEntryFile` output `typings/index.d.ts`
```typescript
/** code generate by proto-gen-dts don't edit */

/// <reference path="hello.d.ts" />
```
