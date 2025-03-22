copyFlowList
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, nextTick } from "vue";
import type { Product } from "@/types";
import { onReachBottom } from "@dcloudio/uni-app";
import { gotoPage } from "@/utils/uni";

interface ProductWithIdKey extends Product {
    idKey: string;
}
interface Columns {
    idKey: string;
    data: ProductWithIdKey[];
    height: number;
}
const isLoaded = ref(false); // 是否加载中

onReachBottom(async () => {
    if (!isLoaded.value) {
        await nextTick();
        // await pushList(list.value);
        isLoaded.value = false;
    }
});

const columns = ref<Columns[]>([
    { idKey: "column1", data: [], height: 0 },
    { idKey: "column2", data: [], height: 0 },
]);
const list = ref<ProductWithIdKey[]>([
    {
        img: "https://picsum.photos/300/450",
        name: "家用3C 数码电器电饭煲",
        price: "311.99",
        vprice: "18.00",
        idKey: "a1",
    },
    { img: "https://picsum.photos/300/520", name: "智能手表 运动监测", price: "199.99", vprice: "25.00", idKey: "a2" },
    {
        img: "https://picsum.photos/300/430",
        name: "无线蓝牙耳机 降噪版",
        price: "129.99",
        vprice: "15.00",
        idKey: "a3",
    },
    {
        img: "https://picsum.photos/300/480",
        name: "家用空气炸锅 健康低脂",
        price: "279.99",
        vprice: "22.00",
        idKey: "a4",
    },
    { img: "https://picsum.photos/300/510", name: "便携式投影仪 高清", price: "459.99", vprice: "30.00", idKey: "a5" },
    {
        img: "https://picsum.photos/300/400",
        name: "高性能游戏鼠标 RGB灯光",
        price: "89.99",
        vprice: "10.00",
        idKey: "a6",
    },
    {
        img: "https://picsum.photos/300/550",
        name: "时尚智能音箱 语音助手",
        price: "159.99",
        vprice: "18.50",
        idKey: "a7",
    },
    {
        img: "https://picsum.photos/300/470",
        name: "家用电动剃须刀 便捷",
        price: "109.99",
        vprice: "12.00",
        idKey: "a8",
    },
    {
        img: "https://picsum.photos/300/530",
        name: "办公无线键盘 机械手感",
        price: "139.99",
        vprice: "17.00",
        idKey: "a9",
    },
    {
        img: "https://picsum.photos/300/490",
        name: "高清摄像头 直播专用",
        price: "249.99",
        vprice: "28.00",
        idKey: "a10",
    },
]);

const instance = getCurrentInstance();
onMounted(async () => {
    await pushList(list.value);
    isLoaded.value = false;
});
const pushList = async (list: ProductWithIdKey[]) => {
    isLoaded.value = true;
    if (!instance) return;
    for (const listItem of list) {
        const maxIndex = columns.value.reduce(
            (maxIdx, item, idx, array) => (item.height < array[maxIdx].height ? idx : maxIdx),
            0
        );
        const column = columns.value[maxIndex];
        column.data.push({ ...listItem, img: "" });

        // 获取文字区域宽高
        let columnDom = await new Promise<{ height: number; width: number }>((resolve, reject) => {
            nextTick(() => {
                const query = uni.createSelectorQuery().in(instance.proxy);
                query
                    .select(`#${listItem.idKey}`)
                    .boundingClientRect(async (domInfo) => {
                        if (!domInfo) return resolve({ height: 0, width: 0 }); // 防止 domInfo 为空时报错
                        let { height = 0, width = 0 } = domInfo as UniApp.NodeInfo;
                        resolve({ height, width });
                    })
                    .exec();
            });
        });
        // 加载图片并获取图片高度
        let imgPath = "";
        let imgHeight = 0;
        try {
            const imgInfo = await uni.getImageInfo({ src: listItem.img });
            imgHeight = Math.ceil((imgInfo.height / imgInfo.width) * columnDom.width);
            imgPath = imgInfo.path; // 确保使用解析后的图片路径
        } catch (error) {
            imgPath = "https://th.bing.com/th/id/OIP.U94Z89XV8xiBeEgFrTG-IgAAAA?rs=1&pid=ImgDetMain"; // 设为默认占位图
        }
        column.data[column.data.length - 1].img = imgPath;
        column.height = column.height + columnDom.height + imgHeight + 24;
    }
};
</script>

<template>
    <div>
        <div class="h-80 flex items-center">
            <image src="@/static/img/hot-icon.png" class="size-32 mr-10" />
            <span class="text-32 font-500">热门推荐</span>
        </div>
        <!-- 瀑布流列表 -->
        <div class="flex justify-between">
            <div v-for="(colItem, colIndex) in columns" :key="colIndex" class="h-[fit-content]">
                <div
                    v-for="(item, index) in colItem.data"
                    :key="index"
                    :id="item.idKey"
                    class="w-326 mb-[24px]"
                    @click="gotoPage('/pages/product/details')"
                >
                    <div class="w-full h-[fit-content] overflow-hidden flex" v-if="item.img">
                        <image :src="item.img" mode="widthFix" class="w-full" />
                    </div>
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
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.aaa {
    border-radius: 0 0 16rpx 16rpx;
    height: fit-content;
}
</style>
