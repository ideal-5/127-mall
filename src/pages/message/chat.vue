<script setup lang="ts">
import { onLoad, onShow, onHide } from "@dcloudio/uni-app";
import { ref, nextTick } from "vue";
import { chatConversationDetailApi, chatConversationCreateApi } from "@/api";
import type { Chat } from "@/api";
import { useChange } from "@/hooks/useChat";
import { useUserStore } from "@/store";

/**
 * 键盘
 */
const KeyboardyHeight = ref("0px");
const KeyboardyListener = (res: any) => {
    console.log(res.height);
    KeyboardyHeight.value = res.height + "px";
    scrollToBottom();
};
onShow(() => {
    uni.hideKeyboard();
    uni.onKeyboardHeightChange(KeyboardyListener);
});

onHide(() => {
    uni.offKeyboardHeightChange(KeyboardyListener);
});

/**
 * 滚动
 */
const scrollTop = ref({
    old: 0,
    fresh: 0,
});

const scrollChange = (e: any) => {
    scrollTop.value.old = e.detail.scrollTop;
};
const scrollToBottom = () => {
    scrollTop.value.fresh = scrollTop.value.old;
    nextTick(() => {
        scrollTop.value.fresh = 999999999999;
    });
};
/**
 * 接口消息列表
 */
const messageList = ref<(Chat.Message & { isSelf: boolean })[]>([]);

const touser = ref<{ toname: string; toid: number; sessionId: number }>();
onLoad(async ({ toname = "对方名", toid = 0, sessionId = 0 }: any) => {
    await chatConversationCreateApi({ takeUserId: toid }); // TODO 这里创建后没有返回值
    touser.value = { toname, toid, sessionId };
    await getChatDetail();
    scrollToBottom();
});

const params = ref({ page: 1, limit: 10 });
const getChatDetail = async () => {
    if (!touser.value) return;
    let { data } = await chatConversationDetailApi({ id: touser.value.sessionId, ...params.value });
    messageList.value = data.reverse().map((item) => {
        return { ...item, isSelf: item.type === "10" };
    });
};
// 下拉刷新
const isRefresher = ref(true);
const refresherrefresh = async () => {
    isRefresher.value = true;
    if (!touser?.value) return;
    params.value.page++;
    let { data } = await chatConversationDetailApi({ id: touser?.value?.sessionId, ...params.value });
    isRefresher.value = false;
    messageList.value.unshift(
        ...data.reverse().map((item) => {
            return { ...item, isSelf: item.type === "10" };
        })
    );
};

// 初始化socket
const { sendMessage } = useChange(({ body: msg }) => {
    if (!msg || !msg?.contentText || !touser.value) return;
    messageList.value.push({
        id: new Date().getTime(),
        message: msg.contentText,
        takeUserId: touser.value.toid,
        takeUserImage: msg.toImage,
        takeUserName: touser.value.toname,
        createTime: new Date().toISOString(),
        isSelf: false,
    });
    scrollToBottom();
});

// 发送消息
const contentText = ref("");

const userStore = useUserStore();

const sendMessageClick = () => {
    if (!contentText.value || !touser.value) return;
    let str = contentText.value;
    contentText.value = "";
    sendMessage({ toUserId: touser.value.toid, contentText: str });
    messageList.value.push({
        id: new Date().getTime(),
        message: str,
        sendUserId: userStore.user?.id,
        sendUserImage: userStore.user?.headImage,
        sendUserName: userStore.user?.userName,
        createTime: new Date().toISOString(),
        isSelf: true,
    });
    scrollToBottom();
};
</script>

<template>
    <view class="main">
        <NavBar>{{ touser?.toname }}</NavBar>
        <scroll-view
            scroll-y
            scroll-with-animation
            class="message-box"
            @scroll="scrollChange"
            :scroll-top="scrollTop.fresh"
            refresher-enabled
            scroll-anchoring
            :refresher-triggered="isRefresher"
            @refresherpulling="
                () => {
                    console.log('被下拉');
                }
            "
            @refresherrefresh="refresherrefresh"
            @refresherrestore="
                () => {
                    console.log('被复位');
                }
            "
            @refresherabort="
                () => {
                    console.log('被中止');
                }
            "
        >
            <view
                class="message-item"
                v-for="(item, index) in messageList"
                :key="index"
                :style="{ flexDirection: item.isSelf ? 'row-reverse' : 'row' }"
            >
                <view class="avatar">
                    <image :src="item.isSelf ? item?.sendUserImage : item?.takeUserImage" mode="aspectFill" />
                </view>
                <view class="message-content">
                    <view class="message-text" :style="{ backgroundColor: item.isSelf ? '#ff9113' : '#fff' }">
                        {{ item.message }}
                    </view>
                </view>
            </view>
        </scroll-view>
        <div class="wfull h25rpx bg-#f5f5f5"></div>
        <view class="bottom-box">
            <view class="inp-box">
                <!-- <up-input
                    
                    border="surround"
                    v-model="contentText"
                    autoBlur
                    :adjustPosition="false"
                ></up-input> -->
                <nut-input
                    v-model="contentText"
                    :adjust-position="false"
                    placeholder="请输入内容"
                    style="--nut-input-padding: 10px"
                ></nut-input>
                <view class="send-btn" @click="sendMessageClick">发送</view>
            </view>
            <view class="Keyboard-box" :style="{ height: KeyboardyHeight }"></view>
        </view>
    </view>
</template>

<style scoped lang="scss">
// @import "sass:math";
:deep(.nut-input) {
    background-color: #f0f2f5 !important;
}
.main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .message-box {
        flex: 1;
        width: 100%;
        min-height: 0;
        overflow-y: scroll;
        // box-sizing: border-box;
        // padding-bottom: 20rpx;
        background-color: #f5f5f5;

        $avatar-size: 80rpx;
        $avatar-x: 15rpx;

        .message-item {
            width: 100%;
            display: flex;
            margin: 25rpx 0;
            box-sizing: border-box;

            .avatar {
                width: $avatar-size;
                height: $avatar-size;
                margin: 0 $avatar-x;
                flex-shrink: 0;
                > image {
                    width: $avatar-size;
                    height: $avatar-size;
                    border-radius: 99999rpx;
                }
            }
            .message-content {
                max-width: calc(100% - (#{($avatar-x * 2) + $avatar-size} * 2));
                min-width: 0;
                margin-top: calc($avatar-size / 5);
                .message-text {
                    max-width: 100%;
                    width: fit-content;
                    background-color: darkcyan;
                    word-break: break-all;
                    border-radius: 10rpx;
                    box-sizing: border-box;
                    padding: 15rpx 20rpx;
                }
            }
        }
    }
    .bottom-box {
        // height: 200rpx;
        .inp-box {
            width: 100%;
            flex-shrink: 0;
            display: flex;
            align-items: flex-end;
            box-sizing: border-box;
            padding: 20rpx 0;
            padding-left: 10rpx;

            :deep(.u-input) {
                height: 70rpx;
                padding-bottom: initial !important;
                padding-top: initial !important;
            }
            .send-btn {
                width: fit-content;
                height: 70rpx;
                min-width: 130rpx;
                @include my-flex;
                background-color: #ff9113;
                border-radius: 8rpx;
                margin: 0 15rpx;
                font-size: 30rpx;
                color: #fff;
            }
        }
        .Keyboard-box {
            width: 100%;
        }
    }
}
</style>
