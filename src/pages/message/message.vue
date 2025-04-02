<script setup lang="ts">
import { chatConversationListApi } from "@/api";
import type { Chat } from "@/api";
import { gotoPage } from "@/utils/uni";
import { onReachBottom } from "@dcloudio/uni-app";

const toast = useToast();

// onMounted(() => {
//     chatConversationListApi();
// });

const paging = {
    page: 1,
    limit: 10,
};

const conversationList = ref<Chat.Conversation[]>([]);
const getList = async (isPush: boolean = false) => {
    let { data } = await chatConversationListApi({
        page: isPush ? paging.page + 1 : 1,
        limit: paging.limit,
    });
    if (isPush) {
        if (data.length === 0) return;
        paging.page++;
        conversationList.value.push(...data);
    } else {
        paging.page = 1;
        conversationList.value = data;
    }
};

onMounted(() => getList(false));
onReachBottom(() => getList(true));
</script>

<template>
    <div class="main">
        <NavBar style="--my-navbar-border-bottom-color: #efefef" barColor="#fff">消息</NavBar>

        <nut-swipe-group lock>
            <template v-for="(item, index) in conversationList" :key="item.id">
                <nut-swipe :name="index + ''">
                    <div
                        class="w100% flex items-center box-border px32"
                        @click="
                            gotoPage(`chat?toname=${item.takeUserName}&toid=${item.takeUserId}&sessionId=${item.id}`)
                        "
                    >
                        <div class="size-72 flex-shrink-0 mr24">
                            <image :src="item.takeUserImage" mode="aspectFill" class="size-full b-rd-full" />
                        </div>
                        <div
                            class="flex-1 hfull min-w-0 b-b-solid b-b-#DBDBDB b-b-1 flex items-center justify-between box-border py25"
                        >
                            <div class="flex items-center hfull flex-1 min-w-0">
                                <div class="flex-col wfull">
                                    <span class="font-500 text-28 wfull truncate mb8">{{ item.takeUserName }}</span>
                                    <span class="text-24 text-#A5A5A5 wfull truncate">{{ item.message }}</span>
                                </div>
                            </div>
                            <div class="hfull w150 flex-shrink-0 flex justify-end">
                                <span class="text-20 text-#A5A5A5">2小时前</span>
                            </div>
                        </div>
                    </div>
                    <template #right>
                        <nut-button style="height: 100%" type="danger" shape="square">删除</nut-button>
                    </template>
                </nut-swipe>
            </template>
        </nut-swipe-group>
    </div>
</template>

<style scoped lang="scss"></style>
