# `proto-gen-dts`

> Convert `proto` file to `typescript` type definition file

## Install

```shell
# global
npm i proto-gen-dts -g
```

## Usage

```js
// use in nodejs
const protoGenDts = require('proto-gen-dts');

protoGenDts({
  file: 'account.proto',
  output: 'typings/account.proto'
})
```

```shell
# single file
proto-gen-dts account.proto -o typings/account.proto 
# dir
proto-gen-dts -d protos/ -o typings/
# use npx
npx proto-gen-dts -d protos/ -o typings/
```

## Example

```proto
syntax = "proto3";

package hello;

service Hello {
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

message SayNameReq {
  message User {
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
output
```typescript
/** code generate by proto-gen-dts don't edit */
declare namespace hello {
  export const enum Direct {
    Nil = 0,
    Up = 1,
    Down = 2,
  }

  export interface Core {
    firstName?: string;
  }

  export interface SayNameReq_User {
    name?: string;
    avatar?: string;
  }

  export interface SayNameReq {
    fullName?: string;
    core?: Core;
    user?: SayNameReq_User;
    direct?: Direct;
  }

  export interface SayNameRsp {
    realName?: string;
  }

  export interface HelloService {
    SayName<R extends SayNameReq, O>(r: R, o?: O): Promise<SayNameRsp>;
  }
}
```
