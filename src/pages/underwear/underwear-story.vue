<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
import { configGetAgreementApi } from "@/api";
import { useUnderwear } from "@/hooks/useUnderwear";

const { bannerList } = useUnderwear();

const scrollTop = ref(0);
onPageScroll((e) => {
    scrollTop.value = e.scrollTop;
});

onMounted(async () => {
    let { body } = await configGetAgreementApi({ type: "60" });
    nodes.value = body.policy;
    title.value = body.name;
});

const title = ref("");
const nodes = ref("");
</script>

<template>
    <div>
        <NavBar isBackIconFill isEmptyFill :scrollTop="scrollTop" scrollLimit="1104rpx"> </NavBar>
        <nut-swiper
            :init-page="1"
            :pagination-visible="true"
            pagination-color="#426543"
            pagination-unselected-color="#808080"
            auto-play="30000"
            class="w-full h-1104"
        >
            <nut-swiper-item v-for="(item, index) in bannerList" :key="index">
                <!-- <image src="" mode="aspectFill" class="wfull hfull bg-emerald" /> -->
                <image :src="item.imageUrl" mode="aspectFill" class="wfull hfull" />
            </nut-swiper-item>
        </nut-swiper>
        <div wfull box-border px34>
            <div>
                <div flex items-center mb26>
                    <!-- <image src="@/static/img/underwear-3.png" size-36 mr16 /> -->
                    <span fw500 text-32>{{ title }}</span>
                </div>
                <div wfull flex flex-wrap justify-between>
                    <rich-text :nodes="nodes"></rich-text>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
