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
        shopId: number;
        userId: number;
        shopName: string;
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
        shopLogo: string;
    }
    export interface SearchParams extends Paging {
        shopSortId: string;
        value: string;
    }
    export interface CommentTag {
        count: number;
        id: number;
        title: string;
    }
    export interface CommentListParams extends Paging {
        tagId?: number;
        id: number;
        orderBy?: string;
    }
    export interface Banners {
        id: number;
        imageUrl: string;
    }
    export interface Review {
        review: string;
        id: number;
        viewNum: number;
        merchName: string;
        createTime: string;
    }
    export interface Comment {
        userName: string;
        banners: Banners[];
        review: Review;
        headImage: string;
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

// 首页热门推荐
export const productRecommendApi = (data: Product.Paging) => {
    return unInstance.post<UnData, Product.Paging, IUnResponseData<Product.Product[], null>>("/merch/homePage", data);
};

// 获取产品id<根据规格id>
export const productIdApi = (params: { skuId: number | string }) => {
    return unInstance.get<UnData, { skuId: number | string }, IUnResponseData<null, number>>("/merch/getShopMerchId", {
        params,
    });
};

// 获取商品评论的tab
export const productCommentTagListApi = (params: { id: number }) => {
    return unInstance.get<UnData, { id: number }, IUnResponseData<null, Product.CommentTag[]>>(
        "/merch/merchReviewStatistics",
        { params }
    );
};

// 商品评论列表
export const productCommentListApi = (data: Product.CommentListParams) => {
    return unInstance.post<UnData, Product.CommentListParams, IUnResponseData<Product.Comment[], null>>(
        "/merch/reviewList",
        data
    );
};
