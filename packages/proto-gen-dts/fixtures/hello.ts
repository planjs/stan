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
