<!-- 标签页组件 -->
<script setup lang="ts">
import { ref, onMounted, watch, getCurrentInstance } from "vue";

interface Props {
    tabList: Record<string, any>[];
    keyName?: string;
    isSlide?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    tabList: () => [],
    keyName: "label",
    // 是否需要滑块的 滑轨< 也可以直接自己样式穿透直接设置颜色 >
    isSlide: false,
});

const activeTab = defineModel<number>("activeTab", { required: true });
const emit = defineEmits(["change"]);

const instance = getCurrentInstance();
const boxLeft = ref(0);
const tagNodeXY = ref<UniApp.NodeInfo[]>(); // tab节点的位置信息

// 初始化 Tab 数据
const initTabData = () => {
    if (!instance) return;
    const query = uni.createSelectorQuery().in(instance.proxy);
    const query2 = uni.createSelectorQuery().in(instance.proxy);
    query
        .select("#customTabsContainer")
        .boundingClientRect((data) => {
            boxLeft.value = (data as UniApp.NodeInfo).left || 0;
            console.log("boxLeft.value", boxLeft.value);
        })
        .exec();

    if (props.tabList.length > 0) {
        query2
            .selectAll("#customTabItem")
            .boundingClientRect((data) => {
                tagNodeXY.value = data as UniApp.NodeInfo[];
                console.log("tagNodeXY.value", tagNodeXY.value);
            })
            .exec();
    }
};

// 监听 tabList 更新并重新初始化
watch(
    () => props.tabList,
    (newTabList) => {
        if (newTabList.length > 0) {
            initTabData();
        }
    }
);

// 初始化组件时进行一次数据获取
onMounted(() => {
    if (props.tabList.length > 0) {
        initTabData();
    } else {
        setTimeout(initTabData, 300); // 可能需要延迟加载的情况
    }
});

// 更改激活 tab
const changeActiveTab = (index: number) => {
    activeTab.value = index;
    emit("change", { index, item: props.tabList[activeTab.value] });
};
</script>

<template>
    <div class="custom-tabs-container-bxo">
        <div id="customTabsContainer" class="custom-tabs-container">
            <div
                id="customTabItem"
                class="custom-tab-item"
                :class="{ 'custom-tab-item--active': activeTab === index }"
                v-for="(item, index) in props.tabList"
                :key="index"
                @click="changeActiveTab(index)"
            >
                {{ props.keyName ? item[props.keyName] : item }}
            </div>
            <div
                class="custom-tab-active-indicator"
                :style="{
                    left: tagNodeXY?.[activeTab]?.left - boxLeft + 'px',
                    width: tagNodeXY?.[activeTab]?.width + 'px',
                }"
            ></div>
        </div>
        <div class="custom-tab-active-wrapper" :style="{ backgroundColor: isSlide ? '#d6d6d6' : 'transparent' }"></div>
    </div>
</template>

<style scoped lang="scss">
.custom-tabs-container-bxo {
    --tabs-line-bagcolor: #000;
    --tabs-text-color: #a5a5a5;
    --tabs-text-active-color: #000;
    --tabs-text-font: 400;
    --tabs-text-active-font: 500;

    height: 80rpx;
    width: 100%;
    position: relative;
    .custom-tabs-container {
        height: 100%;
        height: 100%;
        overflow-x: scroll;
        display: flex;
        align-items: center;

        font-size: 26rpx;
        color: var(--tabs-text-color);
        position: relative;
        .custom-tab-item {
            margin: 0 20rpx;
            flex-shrink: 0;
            font-weight: var(--tabs-text-font);
            &--active {
                color: var(--tabs-text-active-color);
                font-weight: var(--tabs-text-active-font);
            }
        }
        .custom-tab-active-indicator {
            position: absolute;
            bottom: 0;
            height: 6rpx;
            background: var(--tabs-line-bagcolor);
            border-radius: 99999999rpx;
            transition: all 0.3s;
            z-index: 2;
        }
    }
    .custom-tab-active-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 6rpx;
        width: 100%;
        display: flex;
        align-items: center;
        z-index: 1;
    }
}
</style>
