<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useStyle } from "@/hooks/useStyle";
import WaterfallsFlow from "@/components/WaterfallsFlow.vue";
import { gotoPage } from "@/utils/uni";
import {
    productDetailApi,
    groupBuyGetGroupMerchApi,
    newProductCreateOrderApi,
    secondHandCreateOrderApi,
    groupBuyCreateOrderApi,
    groupBuyJoinGroupApi,
    underwearCreateOrderApi,
} from "@/api";

import type { Product, GroupBuy } from "@/api";
import SubmitOrderPopup from "./components/SubmitOrderPopup.vue";
import { useUserStore } from "@/store";

const userStore = useUserStore();

let productType = ""; // 商品类型标志  JUST_SEND 厂家直销  GROUP_BUY 团购 SECOND_BUY 二手 UNDERWEAR_BUY 内衣 NEW_BUY 新品上市 COIN_BUY 积分
const shopLogo = ref("");
const listId = ref<number>();
const bannerList = ref<Product.Banner[]>([]); // 轮播图
const productInfo = ref<{ activePrice: number } & Product.Product>(); // 商品信息
const productTag = ref<{
    logistics: { type: "10"; data: Product.Detail["properties"] };
    sendGoods: { type: "70"; data: Product.Detail["properties"] };
    all: Product.Detail["properties"];
}>({
    all: [], // 全部标签
    logistics: { type: "10", data: [] }, // 物流标签
    sendGoods: { type: "70", data: [] }, // 发货标签
});

const recommendProduct = ref<Product.Detail["recommendMerch"]>([]);

const specificationList = ref<(Product.Specification & { activePrice: number })[]>(); // 规格列表

const WaterfallsFlowRef = ref<InstanceType<typeof WaterfallsFlow>>();

onLoad(async (query) => {
    if (!query) return;
    let { body } = await productDetailApi({ id: query.id as number });
    productType = body.sort;
    shopLogo.value = body.shopLogo;
    bannerList.value = body.merchBannerList;
    productInfo.value = {
        ...body.shopMerch,
        activePrice: userStore.user?.vipStatus === "20" ? body.shopMerch.currentPrice : body.shopMerch.price,
    };
    productTag.value.all = body.properties;
    productTag.value.logistics.data = body.properties.filter((item) => item.type === productTag.value.logistics.type);
    productTag.value.sendGoods.data = body.properties.filter((item) => item.type === productTag.value.sendGoods.type);
    specificationList.value = body.merchSkuList.map((item) => ({
        ...item,
        activePrice: userStore.user?.vipStatus === "20" ? item.currentPrice : item.price,
    }));
    recommendProduct.value = body.recommendMerch;
    WaterfallsFlowRef.value &&
        WaterfallsFlowRef.value.pushData(recommendProduct.value.map((item) => ({ ...item, img: item.imageUrl })));

    // 有listId 说明是团购
    if (query?.listId) {
        listId.value = query.listId;
        GetGroupMerch(query?.listId);
    }
});

const groupList = ref<GroupBuy.GroupList[]>([]);
async function GetGroupMerch(id: number) {
    // 如果是团购  就要获取团购队列
    if (productType === "GROUP_BUY" && productInfo.value) {
        let { body } = await groupBuyGetGroupMerchApi({ id });
        groupList.value = body;
    }
}
const submitGroupOrderType = ref(""); // 团购下单类型  1 创建  2参与
const activeGroupItem = ref<GroupBuy.GroupList>(); // 当前选中的团购队列列表
// 创建拼团
function createdGroup() {
    submitGroupOrderType.value = "1";
    showSubmitPopup.value = true;
}
// 点击参与拼团
function addGroupClick(item: GroupBuy.GroupList) {
    submitGroupOrderType.value = "2";
    showSubmitPopup.value = true;
    activeGroupItem.value = item;
}

const showExplainPopup = ref(false); // 说明弹窗
const showExplainPopupData = ref<{ title: string; content: Product.Detail["properties"] }>({
    title: "",
    content: [],
});
const showExplainPopupFunc = (title: string, content: Product.Detail["properties"]) => {
    showExplainPopupData.value = { title, content };
    showExplainPopup.value = true;
};

const { bottomHeightNum, bottomStyle } = useStyle().absoluteBottom(120);

