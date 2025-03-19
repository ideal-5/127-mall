<script setup lang="ts">
import Member from "./components/Member.vue";
import { gotoPage } from "@/utils/uni";
</script>

<template>
    <div
        class="main bg-[linear-gradient(183deg,#FFDBB8_0%,#FFEDC4_13%,#FCFCFC_36%,#FCFCFC_52%,#FCFCFC_100%)] box-border px-34"
    >
        <NavBar>
            <template #left>
                <div class="w-100vh flex items-center justify-center relative">
                    <span class="text-34">个人中心</span>
                    <span class="i-mdi:account-circle-outline absolute size-40 right-36"></span>
                </div>
            </template>
        </NavBar>
        <!-- 用户 -->
        <div class="w-full flex items-center my-20" @click="gotoPage('edit-user')">
            <div class="mr-20">
                <image src="https://picsum.photos/200" mode="aspectFill" class="size-100 b-rd-full" />
            </div>
            <div>
                <div>
                    <span class="text-34 font-500">依依</span>
                </div>
                <div>
                    <span class="text-22 color-[#949494]">191 **** 0101</span>
                </div>
            </div>
        </div>
        <!-- 信息 -->
        <div class="flex mb-30">
            <div class="flex-1 flex flex-col items-center">
                <div>
                    <span class="text-30">500</span>
                </div>
                <div>
                    <span class="text-26 font-500">我的积分</span>
                </div>
            </div>
            <div class="flex-1 flex flex-col items-center">
                <div>
                    <span class="text-30">500</span>
                </div>
                <div>
                    <span class="text-26 font-500">积分兑换</span>
                    <span class="i-mdi:chevron-right"></span>
                </div>
            </div>
            <div class="flex-1 flex flex-col items-center" @click="gotoPage('coupon')">
                <div>
                    <span class="text-30">500</span>
                </div>
                <div>
                    <span class="text-26 font-500">我的卷</span>
                    <span class="i-mdi:chevron-right"></span>
                </div>
            </div>
        </div>
        <!-- 会员 -->
        <Member class="mb-30"></Member>
        <!-- 订单 -->
        <div class="w-full bg-#fff b-rd-10 shadow-[0rpx_2rpx_4rpx_0rpx_rgba(0,0,0,0.1608)] box-border p-25">
            <div class="flex items-center justify-between mb-20">
                <div class="text-30">我的订单</div>
                <div class="flex items-center">
                    <span class="text-22 text-#949494">全部</span>
                    <span class="i-mdi:chevron-right"></span>
                </div>
            </div>
            <div class="w-full flex">
                <div class="order-item">
                    <div class="order-item-img">
                        <image src="@/static/img/order-dfk.png" />
                    </div>
                    <div class="order-item-text">待付款</div>
                </div>
                <div class="order-item">
                    <div class="order-item-img">
                        <image src="@/static/img/order-dfh.png" />
                    </div>
                    <div class="order-item-text">待发货</div>
                </div>
                <div class="order-item">
                    <div class="order-item-img">
                        <image src="@/static/img/order-dsh.png" />
                    </div>
                    <div class="order-item-text">待收货</div>
                </div>
                <div class="order-item">
                    <div class="order-item-img">
                        <image src="@/static/img/order-dpj.png" />
                    </div>
                    <div class="order-item-text">待评价</div>
                </div>
                <div class="order-item">
                    <div class="order-item-img">
                        <image src="@/static/img/order-tksh.png" />
                    </div>
                    <div class="order-item-text">取消/售后</div>
                </div>
            </div>
        </div>
        <!-- 服务与工具 -->
        <div class="w-full bg-#fff b-rd-10 shadow-[0rpx_2rpx_4rpx_0rpx_rgba(0,0,0,0.1608)] box-border p-25 my-25">
            <div>
                <span class="text-30 font-500">服务与工具</span>
            </div>
            <div class="w-full grid grid-cols-4">
                <div class="tool-item" @click="gotoPage('/pages/my-tool/address-list')">
                    <image src="@/static/img/tool-address.png" />
                    <div>地址管理</div>
                </div>
                <div class="tool-item">
                    <image src="@/static/img/tool-yaoqing.png" />
                    <div>邀请分享</div>
                </div>
                <div class="tool-item" @click="gotoPage('/pages/my-tool/distribution')" >
                    <image src="@/static/img/tool-fenxiao.png" />
                    <div>我的分销</div>
                </div>
                <div class="tool-item">
                    <image src="@/static/img/tool-tongzhi.png" />
                    <div>推送通知</div>
                </div>
                <div class="tool-item">
                    <image src="@/static/img/tool-kefu.png" />
                    <div>联系客服</div>
                </div>
                <div class="tool-item" @click="gotoPage('/pages/my-tool/feedback')" >
                    <image src="@/static/img/tool-fankui.png" />
                    <div>意见反馈</div>
                </div>
                <div class="tool-item">
                    <image src="@/static/img/tool-shezhi.png" />
                    <div>系统设置</div>
                </div>
            </div>
        </div>
        <!-- 商家入驻 -->
        <image src="@/static/bj/ruzhu.png" class="w-full h-200" />
    </div>
</template>

<style scoped lang="scss">
.order-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-img {
        width: 36rpx;
        height: 36rpx;
        margin-bottom: 14rpx;
        > image {
            width: 100%;
            height: 100%;
        }
    }
    &-text {
        font-size: 22rpx;
    }
}
.tool-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30rpx;
    > image {
        width: 42rpx;
        height: 42rpx;
        margin-bottom: 18rpx;
    }
    > div {
        font-size: 26rpx;
        font-weight: 500;
    }
}
</style>
