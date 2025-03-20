<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, nextTick } from "vue";

interface ProductWithIdKey extends Product {
    idKey: string;
}
interface Columns {
    idKey: string;
    data: ProductWithIdKey[];
    height: number;
}
const isLoaded = ref(false); // 是否加载中

const columns = ref<Columns[]>([
    { idKey: "column1", data: [], height: 0 },
    { idKey: "column2", data: [], height: 0 },
]);

const pushData = async <T extends Record<string, any>>(list: T[]) => {
    if (!isLoaded.value) {
        await nextTick();
        await pushList(list.map((item) => ({ idKey: "123", ...item })));
        isLoaded.value = false;
    }
};

const instance = getCurrentInstance();
const pushList = async <T extends Record<string, any>>(list: (T & { idKey: string })[]) => {
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
                        console.log("height, width", height, width);
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

defineExpose({ pushData });
</script>

<template>
    <!-- 瀑布流列表 -->
    <div class="flex justify-between">
        <div v-for="(colItem, colIndex) in columns" :key="colIndex" class="h-[fit-content]">
            <div v-for="(item, index) in colItem.data" :key="index" :id="item.idKey" class="w-326 mb-[24px]">
                <div class="w-full h-[fit-content] overflow-hidden flex" v-if="item.img">
                    <image :src="item.img" mode="widthFix" class="w-full" />
                </div>
                <!-- <div class="bg-#fff b-rd-b-16 box-border p-16">
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
                    </div> -->
                <slot name="text" :item="item"></slot>
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
