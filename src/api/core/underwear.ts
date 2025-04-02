import { unInstance } from "@/service";

export namespace Underwear {
    export interface Paging {
        page: number | string;
        limit: number | string;
    }

    export interface ProductParams extends Paging {
        merchName?: string;
        sortConfig?: string;
    }
    export interface ProductRecommendParams extends Paging {
        merchName?: string;
    }
    export interface Product {
        id: number;
        merchName: string;
        price: number;
        currentPrice: number;
        imageUrl: string;
        properties: { value: string; id: number }[];
    }
    export interface CreateOrderParams {
        skuId: number;
        addressId: number;
        payType: string;
        remark: string;
        couponId?: number;
        stock: number;
    }
}

// 内衣商品列表
export const underwearProductListApi = (data: Underwear.ProductParams) => {
    return unInstance.post<UnData, Underwear.ProductParams, IUnResponseData<Underwear.Product[], null>>(
        "/merch/underwearMerchList",
        data
    );
};

// 内衣推荐列表
export const underwearRecommendListApi = (data: Underwear.ProductRecommendParams) => {
    return unInstance.post<UnData, Underwear.ProductRecommendParams, IUnResponseData<Underwear.Product[], null>>(
        "/merch/underwearRecommend",
        data
    );
};

// 创建订单
export const underwearCreateOrderApi = (data: Underwear.CreateOrderParams) => {
    return unInstance.post<UnData, Underwear.CreateOrderParams, IUnResponseData<null, null>>(
        "/v1/order/createUnderwearOrder",
        data
    );
};
