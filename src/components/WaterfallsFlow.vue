<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, nextTick } from "vue";
import { deepClone } from "@/utils/tool";

// 接收的值
interface ReceiveData {
    img: string;
    idKey: string;
    [key: string]: any;
}
interface Columns {
    idKey: string;
    data: ReceiveData[];
    height: number;
}

const emit = defineEmits(["itemClick"]);

const isLoaded = ref(false); // 是否加载中

const columns = ref<Columns[]>([
    { idKey: "column1", data: [], height: 0 },
    { idKey: "column2", data: [], height: 0 },
]);

const clearList = () => {
    columns.value.forEach((item) => {
        item.data = [];
        item.height = 0;
    });
};
const pushData = async (list: ReceiveData[] | []): Promise<boolean> => {
    if (!isLoaded.value) {
        await nextTick();
        await pushList(list);
        isLoaded.value = false;
        return true;
    }
    return false;
};
const instance = getCurrentInstance();
const pushList = async (list: ReceiveData[]) => {
    isLoaded.value = true;
    if (!instance) return;
    let nList = deepClone(list);
    let resList = await Promise.allSettled(nList.map(async (item) => await uni.getImageInfo({ src: item.img })));
    resList.forEach((item, index) => {
        let height = 300;
        let width = 300;
        let path = "https://th.bing.com/th/id/OIP.U94Z89XV8xiBeEgFrTG-IgAAAA?rs=1&pid=ImgDetMain";
        let isSuccess = false;
        if (item.status === "fulfilled") {
            height = item.value.height;
            width = item.value.width;
            path = item.value.path;
            isSuccess = true;
        }
        nList[index].imgInfo = {
            height,
            width,
            path,
            isSuccess,
        };
    });
    for (const listItem of nList) {
        const maxIndex = columns.value.reduce(
            (maxIdx, item, idx, array) => (item.height < array[maxIdx].height ? idx : maxIdx),
            0
        );
        const column = columns.value[maxIndex];
        column.data.push({ ...listItem, img: "" });
        await nextTick();
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
        column.data[column.data.length - 1].img = listItem.img;
        column.height =
            column.height +
            columnDom.height +
            (listItem.imgInfo.height / listItem.imgInfo.width) * columnDom.width +
            24;
    }
};

// 点击item
const itemClick = (item: ReceiveData) => {
    emit("itemClick", item);
};
defineExpose({ pushData, clearList });
</script>

<template>
    <!-- 瀑布流列表 -->
    <div class="flex justify-between">
        <div v-for="(colItem, colIndex) in columns" :key="colIndex" class="h-[fit-content]">
            <div
                v-for="(item, index) in colItem.data"
                :key="index"
                :id="item.idKey"
                class="w-326 mb-[24px]"
                @click="itemClick(item)"
            >
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
