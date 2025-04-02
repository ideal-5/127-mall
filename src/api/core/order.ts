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
    }
}

// 订单列表
export const OrderListApi = (data: Order.ListParams) => {
    return unInstance.post<UnData, Order.ListParams, IUnResponseData<Order.OrderInfo[], null>>(
        "/v1/order/orderList",
        data
    );
};
