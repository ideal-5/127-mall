import { unInstance } from "@/service";

export namespace Config {
    export interface AgreementParams {
        type: "10" | "20" | "30" | "40" | "50" | "60" | "70" | "80" | "90";
    }
    export interface AgreementResult {
        name: string;
        policy: string;
        type: string;
    }
    export interface ConfigPaging {
        page: number | string;
        limit: number | string;
    }
    export interface ConfigShopSortResult {
        id: number;
        name: string;
        value: string;
    }
    export interface BannerParams extends ConfigPaging {
        type: "10" | "20"; // 10: 首页 20: 内衣
    }
    export interface BannerResult {
        id: number;
        imageUrl: string;
    }
    export interface ConfigVip {
        /**
         * 金额
         */
        amount: number;
        createTime: null;
        id: number;
        /**
         * 会员天数
         */
        time: number;
        /**
         * 会员名称
         */
        vipName: string;
    }
}

// 获取协议
export const configGetAgreementApi = (params: Config.AgreementParams) => {
    return unInstance.get<UnData, Config.AgreementParams, IUnResponseData<null, Config.AgreementResult>>(
        `/sys/getPolicy`,
        { params }
    );
};

// 店铺主营分类列表
export const configGetShopSortListApi = (data: Config.ConfigPaging) => {
    return unInstance.post<UnData, Config.ConfigPaging, IUnResponseData<Config.ConfigShopSortResult[], null>>(
        `/sys/shopSortList`,
        data
    );
};

// 轮播图
export const configGetBannerListApi = (data: Config.BannerParams) => {
    return unInstance.post<UnData, Config.BannerParams, IUnResponseData<Config.BannerResult[], null>>(
        `/sys/bannerList`,
        data
    );
};

// 获取vip配置
export const configGetVipConfigApi = () => {
    return unInstance.get<UnData, null, IUnResponseData<null, Config.ConfigVip>>(`/sys/getVipConfig`);
};
