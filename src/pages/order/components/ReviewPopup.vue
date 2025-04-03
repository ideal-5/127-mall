<script setup lang="ts">
import { useUpload } from "@/hooks/useUpload";
import { orderCommentApi, orderCommentTagListApi } from "@/api";
import type { Order } from "@/api";

interface Props {
    activeOrderId: number;
    activeProductId: number;
}
const props = defineProps<Props>();
const show = defineModel<boolean>("visible", { required: true }); // 显示弹窗

const tagList = ref<Order.CommentTag[]>([]);
const activeTagId = ref<number>();
watch(
    () => props.activeProductId,
    async () => {
        if (!props.activeProductId) return;
        let { body } = await orderCommentTagListApi({ id: props.activeProductId });
        tagList.value = body;
        activeTagId.value = tagList.value[0].id;
    },
    { deep: true, immediate: true }
);

const review = ref("");
const imgList = ref<string[]>([]);

const { selectImage, uploadFiles } = useUpload();
async function uploadClick() {
    let imgarr = await selectImage(9 - imgList.value.length);
    let imagearr = await uploadFiles(imgarr);
    imgList.value.push(...imagearr);
}
function delImgClick(index: number) {
    imgList.value.splice(index, 1);
}
const toast = useToast();
async function submitComment() {
    if (!props.activeOrderId || !activeTagId.value || !review.value) return;
    await orderCommentApi({
        id: props.activeOrderId,
        review: review.value,
        imageList: imgList.value,
        tagList: activeTagId.value,
    });
    show.value = false;
    toast.success("发布评论成功");
}
</script>

<template>
    <nut-popup
        position="bottom"
        :z-index="60"
        :custom-style="{
            height: '70vh',
            display: 'flex',
            'flex-direction': 'column',
        }"
        round
        lock-scroll
        v-model:visible="show"
        closeable
    >
        <div wfull hfull relative flex-col>
            <div wfull flex-center text-34 h100 flex-shrink-0>发表评价</div>
            <div class="wfull h100 flex-shrink-0 flex box-border px32 items-center">
                <div
                    class="mr15 text-27 b-solid b-1rpx b-#DEDEDE b-rd-full box-border px15 py-6 flex-center"
                    v-for="(item, index) in tagList"
                    :key="item.id"
                    @click="activeTagId = item.id"
                    :class="activeTagId === item.id ? `bg-#FF9113 text-#fff b-#FF9113` : ``"
                >
                    {{ item.reviewTag }}
                </div>
            </div>
            <div class="wfull box-border px32 flex-1 min-h-0 overflow-scroll">
                <div class="wfull bg-#F3F3F3 box-border p25 b-rd-16">
                    <nut-textarea v-model="review" limit-show max-length="200" />
                    <div class="wfull grid grid-cols-3 gap-10 mt20">
                        <div
                            class="size-180 bg-#DEDEDE b-rd-14 flex-col items-center justify-center relative"
                            v-for="(item, index) in imgList"
                            :key="item"
                        >
                            <image :src="item" mode="aspectFill" class="size-full b-rd-14" />
                            <div @click="delImgClick(index)">
                                <span
                                    i-mdi:close-circle-outline
                                    class="absolute top-0 right-0 translate-x-50% -translate-y-50% text-#000"
                                    v-if="item"
                                ></span>
                            </div>
                        </div>
                        <div
                            class="size-180 bg-#DEDEDE b-rd-14 flex-col items-center justify-center"
                            @click="uploadClick"
                        >
                            <div i-mdi:camera-plus-outline></div>
                            <div text-26 mt20>图/视频</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute bottom-0 left-0 wfull h150 flex-center flex-shrink-0">
                <div
                    class="bg-[linear-gradient(77deg,#FFAA48_0%,#FF9113_100%)] w550 h84 flex-center text-#fff fw500 text-30 b-rd-12"
                    @click="submitComment"
                >
                    发布
                </div>
            </div>
        </div>
    </nut-popup>
</template>

<style scoped lang="scss">
:deep(.nut-textarea) {
    background-color: transparent !important;
    padding: 0;
}
</style>
