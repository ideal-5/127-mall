import { unInstance } from "@/service";
export namespace User {
    export interface LoginParams {
        //  * 密码
        password?: string;
        //  * 电话
        phone?: string;
    }
    export interface UserInfo {
        id: number;
        userName: string;
        phone: string;
        headImage: string;
    }
}

// 登陆
export const userLoginApi = (data: User.LoginParams) => {
    return unInstance.post<UnData, User.LoginParams, IUnResponseData<null, User.UserInfo>>("/user/login", data);
};

// 获取用户信息
export const userGetUserApi = () => {
    return unInstance.post<UnData, null, IUnResponseData<null, User.UserInfo>>("/user/getUser");
};
