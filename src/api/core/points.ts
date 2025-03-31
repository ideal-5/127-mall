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
        coin:number;
        id:number;
        merchName:string;
        imageUrl:string;
        description:string;
    }
}

// 积分商品列表
export const pointsProductListApi = (data: Points.Paging) => {
    return unInstance.post<UnData, Points.Paging, IUnResponseData<Points.Product[], null>>(
        "/merch/coinMerchList",
        data
    );
};