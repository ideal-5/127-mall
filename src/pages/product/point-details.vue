<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useStyle } from "@/hooks/useStyle";
import WaterfallsFlow from "@/components/WaterfallsFlow.vue";
import { gotoPage } from "@/utils/uni";
import { pointsProductDetailApi } from "@/api";
import type { Points } from "@/api";
import { useUserStore } from "@/store";

const userStore = useUserStore();

const bannerList = ref<Points.Banner[]>([]); // 轮播图
const detail = ref<Points.Product>(); // 商品信息

onLoad(async (query) => {
    if (!query) return;
    let { body } = await pointsProductDetailApi({ id: query.id as number });
    bannerList.value = body.banner;
    detail.value = body.merchCoin;
});

const { bottomHeightNum, bottomStyle } = useStyle().absoluteBottom(120);

// 点击轮播图
const swiperClick = (index: number) => {
    uni.navigateTo({
        url: "swiper",
        events: {},
        success: function (res) {
            res.eventChannel.emit("sendBanner", { list: bannerList.value, index, productInfo: detail.value });
        },
    });
};

/**
 * 下单
 */
const showSubmitPopup = ref(true);
const submitCount = ref(1);
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
                        <!-- <span class="text-28">￥</span> -->
                        <span class="text-42">{{ detail?.coin }}积分</span>
                    </div>
                    <!-- <span class="text-#949494 text-24 line-through">￥{{ productInfo?.price }}</span> -->
                </div>
                <!-- <div class="text-#EC3013 text-24">已售{{ productInfo?.saleCount }}件</div> -->
            </div>
            <div class="text-30 font-500 wfull mt20 mb40">
                {{ detail?.merchName }}
            </div>

            <!-- 商品详情 -->
            <div class="wfull">
                <div class="wfull h80 flex-center">
                    <span class="title-class fw500 text-28">商品详情</span>
                </div>
                <image :src="detail?.description" mode="widthFix" class="wfull" />
            </div>
        </div>
        <!-- 底部 -->
        <div class="flex items-center box-border px32" :style="bottomStyle">
            <div
                class="h76 wfull flex-col items-center justify-center text-#fff bg-#FFAA48 b-rd-full box-border px50"
                @click="gotoPage(`point-place-order?id=${detail?.id}`)"
            >
                <span class="text-20">立即购买</span>
            </div>
        </div>
    </div>
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
