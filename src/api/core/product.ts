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
        merchId: number;
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
        sort: string;
    }
    export interface SearchParams extends Paging {
        shopSortId: string;
        value: string;
    }
}

// 商品详情
export const productDetailApi = (data: { id: number | string }) => {
    return unInstance.post<UnData, { id: number | string }, IUnResponseData<null, Product.Detail>>(
        "/merch/normalMerchDetail",
        data
    );
};

// 首页商品搜索
export const productSearchApi = (data: Product.SearchParams) => {
    return unInstance.post<UnData, Product.SearchParams, IUnResponseData<Product.Product[], null>>(
        "/merch/normalMerchList",
        data
    );
};
