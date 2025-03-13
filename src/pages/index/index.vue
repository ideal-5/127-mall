<script lang="ts" setup>
import { ceshiApi } from "@/api";
import { onMounted } from "vue";

onMounted(async () => {
    try {
        let data = await ceshiApi("/todos/1");
        console.log("成功", data);
    } catch (error) {
        console.log("err", error);
    }
});
</script>

<template>
    <div class="px-4 py-10 text-center text-gray-700 font-sans">
        <div>
            <div class="i-carbon-campsite" inline-block text-80 />
        </div>
    </div>
</template>
