<script setup lang="ts">
const toast = useToast();

</script>

<template>
    <div @click="toast.text('文字提示')">
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
