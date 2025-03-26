import { unInstance } from "@/service";
export namespace User {
    export interface LoginParams {
        //  * 密码
        password?: string;
        //  * 电话
        phone?: string;
    }
}

// 登陆
export const userLoginApi = (data: User.LoginParams) => {
    return unInstance.post<UnData, User.LoginParams, IUnResponseData<null, null>>("/user/login", data);
};
