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

  export enum Direct {
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

  export enum SayNameReq_User_Role {
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
