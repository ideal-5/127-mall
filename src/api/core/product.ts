import { unInstance } from "@/service";

// 文件1
export namespace Product {
    export interface Paging {
        page: number | string;
        limit: number | string;
    }
    export interface Product {
        id: number;
        merchName: string;
        price: number;
        imageUrl: string;
        currentPrice: number;
        description: string;
        saleCount: number;
    }
    export interface Banner {
        id: number;
        imageUrl: string;
    }
    export interface Specification {
        id: number;
        skuImage: string;
        skuName: string;
        price: number;
        currentPrice: number;
    }
    export interface Detail {
        merchBannerList: Banner[];
        shopMerch: Product;
        recommendMerch: Product[];
        properties: { value: string; id: number; type: string; remark: string }[];
        merchSkuList: Specification[];
    }
}

// 商品详情
export const productDetailApi = (data: { id: number | string }) => {
    return unInstance.post<UnData, { id: number | string }, IUnResponseData<null, Product.Detail>>(
        "/merch/normalMerchDetail",
        data
    );
};
