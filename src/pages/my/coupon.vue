<script setup lang="ts">
import { ref } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import { userCouponListApi } from "@/api";
import type { User } from "@/api";
import { useStyle } from "@/hooks/useStyle";

const stickyStyle = useStyle().sticky("navBar");

const activeTabs = ref(0);

const tabList = ref([
    { label: "可使用", value: "10" },
    { label: "已过期/失效", value: "20" },
]);

const paging = {
    page: 1,
    limit: 10,
};

onMounted(getCouponList);

const couponList = ref<User.Coupon[]>();
async function getCouponList(isPush: boolean = false) {
    let { data } = await userCouponListApi({
        page: isPush ? paging.page + 1 : 1,
        limit: paging.limit,
        status: tabList.value[activeTabs.value].value,
    });
    if (isPush) {
        if (!data.length) return;
        paging.page++;
        couponList.value?.push(...data);
    } else {
        paging.page = 1;
        couponList.value = data;
    }
}

onReachBottom(() => {
    getCouponList(true);
});
</script>

<template>
    <div class="main bg-#F8F8F8">
        <NavBar barColor="#fff">优惠券</NavBar>

        <Tabs
            :tabList="tabList"
            keyName="label"
            v-model:activeTab="activeTabs"
            :style="stickyStyle"
            style="background-color: #fff"
            @change="getCouponList(false)"
        ></Tabs>

        <div class="coupon-list box-border px-30">
            <div class="quan-dizu" v-for="(item, index) in couponList" :key="item.id">
                <div class="quan">
                    <div class="qian">
                        <div class="qian-line1">
                            <div class="amount">
                                <text>￥</text>
                                <text>{{ item.cutAmount }}</text>
                            </div>
                            <div class="tiaojian">{{ `满${item.needAmount}可用` }}</div>
                        </div>
                        <div class="qian-line2">
                            <text>{{ item.remark }}</text>
                        </div>
                        <div class="qian-line3">
                            <div>{{ item.expiredTime }}</div>
                        </div>
                    </div>
                    <div class="hou"></div>
                    <div class="xuxian"></div>
                    <div class="guoqi">￥{{ item.cutAmount }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.coupon-list {
    .quan-dizu {
        width: 100%;
        // height: 204rpx;
        box-sizing: border-box;
        padding: 20rpx;
        flex-shrink: 0; // 确保该盒子不被挤压变形
        background-color: #fff5dd;
        @include my-flex;
        border-radius: 10rpx;
        box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
        margin-top: 20rpx;

        $quan-color: #fff; // 优惠卷颜色
        $quan-yuan-size: 20rpx; // 优惠卷透明圆的半径
        $quan-yuan-x: 70%; // 优惠卷透明圆的X轴坐标

        // 优惠卷
        .quan {
            width: 100%;
            // height: 166rpx;
            background: radial-gradient(
                        circle at $quan-yuan-x 0%,
                        transparent 0px $quan-yuan-size,
                        $quan-color $quan-yuan-size 100%
                    )
                    0% 0%,
                radial-gradient(
                        circle at $quan-yuan-x 100%,
                        transparent 0px $quan-yuan-size,
                        $quan-color $quan-yuan-size 100%
                    )
                    0% 100%;
            background-repeat: no-repeat;
            background-size: 100% 51%;
            position: relative;
            overflow: hidden;
            border-radius: 10rpx;
            display: flex;
            align-items: center;

            .qian {
                height: 100%;
                width: $quan-yuan-x;
                color: #8a8a8a;
                box-sizing: border-box;
                padding: 15rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .qian-line1 {
                    display: flex;
                    align-items: center;
                    color: #ee0b0b;
                    .amount {
                        margin-right: 10rpx;
                        > text {
                            &:nth-child(1) {
                                font-size: 26rpx;
                            }
                            &:nth-child(2) {
                                font-size: 42rpx;
                                font-weight: 600;
                            }
                        }
                    }
                    .tiaojian {
                        font-size: 24rpx;
                        border: 1rpx solid #ee0b0b;
                        padding: 5rpx 10rpx;
                    }
                }
                .qian-line2 {
                    > text {
                        &:nth-child(1) {
                            font-size: 24rpx;
                            margin-right: 10rpx;
                        }
                        &:nth-child(2) {
                            font-size: 18rpx;
                        }
                    }
                }
                .qian-line3 {
                    font-size: 18rpx;
                }
            }
            .hou {
                height: 100%;
                width: calc(100% - #{$quan-yuan-x});
                @include my-flex;
                .btn {
                    width: 150rpx;
                    height: 55rpx;
                    background: linear-gradient(309deg, #ff9e9e 0%, #ee0b0b 100%);
                    border-radius: 999999rpx;
                    font-size: 24rpx;
                    color: #fff;
                    @include my-flex;
                    margin-top: 30rpx;
                }
            }
            // 优惠卷中的虚线
            .xuxian {
                position: absolute;
                top: $quan-yuan-size;
                left: calc(70% - 1rpx);
                width: 1rpx;
                height: calc(100% - #{$quan-yuan-size * 2});
                // 虚线边框
                border-left: 1rpx dashed #d8d8d8;
            }
            // 右上角过期彩带
            .guoqi {
                width: 200rpx;
                background: linear-gradient(309deg, #ff9e9e 0%, #ee0b0b 100%);
                color: #fff;
                font-size: 20rpx;
                @include my-flex;
                position: absolute;
                inset: -40rpx -40rpx auto auto;
                transform-origin: top left; /* 或 top right */
                transform: translate(29.3%) rotate(45deg);
                padding: 6rpx 0;
            }
        }
    }
}
</style>
