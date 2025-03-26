import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "@/api";
import { userGetUserApi } from "@/api";

export const useUserStore = defineStore(
    "user",
    () => {
        const token = ref("");
        const user = ref<User.UserInfo>();

        // 刷新用户信息
        const refreshUserInfo = async () => {
            try {
                let { body, code } = await userGetUserApi();
                if (code === 200) {
                    user.value = body;
                }
            } catch (error) {}
        };
        // 用户信息是否存在
        const isUserInfoExist = computed(() => user.value?.id);

        return { token, user, refreshUserInfo, isUserInfoExist };
    },
    {
        persist: true,
    }
);
