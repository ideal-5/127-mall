<script setup lang="ts">
import { useToast } from "nutui-uniapp/composables";
const toast = useToast();

function showText() {
    toast.text("文字提示");
}
</script>

<template>
    <div @click="showText">
        <NavBar>消息</NavBar>
        <nut-swipe>
            <nut-cell title="左滑删除" round-radius="0"></nut-cell>

            <template #right>
                <nut-button style="height: 100%" type="danger" shape="square">删除</nut-button>
            </template>
        </nut-swipe>
    </div>
</template>
<route lang="json">
{
    "layout": "tabbarLayout"
}
</route>

<style scoped lang="scss"></style>
