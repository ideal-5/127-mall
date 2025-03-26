import { defineStore } from "pinia";
import { ref } from "vue";

export const useSetupStore = defineStore("setup", () => {
    const toast = useToast();
    return { toast };
});
