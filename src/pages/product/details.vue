<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStyle } from "@/hooks/useStyle";
import type { Product } from "@/types";
import WaterfallsFlow from "@/components/WaterfallsFlow.vue";

const { bottomHeightNum, bottomStyle } = useStyle().absoluteBottom(120);

const swiperList = ref([
    "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
    "https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg",
    "https://storage.360buyimg.com/jdc-article/welcomenutui.jpg",
    "https://storage.360buyimg.com/jdc-article/fristfabu.jpg",
]);

onMounted(() => {
    WaterfallsFlowRef.value && WaterfallsFlowRef.value.pushData(list.value);
});

const list = ref<Product[]>([
    {
        img: "https://picsum.photos/300/450",
        name: "家用3C 数码电器电饭煲",
        price: "311.99",
        vprice: "18.00",
    },
    { img: "https://picsum.photos789/300/520", name: "智能手表 运动监测", price: "199.99", vprice: "25.00" },
    {
        img: "https://picsum.photos/300/430",
        name: "无线蓝牙耳机 降噪版",
        price: "129.99",
        vprice: "15.00",
    },
    {
        img: "https://picsum.photos/300/480",
        name: "家用空气炸锅 健康低脂",
        price: "279.99",
        vprice: "22.00",
    },
    { img: "https://picsum.photos/300/510", name: "便携式投影仪 高清", price: "459.99", vprice: "30.00" },
    {
        img: "https://picsum.photos/300/400",
        name: "高性能游戏鼠标 RGB灯光",
        price: "89.99",
        vprice: "10.00",
    },
    {
        img: "https://picsum.photos/300/550",
        name: "时尚智能音箱 语音助手",
        price: "159.99",
        vprice: "18.50",
    },
    {
        img: "https://picsum.photos/300/470",
        name: "家用电动剃须刀 便捷",
        price: "109.99",
        vprice: "12.00",
    },
    {
        img: "https://picsum.photos/300/530",
        name: "办公无线键盘 机械手感",
        price: "139.99",
        vprice: "17.00",
    },
    {
        img: "https://picsum.photos/300/490",
        name: "高清摄像头 直播专用",
        price: "249.99",
        vprice: "28.00",
    },
]);
const WaterfallsFlowRef = ref<InstanceType<typeof WaterfallsFlow>>();
</script>

<template>
    <div class="main box-border bg-#F8F8F8" :style="{ paddingBottom: bottomHeightNum + 30 + 'rpx' }">
        <NavBar isEmptyFill></NavBar>
        <!-- 轮播图 -->
        <div class="wfull h730 bg-emerald">
            <nut-swiper
                :init-page="1"
                :pagination-visible="true"
                pagination-color="#426543"
                pagination-unselected-color="#808080"
                auto-play="8000"
                class="w-full hfull bg-emerald"
            >
                <nut-swiper-item v-for="(item, index) in swiperList" :key="index">
                    <image :src="item" mode="aspectFill" class="wfull hfull" />
                </nut-swiper-item>
            </nut-swiper>
        </div>
        <!-- 商品信息 -->
        <div class="wfull b-rd-t-30 bg-#F8F8F8 -mt-62 box-border px34 relative">
            <div class="wfull h80 flex justify-between items-center">
                <div class="flex items-center">
                    <div class="font-500 text-#EC3013 mr32">
                        <span class="text-28">￥</span>
                        <span class="text-42">12.99</span>
                    </div>
                    <span class="text-#949494 text-24 line-through">￥19.99</span>
                </div>
                <div class="text-#EC3013 text-24">已售1万件+</div>
            </div>
            <div class="text-30 font-500 wfull mt20 mb40">
                植护悬挂洗脸巾一次性干湿两用壁挂式界面擦脸巾 加厚棉柔巾100抽
            </div>
            <div class="wfull flex items-center flex-wrap">
                <div
                    class="text-20 text-#A2833B b-solid b-1 b-#A2833B b-rd-6 bg-#FFFAEF box-border px13 py6 mr15 mb15"
                    v-for="(item, index) in 3"
                    :key="index"
                >
                    同款好评12.8万
                </div>
            </div>
            <div class="wfull bg-#fff b-rd-14 mt20">
                <div class="wfull flex box-border py15">
                    <div class="w80 flex justify-center flex-shrink-0">
                        <span class="i-mdi:shield-check-outline"></span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="wfull flex items-center justify-between">
                            <div class="text-22 mb10">运费险·7天无理由退货·极速退款</div>
                            <div class="i-mdi:chevron-right"></div>
                        </div>
                        <!-- <div class="text-16 text-#AEAEAE">福建省福州市 发货 | 免运费</div> -->
                    </div>
                </div>
                <div class="wfull flex box-border py15">
                    <div class="w80 flex justify-center flex-shrink-0">
                        <span class="i-mdi:truck-outline"></span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="wfull flex items-center justify-between">
                            <div class="text-22 mb10">最晚48小时内发货，晚发即赔</div>
                            <div class="i-mdi:chevron-right"></div>
                        </div>
                        <div class="text-16 text-#AEAEAE">福建省福州市 发货 | 免运费</div>
                    </div>
                </div>
            </div>
            <!-- 商品详情 -->
            <div class="wfull">
                <div class="wfull h80 flex-center">
                    <span class="title-class fw500 text-28">商品详情</span>
                </div>
                <image src="https://picsum.photos/300/600" mode="widthFix" class="wfull" />
            </div>
            <!-- 评论 -->
            <div bg-white wfull mt20 mb20>
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
                            <div class="text-24">{{ item.name }}</div>
                            <div>
                                <span class="font-500 text-18">￥</span>
                                <span class="text-24 font-700">{{ item.price }}</span>
                            </div>
                            <div class="flex items-center">
                                <div class="flex items-center border-1 border-#000 border-solid">
                                    <image src="@/static/img/vip1.png" mode="scaleToFill" class="size-25" />
                                    <span class="text-12 mx-10">省{{ item.vprice }}</span>
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
                <div flex-col items-center>
                    <image src="https://picsum.photos/seed/picsum/200/300" mode="aspectFill" size-48 b-rd-full />
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
                <div class="hfull text-24 text-#FF8B06 bg-#FFEDC4 b-rd-l-full flex-center box-content px22">
                    加入购物车
                </div>
                <div
                    class="hfull flex-col items-center justify-center text-#fff bg-#FFAA48 b-rd-r-full box-border px50"
                >
                    <span class="fw500 text-30">￥12.90</span>
                    <span class="text-20">立即购买</span>
                </div>
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
