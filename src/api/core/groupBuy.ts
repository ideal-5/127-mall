import { unInstance } from "@/service";

// 文件1
export namespace GroupBuy {
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
    }
    export interface Product {
        id: number;
        skuName: string;
        price: number;
        currentPrice: number;
        skuImage: string;
        properties: { value: string; id: number }[];
    }
}

// // 团购分类列表
// export const GroupBuySortListApi = () => {
//     return unInstance.get<UnData, UnData, IUnResponseData<null, GroupBuy.Sort[]>>("/merch/secondMerchSort");
// };

// 团购商品列表
export const groupBuyProductListApi = (data: GroupBuy.ProductParams) => {
    return unInstance.post<UnData, GroupBuy.ProductParams, IUnResponseData<GroupBuy.Product[], null>>(
        "/merch/groupMerchList",
        data
    );
};
