<script setup lang="ts">
import { ref } from "vue";
import type { Product, User, NewProduct } from "@/api";
import { newProductCreateOrderApi, userCouponListApi } from "@/api";
import { useSelectAddress } from "@/hooks/useSelectAddress";

interface Props {
    productInfo: (Product.Product & { activePrice: number }) | null;
    specificationList: (Product.Specification & { activePrice: number })[] | null;
}

const props = withDefaults(defineProps<Props>(), {
    productInfo: null,
    specificationList: null,
});

const showSubmitPopup = defineModel<boolean>("visible", { required: true });
const submitCount = defineModel<number>("count", { required: true });

const toast = useToast();

const activeSpecification = ref(0); // 选中的规格

const activeSpecificationInfo = computed(() => {
    if (props.specificationList) {
        return props.specificationList[activeSpecification.value];
    }
    return null;
});

const isListShow = ref(true); // 列表&大图

/**
 * 地址
 */

const { activeAddress, selectAddress } = useSelectAddress();

/**
 * 备注
 */
const remarkInp = ref("");

/**
 * 支付方式
 */
const activePayType = ref("20");
const payType = ref([
    { label: "微信支付", value: "20", icon: "i-ri:wechat-pay-fill", color: "#3BCA72" },
    { label: "支付宝支付", value: "10", icon: "i-ri:alipay-fill", color: "#1296DB" },
    { label: "银行卡支付", value: "30", icon: "i-ri:bank-card-fill", color: "#FFB346" },
]);

/**
 * 优惠券
 */
const showCouponPopup = ref(false);
const activeCoupon = ref<User.Coupon | null>(null);
const couponList = ref<User.Coupon[]>();

const couponPaging = {
    page: 1,
    limit: 10,
};
async function getCouponList(isPush: boolean = false) {
    let { data } = await userCouponListApi({
        page: isPush ? couponPaging.page + 1 : 1,
        limit: couponPaging.limit,
        status: "10",
    });
    if (isPush) {
        if (!data.length) return;
        couponPaging.page++;
        couponList.value?.push(...data);
    } else {
        couponPaging.page = 1;
        couponList.value = data;
    }
}

onMounted(getCouponList);

function tapCoupon(item: User.Coupon) {
    if (activeCoupon.value?.id === item.id) {
        activeCoupon.value = null;
    } else {
        activeCoupon.value = item;
    }
}

/**
 * 下单
 */

const afterAmount = computed(() => {
    let couponAmount: number = activeCoupon.value ? activeCoupon.value?.cutAmount : 0;
    if (activeSpecificationInfo.value) {
        return activeSpecificationInfo.value?.activePrice * submitCount.value - couponAmount;
    }
    return 0;
});

async function submitOrder() {
    try {
        if (!props.specificationList || !activeAddress.value) return;
        let params: NewProduct.CreateOrderParams = {
            skuId: props.specificationList[activeSpecification.value].id,
            addressId: activeAddress.value?.id,
            payType: activePayType.value,
            remark: remarkInp.value,
            stock: submitCount.value,
        };
        if (activeCoupon.value) {
            params.couponId = activeCoupon.value.id;
        }
        /**
         * 判断当前商品分类 不同商品调不同接口
         */
        await newProductCreateOrderApi(params);
        toast.success("下单成功");
        setTimeout(() => {
            uni.navigateBack();
        }, 600);
    } catch (error) {
        let err = error as { msg: string };
        toast.error(err?.msg || "下单失败,请稍后重试");
    }
}
</script>

