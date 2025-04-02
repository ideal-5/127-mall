import { unInstance } from "@/service";

// 文件1
export namespace DirectSelling {
    export interface Paging {
        page: number | string;
        limit: number | string;
    }
    export interface Sort {
        id: number;
        name: string;
    }
    export interface ProductParams extends Paging {
        merchName?: string;
        sortId?: number;
    }
    export interface Product {
        id: number;
        sortName: number;
        totalCount: number;
        saleCount: number;
        skuName: string;
        price: number;
        totalSaleCount: number; // 总销量
        skuImage: string;
        properties: { value: string; id: number }[];
    }
    export interface CreateOrderParams {
        id: number;
        addressId: number;
        payType: string;
        remark: string;
    }
}

// 分类列表
export const directSellingTypeApi = () => {
    return unInstance.get<UnData, UnData, IUnResponseData<null, DirectSelling.Sort[]>>("/merch/justMerchSort");
};

// 商品列表
export const directSellingProductListApi = (data: DirectSelling.ProductParams) => {
    return unInstance.post<UnData, UnData, IUnResponseData<DirectSelling.Product[], null>>(
        "/merch/justMerchList",
        data
    );
};

// 创建订单
export const directSellingCreateOrderApi = (data: DirectSelling.CreateOrderParams) => {
    return unInstance.post<UnData, DirectSelling.CreateOrderParams, IUnResponseData<null, null>>(
        "/v1/order/createJustOrder",
        data
    );
};
