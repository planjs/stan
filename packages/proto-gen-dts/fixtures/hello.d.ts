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
  }

  export interface Core {
    firstName?: string;
  }

  export const enum Direct {
    Nil = 0,
    Up = 1,
    Down = 2,
  }

  // 用户模型
  export interface SayNameReq_User {
    // 用户名
    name?: string;
    avatar?: string;
  }

  // 测试评论
  export interface SayNameReq {
    fullName?: string;
    core?: Core;
    user?: SayNameReq_User[];
    direct?: Direct;
  }

  export interface SayNameRsp {
    realName?: string;
  }

  export interface GetUserListReq {
    option?: core.XXX;
  }

  export interface GetUserListRsp {}
}