// 点击轮播图
const swiperClick = (index: number) => {
    uni.navigateTo({
        url: "swiper",
        events: {},
        success: function (res) {
            res.eventChannel.emit("sendBanner", { list: bannerList.value, index, productInfo: productInfo.value });
        },
    });
};

/**
 * 下单
 */
const showSubmitPopup = ref(false);
const submitCount = ref(1);

const toast = useToast();
async function submitOrder(paramsfun: {
    skuId: number;
    addressId: number;
    payType: string;
    remark: string;
    stock: number;
    couponId?: number;
}) {
    try {
        /**
         * 判断当前商品分类 不同商品调不同接口
         */
        let { couponId, ...residue } = paramsfun;
        let params: {
            skuId: number;
            addressId: number;
            payType: string;
            remark: string;
            stock: number;
            couponId?: number;
        } = {
            ...residue,
        };
        if (couponId) {
            params.couponId = couponId;
        }

        if (productType === "NEW_BUY") {
            await newProductCreateOrderApi(params);
        } else if (productType === "SECOND_BUY") {
            await secondHandCreateOrderApi(params);
        } else if (productType === "GROUP_BUY" && listId.value) {
            if (submitGroupOrderType.value === "1") {
                // 创建团购
                await groupBuyCreateOrderApi({
                    id: listId.value,
                    addressId: params.addressId,
                    payType: params.payType,
                    remark: params.remark,
                });
            } else if (submitGroupOrderType.value === "2" && activeGroupItem.value) {
                // 参与团购
                await groupBuyJoinGroupApi({
                    openId: activeGroupItem.value?.id,
                    addressId: params.addressId,
                    payType: params.payType,
                    remark: params.remark,
                });
            }
        } else if (productType === "UNDERWEAR_BUY") {
            await underwearCreateOrderApi(params);
        }
        showSubmitPopup.value = false;
        toast.text("下单成功");
        // setTimeout(() => {
        //     uni.navigateBack();
        // }, 600);
    } catch (error) {
        let err = error as { msg: string };
        toast.error(err?.msg || "下单失败,请稍后重试");
    }
}
</script>

