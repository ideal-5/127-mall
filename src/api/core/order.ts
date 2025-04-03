import { unInstance } from "@/service";

export namespace Order {
    export interface Paging {
        page: number | string;
        limit: number | string;
    }
    export interface ListParams extends Paging {
        status: string; // 10未支付 20已支付 30已完成 40已发货 50已完成 60已评论 90拼团中 70退款
    }
    export interface OrderDetail {
        /**
         * 优惠卷扣减金额
         */
        couponCutAmount: number;
        createTime: string;
        /**
         * 实付价格
         */
        currentAmount: number;
        id: number;
        orderId: string;
        /**
         * 原价
         */
        originalAmount: number;
        shopSortId: number;
        /**
         * 店铺分类
         */
        shopSortValue: string;
        /**
         * 商品id
         */
        skuId: number;
        /**
         * 商品图片
         */
        skuImage: string;
        /**
         * 商品规格名称
         */
        skuName: string;
        /**
         * 商品名称
         */
        merchName: string;
        /**
         * 订单状态
         */
        status: string;
        /**
         * 数量
         */
        stock: number;
        /**
         * 商品标签
         */
        properties: { id: number; value: string; remark: string }[];
        productId?: number;
    }
    export interface OrderInfo {
        createTime: string;
        /**
         * 实际价格
         */
        currentAmount: number;
        /**
         * 运费
         */
        freightAmount: number;
        id: number;
        /**
         * 订单详情
         */
        orderDetails: OrderDetail[];
        /**
         * 订单号
         */
        orderId: string;
        /**
         * 总原价
         */
        originalAmount: number;
        /**
         * 店铺图片
         */
        shopLogo: string;
        /**
         * 店铺名称
         */
        shopName: string;
        /**
         * 状态
         */
        status: string;
        /**
         * 数量
         */
        stock: number;
        orderType: string;
        statusText?: string;
    }
    export interface CommentParams {
        id: number;
        review: string;
        imageList: string[];
        tagList: number;
    }
    export interface CommentTag {
        reviewTag: string;
        id: number;
    }
    export interface DetailProductDetail {
        /**
         * 优惠扣减
         */
        couponCutAmount?: number;
        createTime?: string;
        /**
         * 现价
         */
        currentAmount?: number;
        id?: number;
        orderId?: string;
        /**
         * 原价
         */
        originalAmount?: number;
        shopSortId?: number;
        shopSortValue?: string;
        skuId?: number;
        /**
         * 商品图片
         */
        skuImage: null;
        /**
         * 商品名称
         */
        skuName?: string;
        status?: string;
        /**
         * 数量
         */
        stock?: number;
        userId?: number;
    }
    export interface DetailOrderInfo {
        /**
         * 详细地址
         */
        address: string;
        /**
         * 购买方式
         */
        buyType: string;
        /**
         * 联系人
         */
        contactName: string;
        /**
         * 联系电话
         */
        contactPhone: string;
        /**
         * 优惠扣减金额
         */
        couponAmount: number;
        couponId: number;
        /**
         * 创建时间
         */
        createTime: string;
        /**
         * 现价
         */
        currentAmount: number;
        /**
         * 运费
         */
        freightAmount: number;
        id: number;
        logisticsCode: null;
        logisticsOrder: null;
        /**
         * 订单号
         */
        orderId: string;
        /**
         * 原价
         */
        originalAmount: number;
        outOrderId: string;
        paymentId: null;
        /**
         * 支付时间
         */
        payTime: null;
        /**
         * 订单备注
         */
        remark: string;
        shopId: number;
        shopSortId: number;
        /**
         * 店铺分类
         */
        shopSortValue: string;
        /**
         * 订单状态
         */
        status: string;
        /**
         * 数量
         */
        stock: number;
        userId: number;
    }
    export interface Detail {
        orderInfo: DetailOrderInfo;
        detail: DetailProductDetail[];
    }
}

// 订单列表
export const OrderListApi = (data: Order.ListParams) => {
    return unInstance.post<UnData, Order.ListParams, IUnResponseData<Order.OrderInfo[], null>>(
        "/v1/order/orderList",
        data
    );
};

// 订单详情
export const OrderDetailApi = (data: { id: number }) => {
    return unInstance.post<UnData, { id: number }, IUnResponseData<null, Order.Detail>>("/v1/order/detail", data);
};

// 确认收货
export const OrderConfirmApi = (data: { id: number }) => {
    return unInstance.post<UnData, { id: number }, IUnResponseData<null, null>>("/v1/order/receiveMerch", data);
};

// 发布评论
export const orderCommentApi = (data: Order.CommentParams) => {
    return unInstance.post<UnData, Order.CommentParams, IUnResponseData<null, null>>("/merch/merchReview", data);
};

// 获取产品评论标签
export const orderCommentTagListApi = (params: { id: number }) => {
    return unInstance.get<UnData, { id: number }, IUnResponseData<null, Order.CommentTag[]>>(
        "/merch/getShopReviewTag",
        { params }
    );
};
