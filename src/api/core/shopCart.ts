import { unInstance } from "@/service";

export namespace ShopCart {
    export interface Paging {
        page: number | string;
        limit: number | string;
    }
    export interface Product {
        id: number;
        merchName: string;
        merchId: number;
        skuName: string;
        stock: number;
        skuId: number;
        skuImage: string;
        currentPrice: number;
        price: number;
        shopId: number;
    }
    export interface CartItem {
        cartList: Product[];
        shopLogo: string;
        shopName: string;
    }
}

// 购物车列表
export const shopCartListApi = (data: ShopCart.Paging) => {
    return unInstance.post<UnData, ShopCart.Paging, IUnResponseData<ShopCart.CartItem[], null>>(
        "/v1/user/userCartList",
        data
    );
};

// 加入购物车
export const shopCartAddApi = (data: { skuId: number | string }) => {
    return unInstance.post<UnData, { skuId: number | string }, IUnResponseData<null, null>>("/v1/merch/addCart", data);
};

// 购物车删除
export const shopCartDeleteApi = (data: { ids:  string }) => {
    return unInstance.post<UnData, { ids:  string }, IUnResponseData<null, null>>(
        "/v1/user/deleteCart",
        data
    );
};

// 修改购物车商品数量
export const shopCartUpdateCountApi = (data: { id: number; stock: number }) => {
    return unInstance.post<UnData, { id: number; stock: number }, IUnResponseData<null, null>>(
        "/v1/user/updateCart",
        data
    );
};
