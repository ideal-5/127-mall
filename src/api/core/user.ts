import { unInstance } from "@/service";
export namespace User {
    export interface LoginParams {
        //  * 密码
        password: string;
        //  * 电话
        phone: string;
    }
    export interface Paging {
        page: number | string;
        limit: number | string;
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
        vipStatus: "10" | "20"; // 10未开通 20已开通
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
    // 店铺入住
    export interface ShopEnterParamse {
        /**
         * 详细地址
         */
        address: string;
        /**
         * 身份证背面照片
         */
        backImage: string;
        /**
         * 联系人
         */
        contactName: string;
        /**
         * 联系人电话
         */
        contactPhone: string;
        /**
         * 身份证正面照片
         */
        faceImage: string;
        /**
         * 身份证号
         */
        identityCode: string;
        /**
         * 店铺轮播图
         */
        imageList: string[];
        /**
         * 短信验证码
         */
        msgCode: string;
        /**
         * 店铺logo
         */
        shopLogo: string;
        /**
         * 店铺名称
         */
        shopName: string;
        /**
         * 分类id
         */
        sortId: number;
    }

    // 优惠券列表
    export interface CouponListParams extends Paging {
        status: string;
    }
    // 优惠券
    export interface Coupon {
        needAmount: number; // 优惠券使用门槛
        cutAmount: number; // 优惠券优惠金额
        remark: string;
        expiredTime: string;
        status: string;
        id: number;
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

// 店铺入驻
export const userShopEnterApi = (data: User.ShopEnterParamse) => {
    return unInstance.post<UnData, User.ShopEnterParamse, IUnResponseData<null, null>>("/v1/shop/shopEnter", data);
};

// 优惠券列表
export const userCouponListApi = (data: User.CouponListParams) => {
    return unInstance.post<UnData, User.CouponListParams, IUnResponseData<User.Coupon[], null>>("/v1/user/userCoupon", data);
};
