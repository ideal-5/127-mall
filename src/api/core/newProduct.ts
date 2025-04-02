import { unInstance } from "@/service";

export namespace NewProduct {
    export interface Paging {
        page: number | string;
        limit: number | string;
    }
    export interface Sort {
        id: number;
        name: string;
    }
    export interface ProductParams extends Paging {
        sortId?: number;
        merchName?: string;
    }
    export interface Product {
        id: number;
        merchName: string;
        price: number;
        currentPrice: number;
        imageUrl: string;
        properties: string[];
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

// 新品上市分类列表
export const newProductSortListApi = () => {
    return unInstance.get<UnData, UnData, IUnResponseData<null, NewProduct.Sort[]>>("/merch/newMerchSort");
};

// 新品上市商品列表
export const newProductProductListApi = (data: NewProduct.ProductParams) => {
    return unInstance.post<UnData, NewProduct.ProductParams, IUnResponseData<NewProduct.Product[], null>>(
        "/merch/newMerchList",
        data
    );
};

// 创建订单
export const newProductCreateOrderApi = (data: NewProduct.CreateOrderParams) => {
    return unInstance.post<UnData, NewProduct.CreateOrderParams, IUnResponseData<null, null>>(
        "/v1/order/createNewOrder",
        data
    );
};
