<script setup lang="ts">
import { useShopCartStore } from "@/store";
import type { ShopCart } from "@/api";
import { onReachBottom, onShow } from "@dcloudio/uni-app";

interface Shop {
    cartList: (ShopCart.Product & { activePrice: number; isSelect: boolean })[];
    shopLogo: string;
    shopName: string;
    isSelect: boolean;
}
type Item = ShopCart.Product & { activePrice: number; isSelect: boolean };

const shopCartStore = useShopCartStore();

const totalPrice = computed(() => {
    return shopCartStore.shopCartList.reduce((pre, cur) => {
        return (
            cur.cartList.reduce((p, c) => {
                if (c.isSelect) {
                    return c.activePrice * c.stock + p;
                }
                return p;
            }, 0) + pre
        );
    }, 0);
});

const isManage = ref(false); // 是否是管理状态
watch(
    () => isManage.value,
    () => (isAllSelect.value = false)
);
// 是否全选
const isAllSelect = computed({
    get() {
        return shopCartStore.shopCartList.every((shop) => {
            return shop.isSelect && shop.cartList.every((item) => item.isSelect);
        });
    },
    set(value) {
        shopCartStore.shopCartList.forEach((shop) => {
            shop.isSelect = value;
            shop.cartList.forEach((item) => {
                item.isSelect = value;
            });
        });
    },
});

// 是否有选中
const isExistSelect = computed(() => {
    return shopCartStore.shopCartList.some((shop) => {
        return shop.isSelect || shop.cartList.some((item) => item.isSelect);
    });
});

// 选中店铺
function selectShop(shop: Shop) {
    console.log("shop", shop);
    shop.isSelect = !shop.isSelect;
    shop.cartList.forEach((item) => {
        item.isSelect = shop.isSelect;
    });
    // 如果不是管理模式，只能选择一家店铺
    if (!isManage.value) {
        shopCartStore.shopCartList.forEach((it) => {
            if (it.cartList[0].shopId !== shop.cartList[0].shopId) {
                it.isSelect = false;
            }
            it.cartList.forEach((i) => {
                if (shop.cartList[0].shopId !== i.shopId) {
                    i.isSelect = false;
                }
            });
        });
    }
}

// 选中商品
function selectitem(shop: Shop, item: Item) {
    item.isSelect = !item.isSelect;
    shop.isSelect = shop.cartList.every((it) => it.isSelect);

    if (!isManage.value) {
        shopCartStore.shopCartList.forEach((it) => {
            if (it.cartList[0].shopId !== shop.cartList[0].shopId) {
                it.isSelect = false;
            }
            it.cartList.forEach((i) => {
                if (shop.cartList[0].shopId !== i.shopId) {
                    i.isSelect = false;
                }
            });
        });
    }
}

function deleteClick() {
    let idarr: number[] = [];
    shopCartStore.shopCartList.forEach((it) => {
        it.cartList.forEach((i) => {
            if (i.isSelect) {
                idarr.push(i.id);
            }
        });
    });
    shopCartStore.shopCartDelete(idarr.join(","));
}

function stockChange(item: Item, stock: number) {
    shopCartStore.shopCartUpdateCount({ id: item.id, stock });
}
</script>

<template>
    <div class="main bg-#F3F3F3 box-border pb140">
        <NavBar barColor="#fff">
            <template #left>
                <div wfull hfull flex-center relative>
                    <div>购物车</div>
                    <div class="absolute right-32" @click="isManage = !isManage">
                        {{ isManage ? "管理中" : "管理" }}
                    </div>
                </div>
            </template>
        </NavBar>
        <div class="wfull box-border px32">
            <div
                class="bg-#fff b-rd-12 wfull box-border p20 mt25"
                v-for="(shop, shopInd) in shopCartStore.shopCartList"
                :key="shop.cartList[0].shopId"
            >
                <div flex-c mb30>
                    <div
                        class="size-28 flex-shrink-0 b-rd-full b-solid b-1rpx b-#BFBFBF mr20 flex-center transition"
                        :class="shop.isSelect && 'b-#FFAA48 bg-#FFAA48'"
                        @click="selectShop(shop)"
                    >
                        <span i-mdi:check class="text-#fff" v-if="shop.isSelect"></span>
                    </div>
                    <div flex-c class="flex-1 min-w-0">
                        <div size-66 mr22>
                            <image class="size-full b-rd-8" :src="shop.shopLogo" mode="aspectFill" />
                        </div>
                        <div>
                            <span>{{ shop.shopName }}</span>
                            <span i-mdi:chevron-right></span>
                        </div>
                    </div>
                </div>
                <div wfull flex-c mb20 v-for="(item, index) in shop.cartList" :key="item.id">
                    <div
                        class="size-28 flex-shrink-0 b-rd-full b-solid b-1rpx b-#BFBFBF mr20 flex-center transition"
                        :class="item.isSelect && 'b-#FFAA48 bg-#FFAA48'"
                        @click="selectitem(shop, item)"
                    >
                        <span i-mdi:check class="text-#fff" v-if="item.isSelect"></span>
                    </div>
                    <div class="flex-1 min-w-0 flex">
                        <div size-152 flex-shrink-0 mr20>
                            <image class="size-full b-rd-8 bg-emerald" :src="item.skuImage" mode="aspectFill" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <div fw500 text-28 truncate-1>{{ item.merchName }}</div>
                            <div class="text-24 text-#949494 truncate-1">{{ item.skuName }}</div>
                            <div class="text-#EC3013 fw500">
                                <span text-20>￥</span>
                                <span text-30>{{ item.activePrice * item.stock }}</span>
                            </div>
                            <div class="wfull flex justify-end">
                                <nut-input-number
                                    :modelValue="item.stock"
                                    @change="(e) => stockChange(item, e)"
                                ></nut-input-number>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="wfull h120 bg-#fff box-border fixed bottom-300 left-0 flex items-center justify-between px32 shadow-[inset_0rpx_2rpx_4rpx_0rpx_rgba(0,0,0,0.0784)]"
            style="bottom: var(--global-tabbar-height)"
        >
            <div>
                <div flex-c v-if="isManage" @click="isAllSelect = !isAllSelect">
                    <div
                        class="size-28 flex-shrink-0 b-rd-full b-solid b-1rpx b-#BFBFBF mr20 flex-center transition"
                        :class="isAllSelect && 'b-#FFAA48 bg-#FFAA48'"
                    >
                        <span i-mdi:check class="text-#fff" v-if="isAllSelect"></span>
                    </div>
                    <div>全选</div>
                </div>
            </div>

            <div flex-c>
                <div mr16>
                    <span class="text-#AEAEAE text-26">合计: </span>
                    <span class="text-#EC3013 fw500 text-30">￥{{ totalPrice }}</span>
                </div>
                <div
                    v-if="!isManage"
                    class="text-#fff bg-#b9b9b9 fw500 text-30 box-border px40 py15 b-rd-full flex-center transition"
                    :class="isExistSelect && 'bg-[linear-gradient(97deg,#FECE62_0%,#FF9113_100%)]'"
                >
                    结算
                </div>
                <div
                    v-else
                    class="bg-red text-#fff fw500 text-30 box-border px40 py15 b-rd-full flex-center"
                    @click="deleteClick"
                >
                    删除
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.aaaaa {
    position: fixed;
    transition: all;
    color: #b9b9b9;
}
</style>
