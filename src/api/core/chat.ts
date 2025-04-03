import { unInstance } from "@/service";

export namespace Chat {
    export interface Paging {
        page: number | string;
        limit: number | string;
    }
    export interface Conversation {
        id: number;
        takeUserId: number;
        takeUserImage: string;
        takeUserName: string;
        sendUserId: number;
        message: string;
    }
    export interface Message {
        sendUserId?: number;
        sendUserImage?: string;
        sendUserName?: string;
        takeUserId?: number;
        takeUserImage?: string;
        takeUserName?: string;
        chatId?: number;
        createTime?: string;
        id?: number;
        message?: string;
        type?: string;
    }
}

// 获取会话列表
export const chatConversationListApi = (data: Chat.Paging) => {
    return unInstance.post<UnData, Chat.Paging, IUnResponseData<Chat.Conversation[], null>>("/chat/chatList", data);
};

// 获取聊天详情
export const chatConversationDetailApi = (data: { id: number }) => {
    return unInstance.post<UnData, { id: number }, IUnResponseData<Chat.Message[], null>>("/chat/chatDetail", data);
};

// 创建会话
export const chatConversationCreateApi = (data: { takeUserId: number }) => {
    return unInstance.post<UnData, { takeUserId: number }, IUnResponseData<null, { id: number }>>(
        "/chat/createChat",
        data
    );
};
