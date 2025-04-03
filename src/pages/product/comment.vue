<script setup lang="ts">
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { ref } from "vue";
import { gotoPage } from "@/utils/uni";
import type { Product, Order } from "@/api";
import { productCommentTagListApi, productCommentListApi } from "@/api";
import { useStyle } from "@/hooks/useStyle";

const stickyStyle = useStyle().sticky("navBar");

// tag
const tagList = ref<Product.CommentTag[]>([]);
const activeTag = ref<number>();
async function getTagList() {
    let { body } = await productCommentTagListApi({ id: productInfo });
    tagList.value = body;
    if (tagList.value.length > 0) {
        activeTag.value = tagList.value[0].id;
    }
}

// 列表
const activeMinTab = ref("10"); // 排序
const paging = {
    page: 1,
    limit: 10,
};
const commentList = ref<Product.Comment[]>([]);
const getList = async (isPush: boolean = false) => {
    let params: Product.CommentListParams = {
        page: isPush ? paging.page + 1 : 1,
        limit: 10,
        id: productInfo,
        orderBy: activeMinTab.value,
    };
    if (activeTag.value) {
        params.tagId = activeTag.value;
    }
    let { data } = await productCommentListApi(params);
    if (isPush) {
        if (data.length === 0) return;
        paging.page++;
        commentList.value.push(...data);
    } else {
        paging.page = 1;
        commentList.value = data;
    }
};

let productInfo: number;
onLoad((query) => {
    if (!query?.productInfo) return;
    productInfo = query?.productInfo as number;
    getTagList();
});

watch([() => activeTag.value, () => activeMinTab.value], () => getList(false));
onReachBottom(() => getList(true));
</script>

<template>
    <div class="main">
        <NavBar isBackIconFill barColor="#fff" style="--my-navbar-border-bottom-color: #f2f2f2">
            <template #left>
                <div class="hfull text-34 flex items-center">评价</div>
            </template>
        </NavBar>
        <div
            wfull
            flex
            flex-wrap
            box-border
            px34
            pb30
            b-b-solid
            b-b-4rpx
            class="b-b-#F2F2F2 bg-#fff"
            :style="stickyStyle"
        >
            <div
                class="text-24 b-rd-full box-border px18 py8 mr20 mt20 transition"
                :class="activeTag === item.id ? 'bg-#FFEDC4 text-#FF8900' : 'bg-#F5F5F5 text-#949494'"
                v-for="(item, index) in tagList"
                :key="item.id"
                @click="activeTag = item.id"
            >
                {{ `${item.title}(${item.count})` }}
            </div>
        </div>
        <div class="wfull box-border px-34">
            <div class="h80 flex items-center">
                <span
                    class="transition"
                    :class="activeMinTab === '10' ? 'fw500 text-26' : 'text-#AEAEAE text-24'"
                    @click="activeMinTab = '10'"
                    >综合</span
                >
                <span class="text-24 text-#AEAEAE fw500 mx20">|</span>
                <span
                    class="transition"
                    :class="activeMinTab === '20' ? 'fw500 text-26' : 'text-#AEAEAE text-24'"
                    @click="activeMinTab = '20'"
                    >最新</span
                >
            </div>
        </div>
        <nut-backtop>
            <template #content>
                <div class="wfull">
                    <div
                        class="wfull box-border px34 b-b-solid b-b-4rpx b-b-#F2F2F2 mb24"
                        v-for="(comment, commentIndex) in commentList"
                        :key="comment.review.id"
                    >
                        <div flex items-center>
                            <div size-64 mr18>
                                <image size-full b-rd-full :src="comment.headImage" mode="aspectFill" />
                            </div>
                            <div flex-col>
                                <span tetx-22 fw500>{{ comment.userName }}</span>
                                <span class="text-#AEAEAE text-22">{{ comment.review.createTime }}</span>
                            </div>
                        </div>
                        <div class="text-#949494 text-24 my30">{{ comment.review.merchName }}</div>
                        <div text-26>
                            {{ comment.review.review }}
                        </div>
                        <div wfull grid grid-cols-3 gap-4 mt25>
                            <div
                                class="size-192 mb20"
                                v-if="comment.banners.length > 0"
                                v-for="(banner, bannerTndex) in comment.banners"
                                :key="banner.id"
                            >
                                <image class="size-full b-rd-12" :src="banner.imageUrl" mode="aspectFill" />
                            </div>
                        </div>
                        <div class="text-#AEAEAE text-22 mb-25">浏览123456</div>
                    </div>
                </div>
            </template>
        </nut-backtop>
    </div>
</template>

<style scoped lang="scss">
.a {
    // transition: ;
}
</style>
