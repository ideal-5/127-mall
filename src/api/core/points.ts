/**
 * 积分
 */
import { unInstance } from "@/service";

export namespace Points {
    export interface Paging {
        page: number | string;
        limit: number | string;
    }
    export interface Product {
        coin: number;
        id: number;
        merchName: string;
        imageUrl: string;
        description: string;
    }

    export interface Banner {
        id: number;
        imageUrl: string;
        merchCoinId: number;
    }
    export interface DetailResult {
        banner: Banner[];
        merchCoin: Product;
    }
}

// 积分商品列表
export const pointsProductListApi = (data: Points.Paging) => {
    return unInstance.post<UnData, Points.Paging, IUnResponseData<Points.Product[], null>>(
        "/merch/coinMerchList",
        data
    );
};

// 积分商品详情
export const pointsProductDetailApi = (data: { id: number }) => {
    return unInstance.post<UnData, { id: number }, IUnResponseData<null, Points.DetailResult>>(
        `/merch/coinMerchDetail`,
        data
    );
};
