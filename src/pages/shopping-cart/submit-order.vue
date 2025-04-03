<!-- 积分商品确认订单 -->
<script setup lang="ts">
import { useStyle } from "@/hooks/useStyle";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { shopCartSubmitOrderApi } from "@/api";
import type { ShopCart } from "@/api";
import { useSelectAddress } from "@/hooks/useSelectAddress";
import { useShopCartStore } from "@/store";

interface Shop {
    cartList: (ShopCart.Product & { activePrice: number; isSelect: boolean })[];
    shopLogo: string;
    shopName: string;
    isSelect: boolean;
}
type Item = ShopCart.Product & { activePrice: number; isSelect: boolean };

const { activeAddress, selectAddress } = useSelectAddress();
const { bottomHeight, bottomStyle } = useStyle().absoluteBottom(120);

const shopCartStore = useShopCartStore();

const shop = ref<Shop>();

onLoad(() => {
    let activeShop = shopCartStore.shopCartList.find((shop) => {
        return shop.cartList.some((item) => item.isSelect);
    });
    if (!activeShop) return uni.switchTab({ url: "/pages/shopping-cart/shopping-cart" });
    shop.value = { ...activeShop, cartList: activeShop.cartList.filter((item) => item.isSelect) };
});

const totalPrice = computed(() => {
    return shop?.value?.cartList?.reduce((p, c) => {
        if (c.isSelect) {
            return c.activePrice * c.stock + p;
        }
        return p;
    }, 0);
});

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

// 下单
const toast = useToast();

async function submitFun() {
    if (!shop.value || !activeAddress.value) return;
    await shopCartSubmitOrderApi({
        ids: shop.value?.cartList.map((item) => item.id).join(","),
        addressId: activeAddress.value?.id,
        payType: activePayType.value,
        remark: remarkInp.value,
    });
    await shopCartStore.getShopCartList();
}
</script>

<template>
    <div class="main bg-#F8F8F8 box-border px32" :style="{ paddingBottom: bottomHeight }">
        <NavBar barColor="#fff">确认订单</NavBar>
        <!-- 地址 -->
        <div class="wfull b-rd-12 bg-#fff flex box-border py20 mt15">
            <div class="flex-1 min-w-0 flex" @click="selectAddress">
                <div class="w-100 flex-shrink-0 flex-center">
                    <div class="size-40 bg-#FF9113 b-rd-full flex-center">
                        <span class="i-mdi:map-marker-radius text-#fff size-80%"></span>
                    </div>
                </div>
                <div class="flex-1 min-w-0 fw500 text-30">
                    <template v-if="activeAddress">
                        <div>{{ activeAddress?.address }}</div>
                        <div my10>{{ activeAddress?.doorplate }}</div>
                        <div class="fw400 text-#949494 text-22">
                            <span mr15>{{ activeAddress?.contactName }}</span>
                            <span>{{ activeAddress?.contactPhone }}</span>
                        </div>
                    </template>
                    <template v-else>
                        <div>请选择地址</div>
                    </template>
                </div>
            </div>
            <div class="w-100 flex-shrink-0 flex-center">
                <span i-mdi:chevron-right></span>
            </div>
        </div>
        <!-- 商品信息 -->
        <div class="wfull bg-#fff my20 box-border b-rd-12 p18">
            <div class="wfull flex-c mb30">
                <div size-54 mr20>
                    <image size-full b-rd-8 :src="shop?.shopLogo" mode="aspectFill" />
                </div>
                <div>
                    <span>{{ shop?.shopName }}</span>
                    <span i-mdi:chevron-right></span>
                </div>
            </div>
            <div class="wfull">
                <div wfull flex-c v-for="(item, index) in shop?.cartList" :key="item.id">
                    <div class="flex-1 min-w-0 flex mb20">
                        <div size-152 flex-shrink-0 mr20>
                            <image class="size-full b-rd-8 bg-emerald" :src="item.skuImage" mode="aspectFill" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <div fw500 text-28 truncate-1>{{ item.merchName }}</div>
                            <div class="text-24 text-#949494 truncate-1 my15">{{ item.skuName }}</div>
                            <div class="wfull flex justify-between">
                                <div class="text-#EC3013 fw500">
                                    <span text-20>￥</span>
                                    <span text-30>{{ item.activePrice * item.stock }}</span>
                                </div>
                                <div>X{{ item.stock }}</div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 备注 -->
        <div class="wfull bg-#fff box-border b-rd-12 box-border p20 mb20">
            <div class="fw500 text-30 h70 flex items-center">备注</div>
            <nut-textarea v-model="remarkInp" limit-show max-length="200" />
        </div>
        <!-- 价格明细 -->
        <!-- <div class="wfull bg-#fff box-border b-rd-12 box-border p20 mb20">
            <div class="fw500 text-30">价格明细</div>
            <div class="flex-c justify-between" >
                <div  ></div>
            </div>
        </div> -->
        <!-- 支付方式 -->
        <div class="wfull bg-#fff box-border b-rd-12 box-border p20">
            <div class="fw500 text-30 h70 flex items-center">支付方式</div>
            <div
                class="wfull flex items-center justify-between box-border py15 b-b-solid b-1rpx b-#F2F2F2 box-border"
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
        <!-- 底部 -->
        <div :style="bottomStyle" class="bg-#fff flex items-center justify-end box-border px32">
            <div class="flex-center">
                <div fw500 mr20>
                    <span class="text-26 mr10">合计:</span>
                    <span class="text-30 text-#FF9113">￥{{ totalPrice }}</span>
                </div>
                <div
                    class="bg-[linear-gradient(97deg,#FECE62_0%,#FF9113_100%)] text-#fff flex-center b-rd-full fw500 text-30 box-border px25 py10"
                    @click="submitFun"
                >
                    兑换
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.nut-textarea) {
    padding: 18rpx;
    background-color: #f6f6f7 !important;
    border-radius: 10rpx;
}
</style>
