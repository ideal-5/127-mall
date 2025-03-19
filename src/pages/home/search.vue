<script setup lang="ts">
import { ref } from "vue";

const searchValue = ref("");

const tabsList = ref([
    {
        title: "全部",
        id: "all",
    },
    {
        title: "歌曲",
        id: "song",
    },
    {
        title: "歌手",
        id: "singer",
    },
    {
        title: "专辑",
        id: "album",
    },
    {
        title: "歌单",
        id: "playlist",
    },
]);

const activeTab = ref(0);
</script>

<template>
    <div class="main">
        <NavBar isBackIconFill>
            <template #left>
                <div class="wfull hfull flex items-center box-border pr-30">
                    <nut-searchbar
                        v-model="searchValue"
                        style="
                            --nut-searchbar-input-height: 70rpx;
                            --nut-searchbar-input-border-radius: 14rpx;
                            --nut-searchbar-padding: 0;
                            --nut-searchbar-background: transparent;
                            --nut-searchbar-input-background: rgba(255, 255, 255, 0.6);
                        "
                    >
                        <template #leftin>
                            <div class="size-40 flex-center">
                                <span class="i-mdi:magnify text-#fff size-40"></span>
                            </div>
                        </template>
                    </nut-searchbar>
                    <span class="text-28 font-500 text-#fff mx-10">搜索</span>
                </div>
            </template>
        </NavBar>
        <!-- tabs -->
        <div class="wfull flex items-center">
            <Tabs
                :tabList="tabsList"
                keyName="title"
                v-model:activeTab="activeTab"
                style="--tabs-line-bagcolor: #fff; --tabs-text-color: #fff; --tabs-text-active-color: #fff"
            ></Tabs>
            <div class="flex-center w-200">
                <span class="text-28 text-#fff">筛选</span>
                <span class="i-mdi:filter-cog-outline text-#fff"></span>
            </div>
        </div>
        <!-- 商品列表 -->
    </div>
</template>
<route lang="json">
{
    "layout": "anyLayout"
}
</route>
<style scoped lang="scss">
.main {
    background: url("@/static/bj/search-bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>
