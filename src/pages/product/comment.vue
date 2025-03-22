<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref(0);

const tabList = ref([
    { label: "全部", count: 1500 },
    { label: "回头客", count: 200 },
    { label: "很厚实", count: 200 },
    { label: "很柔软", count: 200 },
    { label: "性价比高", count: 200 },
]);

const activeMinTab = ref(0);
const minTabList = ref([
    { label: "综合", count: 1500 },
    { label: "最新", count: 200 },
]);
</script>

<template>
    <div class="main">
        <NavBar isBackIconFill style="--my-navbar-border-bottom-color: #f2f2f2">
            <template #left>
                <div class="hfull text-34 flex items-center">评价</div>
            </template>
        </NavBar>
        <div wfull flex flex-wrap box-border px34 pb30 b-b-solid b-b-4rpx class="b-b-#F2F2F2">
            <div
                class="text-24 b-rd-full box-border px18 py8 mr20 mt20 transition"
                :class="activeTab === index ? 'bg-#FFEDC4 text-#FF8900' : 'bg-#F5F5F5 text-#949494'"
                v-for="(item, index) in tabList"
                :key="index"
                @click="activeTab = index"
            >
                {{ `${item.label}(${item.count})` }}
            </div>
        </div>
        <div class="wfull box-border px-34">
            <div class="h80 flex items-center">
                <span
                    class="transition b-r-solid b-r-1rpx b-r-#AEAEAE last:b-r-0 box-border px20 first:pl0"
                    :class="activeMinTab === index ? 'fw500 text-26' : 'text-#AEAEAE text-24'"
                    v-for="(item, index) in minTabList"
                    :key="index"
                    @click="activeMinTab = index"
                    >{{ item.label }}</span
                >
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.a {
    // transition: ;
}
</style>
