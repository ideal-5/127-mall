import { unInstance } from "@/service";

// 文件1
export namespace SecondHand {
    export interface Paging {
        page: number | string;
        limit: number | string;
    }
    export interface Sort {
        id: number;
        name: string;
    }
    export interface ProductParams extends Paging {
        sortId: number;
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

// 二手市场分类列表
export const secondHandGetSecondHandSortListApi = () => {
    return unInstance.get<UnData, UnData, IUnResponseData<null, SecondHand.Sort[]>>("/merch/secondMerchSort");
};

// 二手市场商品列表
export const secondHanProductListApi = (data: SecondHand.ProductParams) => {
    return unInstance.post<UnData, SecondHand.ProductParams, IUnResponseData<SecondHand.Product[], null>>(
        "/merch/secondMerchList",
        data
    );
};

// 创建订单
export const secondHandCreateOrderApi = (data: SecondHand.CreateOrderParams) => {
    return unInstance.post<UnData, SecondHand.CreateOrderParams, IUnResponseData<null, null>>("/v1/order/createSecondOrder", data);
};
