import { unInstance } from "@/service";
export namespace User {
    export interface LoginParams {
        //  * 密码
        password: string;
        //  * 电话
        phone: string;
    }
    export interface SinginParams {
        password: string;
        phone: string;
        msgCode: string;
    }
    export interface UserInfo {
        id: number;
        userName: string;
        phone: string;
        headImage: string;
        unCode: string;
    }
    export interface UserScoreAndCouponResult {
        coin: number;
        coupon: number;
    }
    // 上传文件
    export interface UploadFileParams {
        filePath: UniApp.UploadFileOption["filePath"];
        name: string;
        formData: { type: "10" | "20" | "30"; [key: string]: any };
    }
    export interface CheckCodeParams {
        // 验证码
        msgCode: string;
        //    10注册 20修改电话
        msgType: string;
        //    电话号
        phone: string;
    }
    // 用户余额返回值
    export interface UserScore {
        id: number;
        userId: number;
        coin: number;
        balance: number;
        withdrawAmount: number;
    }
    // 邀请人数和总收入
    export interface UserInviteAndIncome {
        amount: number;
        invite: number;
    }
}

// 登陆
export const userLoginApi = (data: User.LoginParams) => {
    return unInstance.post<UnData, User.LoginParams, IUnResponseData<null, User.UserInfo>>("/user/login", data);
};

// 注册
export const userSigninApi = (data: User.SinginParams) => {
    return unInstance.post<UnData, User.SinginParams, IUnResponseData<null, User.UserInfo>>("/user/register", data);
};

// 用户上传文件
export const userUploadFileApi = (data: User.UploadFileParams) => {
    return unInstance.upload<UnData, User.UploadFileParams, IUnResponseData<null, string>>({
        url: "/user/uploadFile",
        ...data,
    });
};

// 获取用户信息
export const userGetUserApi = () => {
    return unInstance.post<UnData, null, IUnResponseData<null, User.UserInfo>>("/user/getUser");
};

// 获取用户余额
export const userGetUserScoreApi = () => {
    return unInstance.get<UnData, null, IUnResponseData<null, User.UserScore>>("/v1/user/getUserAmount");
};

// 获取用户邀请人数和总收入
export const userGetUserInviteAndIncomeApi = () => {
    return unInstance.get<UnData, null, IUnResponseData<null, User.UserInviteAndIncome>>(
        "/v1/user/countInviteAndIncome"
    );
};

// 获取用户总积分和优惠券数量
export const userGetUserScoreAndCouponApi = () => {
    return unInstance.get<UnData, null, IUnResponseData<null, User.UserScoreAndCouponResult>>(
        "/v1/user/countUserCoupon"
    );
};

// 修改用户名
export const userUpdateUserNameApi = (data: { userName: string }) => {
    return unInstance.post<UnData, { userName: string }, IUnResponseData<null, null>>("/v1/user/updateUserName", data);
};

// 修改用户头像
export const userUpdateUserHeadImageApi = (data: { imageUrl: string }) => {
    return unInstance.post<UnData, { imageUrl: string }, IUnResponseData<null, null>>("/v1/user/updateHeadImage", data);
};

// 校验验证码
export const userCheckCodeApi = (data: User.CheckCodeParams) => {
    return unInstance.post<UnData, User.CheckCodeParams, IUnResponseData<null, null>>("/sys/checkMsg", data);
};

// 修改电话
export const userUpdatePhoneApi = (data: { phone: string; msgCode: string }) => {
    return unInstance.post<UnData, { phone: string; msgCode: string }, IUnResponseData<null, null>>(
        "/v1/user/changePhone",
        data
    );
};

// 意见反馈
export const userFeedbackApi = (data: { suggest: string }) => {
    return unInstance.post<UnData, { suggest: string }, IUnResponseData<null, null>>("/v1/user/addSuggest", data);
};
