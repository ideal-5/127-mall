<script lang="ts" setup>
import { useSetupStore } from "@/store";
/**
 * 引入这个是为了一些在页面中调用的封装函数中 可以使用setup中的函数
 * <如接口封装 中要使用的toast必须要在setup环境中使用>
 * 要把函数放到这个store中 通过store调用
 */
const setupStore = useSetupStore();
</script>

<template>
    <div>
        <nut-toast></nut-toast>
        <slot />
    </div>
</template>
