import { onShow, onHide } from "@dcloudio/uni-app";
import { DefaultBaseUrl } from "@/constants";
import { useUserStore } from "@/store";
import { ref, onMounted, onUnmounted } from "vue";

/**
 * @description uniapp websocket hook
 * @param onMessage 收到消息的回调
 * @param heartbeatInterval 心跳间隔时间
 */
export function useChange(onMessage = (e: any) => console.log("收到消息", e), heartbeatInterval = 3000) {
    // 保存socket实例
    const socketTask = ref<any>(null);
    // 是否主动断开连接
    const isDisconnect = ref(false);
    // 心跳定时器
    let heartbeatTimer: any = null;
    // 连接
    const connect = () => {
        if (!socketTask.value || isDisconnect.value) {
            isDisconnect.value = false;
            console.log("WebSocket连接中...");
            console.log("socketTask", socketTask);
            socketTask.value = uni.connectSocket({
                url: `${DefaultBaseUrl}/getChat/${userStore.user?.id}`,
                complete: () => {
                    console.log("WebSocket连接已建立");
                    startHeartbeat();
                },
            });
            // 监听WebSocket连接打开事件
            socketTask.value.onOpen(() => {
                console.log("WebSocket连接已打开");
            });
            // 监听WebSocket关闭
            socketTask.value.onClose(() => {
                console.log("WebSocket连接已关闭");

                if (!isDisconnect.value) {
                    setTimeout(() => {
                        console.log("WebSocket重新连接");
                        connect();
                    }, 1000);
                }
            });
            // 监听WebSocket错误
            socketTask.value.onError((error: any) => {
                console.error("WebSocket连接发生错误:", error);
            });
            // 监听WebSocket接受到服务器的消息事件
            socketTask.value.onMessage((res: any) => {
                console.log("接收消息res", res);

                let data = JSON.parse(res.data);
                if (onMessage) {
                    onMessage(data);
                }
            });
        }
    };
    // 断开连接
    const disconnect = () => {
        console.log("断开连接///////////");

        if (socketTask.value) {
            isDisconnect.value = true;
            socketTask.value.close({});
            stopHeartbeat();
            socketTask.value = null;
        }
    };

    // 发送心跳
    const startHeartbeat = () => {
        heartbeatTimer = setInterval(() => {
            if (socketTask.value) {
                // console.log("发送心跳");
                // socketTask.value.send({
                //     data: JSON.stringify({}),
                // });
            }
        }, heartbeatInterval);
    };
    // 停止心跳
    const stopHeartbeat = () => {
        clearInterval(heartbeatTimer);
    };
    // 发送消息
    const sendMessage = (message: any) => {
        console.log("发送消息:socketTask.value", socketTask.value);
        if (socketTask.value) {
            // socketTask.value.send({
            //     data: JSON.stringify(message),
            // });
            socketTask.value.send({ data: JSON.stringify([message]) });
        }
    };

    const userStore = useUserStore();

    onShow(async () => {
        connect();
    });

    onHide(() => {
        disconnect();
    });

    return {
        socketTask,
        connect,
        disconnect,
        sendMessage,
    };
}
