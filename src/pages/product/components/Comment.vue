<script setup lang="ts">
import { gotoPage } from "@/utils/uni";
import type { Product, Order } from "@/api";
import { productCommentTagListApi, productCommentListApi } from "@/api";
interface Props {
    productInfo: { activePrice: number } & Product.Product;
}
const props = defineProps<Props>();

const tagList = ref<Product.CommentTag[]>([]);
onMounted(async () => {
    let { body } = await productCommentTagListApi({ id: props.productInfo.id });
    tagList.value = body;
    console.log("tagList.value", tagList.value);
});

const commentList = ref<Product.Comment[]>([]);
onMounted(async () => {
    let { data } = await productCommentListApi({ page: 1, limit: 3, id: props.productInfo.id });
    commentList.value = data;
});
</script>

<template>
    <div bg-white wfull mt20 mb20 @click.stop="gotoPage(`comment?productInfo=${props.productInfo.id}`)">
        <div flex items-center justify-between h80 box-border px-10>
            <div text-28 fw500>商品评价({{ tagList?.[0]?.count }})</div>
            <div i-mdi:chevron-right></div>
        </div>
        <div wfull flex items-center mb-20 box-border px-10>
            <div
                class="bg-#FEF3DA b-rd-6 text-20 box-border px10 py5 mr15"
                v-for="(item, index) in tagList"
                :key="item.id"
            >
                <span>{{ item.title }} </span>
                <span class="text-#949494">{{ item.count }}</span>
            </div>
        </div>

        <div wfull>
            <div
                class="b-b-#E8E8E8 box-border py-15 wfull b-b-solid b-b-1rpx last:b-b-0 box-border px-10"
                v-for="(item, index) in commentList"
                :key="item.review.id"
            >
                <div flex items-center>
                    <image :src="item.headImage" mode="aspectFill" class="size-42 b-rd-full mr10" />
                    <div class="text-#949494" text-20>{{ item.userName }}</div>
                </div>
                <div wfull flex justify-between>
                    <div class="text-#949494 text-24 flex-1 min-w-0 truncate-2 h-fit mt18">
                        {{ item.review.review }}
                    </div>
                    <div w200 flex justify-end flex-shrink-0 v-if="item.banners.length > 0">
                        <image :src="item.banners?.[0].imageUrl" mode="aspectFill" size-90 b-rd-16 />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