<template>
    <div class="main box-border bg-#F8F8F8" :style="{ paddingBottom: bottomHeightNum + 30 + 'rpx' }">
        <NavBar isEmptyFill></NavBar>
        <!-- 轮播图 -->
        <div class="wfull h730">
            <nut-swiper
                :init-page="0"
                :pagination-visible="true"
                pagination-color="#426543"
                pagination-unselected-color="#808080"
                auto-play="8000"
                class="w-full hfull"
            >
                <nut-swiper-item v-for="(item, index) in bannerList" :key="item.id">
                    <image :src="item.imageUrl" mode="aspectFill" class="wfull hfull" @click="swiperClick(index)" />
                </nut-swiper-item>
            </nut-swiper>
        </div>
        <!-- 商品信息 -->
        <div class="wfull b-rd-t-30 bg-#F8F8F8 -mt-62 box-border px34 relative">
            <div class="wfull h80 flex justify-between items-center">
                <div class="flex items-center">
                    <div class="font-500 text-#EC3013 mr32">
                        <span class="text-28">￥</span>
                        <span class="text-42">{{ productInfo?.currentPrice }}</span>
                    </div>
                    <span class="text-#949494 text-24 line-through">￥{{ productInfo?.price }}</span>
                </div>
                <div class="text-#EC3013 text-24">已售{{ productInfo?.saleCount }}件</div>
            </div>
            <div class="text-30 font-500 wfull mt20 mb40">
                {{ productInfo?.merchName }}
            </div>
            <div class="wfull flex items-center flex-wrap">
                <div
                    class="text-20 text-#A2833B b-solid b-1 b-#A2833B b-rd-6 bg-#FFFAEF box-border px13 py6 mr15 mb15"
                    v-for="(item, index) in productTag.all"
                    :key="item.id"
                >
                    {{ item.value }}
                </div>
            </div>
            <div class="wfull bg-#fff b-rd-14 mt20">
                <div
                    class="wfull flex-center box-border py25"
                    @click="showExplainPopupFunc('服务说明', productTag.logistics.data)"
                    v-if="productTag.logistics.data[0]"
                >
                    <div class="w80 flex-center flex-shrink-0">
                        <span class="i-mdi:shield-check-outline"></span>
                    </div>
                    <div class="flex-1 min-w-0 flex-center">
                        <div class="wfull flex items-center justify-between">
                            <div class="text-22">
                                {{ productTag.logistics.data.map((item) => item.value).join("·") }}
                            </div>
                            <div class="i-mdi:chevron-right"></div>
                        </div>
                        <!-- <div class="text-16 text-#AEAEAE">福建省福州市 发货 | 免运费</div> -->
                    </div>
                </div>
                <div
                    class="wfull flex box-border py25"
                    @click="showExplainPopupFunc('发货说明', productTag.sendGoods.data)"
                    v-if="productTag.sendGoods.data[0]"
                >
                    <div class="w80 flex justify-center flex-shrink-0">
                        <span class="i-mdi:truck-outline"></span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="wfull flex items-center justify-between">
                            <div class="text-22 mb10">{{ productTag.sendGoods.data[0].value }}，晚发即赔</div>
                            <div class="i-mdi:chevron-right"></div>
                        </div>
                        <!-- <div class="text-16 text-#AEAEAE">福建省福州市 发货 | 免运费</div> -->
                    </div>
                </div>
            </div>
            <!-- 团购列表 -->
            <div v-if="productType === 'GROUP_BUY'" class="wfull bg-#fff b-rd-14 mt20 box-border p25">
                <div class="wfull mb25 fw500 flex items-center">团购列表</div>
                <div class="wfull">
                    <div
                        v-for="(item, index) in groupList"
                        :key="index"
                        class="wfull flex items-center justify-between mb20"
                    >
                        <div class="w200 hfull flex overflow-hidden">
                            <div v-for="(it, ind) in item.orders" :key="ind" class="size-50 -ml-25 first:ml-0">
                                <image :src="it.headImage" mode="aspectFill" class="b-rd-full size-full" />
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="flex-col items-end mr20">
                                <div class="text-#FFAA48 text-18">拼单距离结束</div>
                                <nut-countdown
                                    :end-time="Date.parse(item.passTime)"
                                    style="--nut-countdown-font-size: 20rpx"
                                ></nut-countdown>
                            </div>
                            <div
                                class="bg-#FFAA48 text-#fff fw500 text-24 b-rd-10 box-border px15 py-8"
                                @click="addGroupClick(item)"
                            >
                                参与拼单
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 商品详情 -->
            <div class="wfull">
                <div class="wfull h80 flex-center">
                    <span class="title-class fw500 text-28">商品详情</span>
                </div>
                <image :src="productInfo?.description" mode="widthFix" class="wfull" />
            </div>
            <!-- 评论 -->
            <div bg-white wfull mt20 mb20 @click.stop="gotoPage('comment')">
                <div flex items-center justify-between h80 box-border px-10>
                    <div text-28 fw500>商品评价(2.2万)</div>
                    <div i-mdi:chevron-right></div>
                </div>
                <div wfull flex items-center mb-20 box-border px-10>
                    <div
                        class="bg-#FEF3DA b-rd-6 text-20 box-border px10 py5 mr15"
                        v-for="(item, index) in 3"
                        :key="index"
                    >
                        <span>回头客 </span>
                        <span class="text-#949494">1.2万</span>
                    </div>
                </div>

                <div wfull>
                    <div
                        class="b-b-#E8E8E8 box-border py-15 wfull b-b-solid b-b-1rpx last:b-b-0 box-border px-10"
                        v-for="(item, index) in 3"
                        :key="index"
                    >
                        <div flex items-center>
                            <image
                                src="https://picsum.photos/seed/picsum/200/300"
                                mode="aspectFill"
                                class="size-42 b-rd-full mr10"
                            />
                            <div class="text-#949494" text-20>我是用户名</div>
                        </div>
                        <div wfull flex justify-between>
                            <div class="text-#949494 text-24 flex-1 min-w-0 truncate-2 h-fit mt18">
                                特别好用亲肤 快递也很快， 物有所值比我之前 买的都是好用会一直回购的，会 特别好用亲肤
                                快递也很快， 物有所值比我之前 买的都是好用会一直回购的，会 特别好用亲肤 快递也很快，
                                物有所值比我之前 买的都是好用会一直回购的，会 特别好用亲肤 快递也很快， 物有所值比我之前
                                买的都是好用会一直回购的，会 特别好用亲肤 快递也很快， 物有所值比我之前
                                买的都是好用会一直回购的，会
                            </div>
                            <div w200 flex justify-end flex-shrink-0>
                                <image
                                    src="https://picsum.photos/seed/picsum/200/300"
                                    mode="aspectFill"
                                    size-90
                                    b-rd-16
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 推荐 -->
            <div wfull>
                <div fw500 text-28 mb20>相关推荐</div>
                <WaterfallsFlow ref="WaterfallsFlowRef">
                    <template #text="{ item }">
                        <div class="bg-#fff b-rd-b-16 box-border p-16">
                            <div class="text-24">{{ item.merchName }}</div>
                            <div>
                                <span class="font-500 text-18">￥</span>
                                <span class="text-24 font-700">{{ item.currentPrice }}</span>
                            </div>
                            <div class="flex items-center">
                                <div class="flex items-center border-1 border-#000 border-solid">
                                    <image src="@/static/img/vip1.png" mode="scaleToFill" class="size-25" />
                                    <span class="text-12 mx-10">省{{ item.price - item.currentPrice }}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </WaterfallsFlow>
            </div>
        </div>
        <!-- 底部 -->
        <div class="flex items-center box-border px32" :style="bottomStyle">
            <div flex-1 min-w-0 h100 flex items-center justify-around>
                <div flex-col items-center   @click.stop="gotoPage('/pages/home/shop-home?id=' + productInfo?.shopId)" >
                    <image :src="shopLogo" mode="aspectFill" size-48 b-rd-full />
                    <span text-22>进店</span>
                </div>
                <div flex-col items-center>
                    <span i-ri:customer-service-line size-48 />
                    <span text-22>客服</span>
                </div>
                <div flex-col items-center>
                    <span i-mdi:cart-minus size-48 />
                    <span text-22>购物车</span>
                </div>
            </div>
            <div class="flex h76 flex-shrink-0">
                <template v-if="productType === 'GROUP_BUY'">
                    <div
                        class="hfull flex-col items-center justify-center text-#fff bg-#FFAA48 b-rd-full box-border px50"
                        @click="createdGroup"
                    >
                        开启团购
                    </div>
                </template>
                <template v-else>
                    <div class="hfull text-24 text-#FF8B06 bg-#FFEDC4 b-rd-l-full flex-center box-content px22">
                        加入购物车
                    </div>
                    <div
                        class="hfull flex-col items-center justify-center text-#fff bg-#FFAA48 b-rd-r-full box-border px50"
                        @click="showSubmitPopup = true"
                    >
                        <span class="fw500 text-30">￥{{ productInfo?.activePrice }}</span>
                        <span class="text-20">立即购买</span>
                    </div>
                </template>
            </div>
        </div>
    </div>
    <nut-popup
        position="bottom"
        :custom-style="{ height: '60vh' }"
        v-model:visible="showExplainPopup"
        round
        closeable
        lock-scroll
    >
        <div class="flex-col wfull hfull">
            <div wfull h100 flex-center text-34 flex-shrink-0>{{ showExplainPopupData.title }}</div>
            <div class="flex-1 min-h-0 wfull overflow-scroll box-border px32">
                <div class="wfull mb15" v-for="(item, index) in showExplainPopupData.content" :key="item.id">
                    <div class="fw500 text-26">· {{ item.value }}</div>
                    <div class="fw500 text-24 text-#AEAEAE">
                        {{ item.remark }}
                    </div>
                </div>
            </div>
        </div>
    </nut-popup>
    <SubmitOrderPopup
        v-if="productInfo && specificationList"
        v-model:visible="showSubmitPopup"
        v-model:count="submitCount"
        :productInfo="productInfo"
        :specificationList="specificationList"
        :productType="productType"
        :listId="listId"
        :submitGroupOrderType="submitGroupOrderType"
        @submitOrder="submitOrder"
    ></SubmitOrderPopup>
</template>

<style scoped lang="scss">
.title-class {
    position: relative;
    &::after,
    &::before {
        content: " ";
        width: 80rpx;
        height: 2rpx;
        border-radius: 4rpx;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    &::after {
        background: linear-gradient(270deg, #f8f8f8 0%, #000000 100%);
        left: calc(100% + 16rpx);
    }
    &::before {
        background: linear-gradient(90deg, #f8f8f8 0%, #000000 100%);
        right: calc(100% + 16rpx);
    }
}
</style>