<template>
    <div>
        <nut-popup
            position="bottom"
            :z-index="100"
            :custom-style="{
                height: '80vh',
                display: 'flex',
                'flex-direction': 'column',
            }"
            v-model:visible="showSubmitPopup"
            round
            lock-scroll
        >
            <div class="flex-1 min-h-0 wfull overflow-scroll">
                <!--   position: "sticky",
            top: top ? topValue[top] : "0px",
            "z-index": 10, -->
                <div class="h100 wfull flex justify-end items-center box-border px32 sticky top-0 bg-white">
                    <span i-mdi:close @click="showSubmitPopup = false"></span>
                </div>
                <!-- 地址 -->
                <div
                    class="wfull flex items-center h-fit b-b-solid b-b-4rpx b-b-#F2F2F2 box-border py20"
                    @click="selectAddress"
                >
                    <div class="flex-1 min-w-0 flex hfull flex items-center">
                        <div class="w100 hfull flex-center flex-shrink-0">
                            <span i-mdi:map-marker-radius></span>
                        </div>
                        <div class="fw500 text-30 flex-1 min-w-0">
                            <template v-if="activeAddress">
                                <div mb8>{{ activeAddress?.address }}</div>
                                <div>{{ activeAddress?.doorplate }}</div>
                                <div class="text-#949494 text-22 mt15">
                                    <span mr20>{{ activeAddress?.contactName }}</span>
                                    <span>{{ activeAddress?.contactPhone }}</span>
                                </div>
                            </template>
                            <template v-else>
                                <span>请选择地址</span>
                            </template>
                        </div>
                    </div>
                    <div class="w100 hfull flex-center flex-shrink-0">
                        <span i-mdi:chevron-right></span>
                    </div>
                </div>
                <!-- 商品 -->
                <div
                    class="wfull box-border py32 flex box-border px32 b-b-solid b-b-4rpx b-b-#F2F2F2"
                    v-if="activeSpecificationInfo"
                >
                    <div size-190 flex-shrink-0 mr32>
                        <image
                            :src="activeSpecificationInfo.skuImage"
                            mode="aspectFill"
                            class="size-190 b-rd-12 bg-fuchsia"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center">
                            <div class="text-#EC3013 fw500 mr32">
                                <span text-28>￥</span>
                                <span text-42>{{ activeSpecificationInfo.activePrice }}</span>
                            </div>
                            <!-- <div class="text-#949494 text-24 line-through">￥19.99</div> -->
                        </div>
                        <div text-26 my28>已选: {{ activeSpecificationInfo.skuName }}</div>
                        <nut-input-number v-model="submitCount"></nut-input-number>
                    </div>
                </div>
                <!-- 分类 -->
                <div class="wfull box-border py32 box-border px32 b-b-solid b-b-4rpx b-b-#F2F2F2">
                    <div class="flex items-center justify-between wfull">
                        <div text-30 fw500>规格分类({{ props.specificationList?.length }})</div>
                        <div @click="isListShow = !isListShow">
                            <span :class="isListShow ? 'i-mdi:format-list-bulleted' : 'i-mdi:view-grid-outline'"></span>
                            <span text-24>{{ isListShow ? "列表" : "大图" }}</span>
                        </div>
                    </div>
                    <div class="wfull transition-all-300" :class="!isListShow && 'grid grid-cols-3 gap-10'">
                        <div
                            class="wfull b-rd-10 flex-center justify-between box-border mt20 b-solid b-2rpx transition-all-300"
                            :class="[
                                index === activeSpecification ? `b-#FF9113 bg-#FFEDC4` : `b-transparent bg-#F5F5F5`,
                                isListShow ? 'p15' : 'flex-col',
                            ]"
                            v-if="props.specificationList"
                            v-for="(item, index) in props.specificationList"
                            :key="item.id"
                            @click="activeSpecification = index"
                        >
                            <div
                                class="flex-1 transition-all-300"
                                :class="isListShow ? 'min-w-0 flex items-center' : 'min-h-0 wfull'"
                            >
                                <div
                                    transition-all-300
                                    :class="isListShow ? 'size-56 flex-shrink-0 mr15 ' : 'wfull h206'"
                                >
                                    <image
                                        class="size-full b-rd-8 bg-fuchsia transition-all-300"
                                        :src="item.skuImage"
                                        mode="aspectFill"
                                    />
                                </div>
                                <div
                                    class="flex-1 min-w-0 truncate text-26 transition-all-300"
                                    :class="isListShow ? '' : 'my8 box-border px15'"
                                >
                                    {{ item.skuName }}
                                </div>
                            </div>
                            <div
                                class="flex-shrink-0 fw500 text-26 text-#949494 transition-all-300"
                                :class="isListShow ? 'w100 flex-center' : 'h40 wfull box-border px15 '"
                            >
                                ￥{{ item.activePrice }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 优惠券 -->
                <div
                    class="wfull flex items-center justify-between box-border p32 b-b-solid b-b-6rpx b-b-#F2F2F2"
                    @click="showCouponPopup = true"
                >
                    <div text-26 fw500>优惠券</div>
                    <div>
                        <span v-if="activeCoupon">-{{ activeCoupon?.cutAmount }}</span>
                        <span v-else>选择优惠券</span>
                        <span i-mdi:chevron-right></span>
                    </div>
                </div>
                <!-- 订单备注 -->
                <div class="wfull flex-col justify-between box-border p32 b-b-solid b-b-6rpx b-b-#F2F2F2">
                    <div text-26 fw500 mb20>订单备注</div>
                    <!-- <div i-mdi:chevron-right></div> -->
                    <nut-textarea v-model="remarkInp" limit-show max-length="200" />
                </div>
                <!-- 支付方式 -->
                <div class="wfull flex-col justify-between box-border">
                    <div
                        class="wfull flex items-center justify-between box-border py15 b-b-solid b-1rpx b-#F2F2F2 box-border p-x32"
                        v-for="(item, index) in payType"
                        :key="index"
                        @click="activePayType = item.value"
                    >
                        <div class="flex-center">
                            <div class="size-50 mr32">
                                <span size-full :class="item.icon" :style="{ color: item.color }"></span>
                            </div>
                            <div>
                                <span class="fw500 text-26">{{ item.label }}</span>
                            </div>
                        </div>
                        <div>
                            <div
                                class="size-35 b-1rpx b-solid b-rd-full flex-center transition"
                                :class="activePayType === item.value ? 'bg-#FFAA48 b-#FFAA48' : 'b-#AEAEAE'"
                            >
                                <span i-mdi:check text-white v-if="activePayType === item.value"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wfull h120 flex-center box-border px32">
                <div
                    class="bg-[linear-gradient(109deg,#FFAA48_0%,#FF9113_100%)] wfull h92 fw500 flex-center text-#fff b-rd-16"
                    @click="submitOrder"
                >
                    <span text-28>立即支付</span>
                    <span text-34 v-if="activeSpecificationInfo">￥{{ afterAmount }}</span>
                </div>
            </div>
        </nut-popup>

        <!-- 优惠券弹窗 -->
        <nut-popup
            position="bottom"
            :custom-style="{ height: '60vh', display: 'flex', 'flex-direction': 'column' }"
            v-model:visible="showCouponPopup"
            round
            lock-scroll
        >
            <!-- 优惠券弹窗 -->
            <div class="coupon-popup">
                <div class="title">优惠券</div>
                <scroll-view class="list-box" scroll-y enable-flex>
                    <div class="tem-coupon-box">
                        <div
                            class="quan-dizu"
                            :class="[activeCoupon?.id === item.id && 'quan-dizu--active']"
                            v-for="(item, index) in couponList"
                            :key="item.id"
                            @click="tapCoupon(item)"
                        >
                            <div class="active-yuan">
                                <span i-mdi:check class="text-#ff9113 size-80%"></span>
                            </div>
                            <div class="quan">
                                <div class="qian">
                                    <div class="qian-line1">
                                        <div class="amount">
                                            <span>￥</span>
                                            <span>{{ item.cutAmount }}</span>
                                        </div>
                                        <div class="tiaojian">{{ `满${item.needAmount}可用` }}</div>
                                    </div>
                                    <div class="qian-line2">
                                        <span>{{ item.remark }}</span>
                                        <!-- <text>(1元=10积分)</text> -->
                                    </div>
                                    <div class="qian-line3">
                                        <div>有效期至{{ item.expiredTime }}</div>
                                    </div>
                                </div>
                                <div class="hou">
                                    <div class="btn">立即使用</div>
                                </div>
                                <div class="xuxian"></div>
                                <div class="guoqi">{{ item.id }}</div>
                            </div>
                        </div>
                    </div>
                </scroll-view>
            </div>
        </nut-popup>
    </div>
</template>

<style scoped lang="scss">
:deep(.nut-textarea) {
    padding: 18rpx;
    background-color: #f6f6f7 !important;
    border-radius: 10rpx;
}
.coupon-popup {
    width: 100%;
    height: 50vh;
    background-color: #fff;
    border-radius: 15rpx 15rpx 0 0;
    display: flex;
    flex-direction: column;
    .title {
        width: 100%;
        height: 80rpx;
        font-size: 36rpx;
        font-weight: 600;
        @include my-flex;
    }
    .list-box {
        flex: 1;
        width: 100%;
        min-height: 0;
        overflow: scroll;

        $quan-color: #fff; // 优惠卷颜色
        $quan-yuan-size: 20rpx; // 优惠卷透明圆的半径
        $quan-yuan-x: 70%; // 优惠卷透明圆的X轴坐标
        $dizu-width: 720rpx;
        $dizuo-padding-x: 20rpx; // 底座左右的内边距<控制优惠卷宽度>
        .tem-coupon-box {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .quan-dizu {
                width: $dizu-width;
                height: 204rpx;
                flex-shrink: 0; // 确保该盒子不被挤压变形
                background-color: #fff5dd;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                border-radius: 10rpx;
                box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
                margin-top: 20rpx;
                transition: all 0.3s;
                box-sizing: border-box;
                padding: 0 $dizuo-padding-x;
                position: relative;

                .active-yuan {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: $dizuo-padding-x;
                    width: 40rpx;
                    height: 40rpx;
                    background-color: #fff;
                    border-radius: 999999rpx;
                    @include my-flex;
                    transition: all 0.2s;
                    opacity: 0;
                }
                &--active {
                    background-color: #ffaa48;
                    .quan {
                        width: 620rpx !important;
                    }
                    .active-yuan {
                        opacity: 1;
                    }
                }

                // 优惠卷
                .quan {
                    width: $dizu-width - $dizuo-padding-x * 2;
                    height: 166rpx;
                    background-color: #000;
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
                    background-size: 100% 50%;
                    position: relative;
                    overflow: hidden;
                    border-radius: 10rpx;
                    display: flex;
                    align-items: center;
                    transition: all 0.3s;

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
                        inset: -50rpx -50rpx auto auto;
                        transform-origin: top left; /* 或 top right */
                        transform: translate(29.3%) rotate(45deg);
                        padding: 6rpx 0;
                    }
                }
            }
        }
    }
}
</style>
