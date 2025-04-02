import { unInstance } from "@/service";

export namespace Shop {
    export interface Paging {
        page: number | string;
        limit: number | string;
    }
    // 店铺入驻
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
    export interface ShopInfo {
        id: number;
        shopName: string;
        shopLogo: string;
        sortId: number;
    }
    export interface MerchList {
        id: number;
        merchName: string;
        price: number;
        imageUrl: string;
        currentPrice: number;
        description: string;
        saleCount: number;
        merchId: number;
    }
    export interface Banner {
        id: number;
        imageUrl: string;
    }

    export interface SearchParams extends Paging {
        shopSortId: string;
        value: string;
    }
    export interface SearchListResult {
        shopInfo: ShopInfo;
        merchList: MerchList[];
    }
    export interface ShopDetailResult {
        shopInfo: ShopInfo;
        merchList: MerchList[];
        shopBannerList: Banner[];
    }
    export interface DetailParams extends Paging {
        id: number;
        orderBy: string;
        merchName: string;
    }
}

// 店铺入驻
export const shopEnterApi = (data: Shop.ShopEnterParamse) => {
    return unInstance.post<UnData, Shop.ShopEnterParamse, IUnResponseData<null, null>>("/v1/shop/shopEnter", data);
};

// 店铺搜索列表
export const shopSearchListApi = (data: Shop.SearchParams) => {
    return unInstance.post<UnData, Shop.SearchParams, IUnResponseData<Shop.SearchListResult[], null>>(
        "/v1/shop/shopList",
        data
    );
};

// 店铺详情
export const shopDetailApi = (data: Shop.DetailParams) => {
    return unInstance.post<UnData, Shop.DetailParams, IUnResponseData<null, Shop.ShopDetailResult>>(
        "/shop/shopDetail",
        data
    );
};
