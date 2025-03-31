import { unInstance } from "@/service";

export namespace Order {
    export interface Paging {
        page: number | string;
        limit: number | string;
    }
    export interface ListParams extends Paging {
        status: "10" | "20" | "30" | "40" | "50" | "60" | "70" | "80"; // 10待付款 20待发货 30待收货 40待评价 50已完成 60已取消 70已退款 80已退货
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
        skuImage: null;
        /**
         * 商品名称
         */
        skuName: string;
        /**
         * 订单状态
         */
        status: string;
        /**
         * 数量
         */
        stock: number;
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
    return unInstance.post<UnData, Order.ListParams, IUnResponseData<Order.OrderInfo[], null>>("/v1/order/orderList", data);
};
