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
        merchId: number;
        skuName: string;
        price: number;
        currentPrice: number;
        skuImage: string;
        properties: { value: string; id: number }[];
    }
    export interface CreateOrderParams {
        id: number;
        addressId: number;
        payType: string;
        remark: string;
    }
    export interface JoinGroupParams {
        openId: number;
        addressId: number;
        payType: string;
        remark: string;
    }
    export interface GroupList {
        id:number;
        groupId:number;
        status:string;
        passTime:string;
        orders:{
            headImage:string
        }[]
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

// 获取商品已经开启的团购
export const groupBuyGetGroupMerchApi = (data: { id: number }) => {
    return unInstance.post<UnData, UnData, IUnResponseData<null, GroupBuy.GroupList[]>>("/merch/groupOrder", data);
};

// 开启团购
export const groupBuyCreateOrderApi = (data: GroupBuy.CreateOrderParams) => {
    return unInstance.post<UnData,  GroupBuy.CreateOrderParams, IUnResponseData<null, null>>("/v1/order/createGroupOrder", data);
};

// 加入团购
export const groupBuyJoinGroupApi = (data: GroupBuy.JoinGroupParams) => {
    return unInstance.post<UnData,  GroupBuy.JoinGroupParams, IUnResponseData<null, null>>("/v1/order/createGroupOrderByOpen", data);
};
