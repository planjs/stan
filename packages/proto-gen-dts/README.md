[npm]: https://img.shields.io/npm/v/proto-gen-dts
[npm-url]: https://www.npmjs.com/package/proto-gen-dts
[download]: http://img.shields.io/npm/dm/proto-gen-dts.svg?style=flat
[test]: https://github.com/planjs/stan/actions/workflows/test.yml/badge.svg
[size]: https://packagephobia.now.sh/badge?p=proto-gen-dts
[size-url]: https://packagephobia.now.sh/result?p=proto-gen-dts

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![test][test]][test]
[![NPM downloads][download]][npm-url]

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

## Special comment support
- `@v: required` interface field well required

## Usage

```js
// use in nodejs
const protoGenDts = require('proto-gen-dts');

const dtsFiles = protoGenDts.default({
  files: [
    {
      file: 'hello.proto',
      output: 'typings/hello.d.ts',
      generateDependentModules: true
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
Source `hello.proto`
```proto
syntax = "proto3";

import "core.proto";
import "google/protobuf/any.proto";
import "google/protobuf/descriptor.proto";

package hello;

service Hello {
  /**
   * hello
   */
  rpc SayName (SayNameReq) returns (SayNameRsp) {};
  // remark
  // get user list
  rpc GetUserList (GetUserListReq) returns (GetUserListRsp) {};

  rpc GetSayNameUser (SayNameReq.User) returns (SayNameReq.User) {}
}

message Core {
  string first_name = 1;
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

    enum Role {
      RoleNil = 0;
      // admin
      RoleAdmin = 1;
    }
  }
  string full_name = 1;
  Core core = 2;
  repeated User user = 3;
  Direct direct = 4;
}

message SayNameRsp {
  message Stock {
    // Stock-specific data
  }

  message Currency {
    // Currency-specific data
  }
  string realName = 1;
  map<uint32, SayNameReq.User> user_map = 2;
  map<uint32, SayNameReq.User.Role> role_map = 3;
  map<uint32, uint64> link_map = 4;
  repeated google.protobuf.Any details = 5;
  oneof instrument {
    Stock stock = 6;
    Currency currency = 7;
  }
  google.protobuf.FieldDescriptorProto field_descriptor = 8;
}

message GetUserListReq {
  core.XXX xxx = 1;
  core.ListOptions.Option option = 2;
}
message GetUserListRsp {}
```
Output `typings/hello.d.ts`
```typescript
/** code generate by proto-gen-dts don't edit */

declare namespace hello {
  export interface HelloService {
    // hello
    SayName<R extends SayNameReq, O>(r: R, o?: O): Promise<SayNameRsp>;
    // remark
    // get user list
    GetUserList<R extends GetUserListReq, O>(
      r: R,
      o?: O
    ): Promise<GetUserListRsp>;

    GetSayNameUser<R extends SayNameReq_User, O>(
      r: R,
      o?: O
    ): Promise<SayNameReq_User>;
  }

  export interface Core {
    firstName?: string;
  }

  export const enum Direct {
    Nil = 0,
    Up = 1,
    Down = 2,
  }

  // 测试评论
  export interface SayNameReq {
    fullName?: string;
    core?: Core;
    user?: SayNameReq_User[];
    direct?: Direct;
  }

  // 用户模型
  export interface SayNameReq_User {
    // 用户名
    name?: string;
    avatar?: string;
  }

  export const enum SayNameReq_User_Role {
    RoleNil = 0,
    // admin
    RoleAdmin = 1,
  }

  export interface SayNameRsp {
    realName?: string;
    userMap?: Record<number, SayNameReq_User>;
    roleMap?: Record<number, SayNameReq_User_Role>;
    linkMap?: Record<number, string>;
    details?: google.protobuf.Any[];
    stock?: SayNameRsp_Stock;
    currency?: SayNameRsp_Currency;
    fieldDescriptor?: google.protobuf.FieldDescriptorProto;
  }

  export interface SayNameRsp_Stock {}

  export interface SayNameRsp_Currency {}

  export interface GetUserListReq {
    xxx?: core.XXX;
    option?: core.ListOptions_Option;
  }

  export interface GetUserListRsp {}
}

```

`referenceEntryFile` output `typings/index.d.ts`
```typescript
/** code generate by proto-gen-dts don't edit */

/// <reference path="hello.d.ts" />
/// <reference path="core.d.ts" />
/// <reference path="google/protobuf/any.d.ts" />
/// <reference path="google/protobuf/descriptor.d.ts" />
```

`generateDependentModules` will generate dependent modules
- `typings/core.d.ts`
- `typings/google/protobuf/any.d.ts`
- `typings/google/protobuf/descriptor.d.ts`
