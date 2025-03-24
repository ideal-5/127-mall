<script setup lang="ts">
import { useStyle } from "@/hooks/useStyle";

const { bottomHeight, bottomStyle } = useStyle().absoluteBottom(120);
</script>

<template>
    <div class="main box-border px32 bg-#EFEFEF" :style="{ paddingBottom: bottomHeight }">
        <NavBar barColor="#fff">商家入驻</NavBar>

        <div class="wfull bg-#fff b-rd-12"></div>

        <div :style="bottomStyle" class="box-border px32 flex-center">
            <div class="wfull h78 bg-#FFAA48 text-#fff flex-center b-rd-8 text-26 fw500">申请入驻</div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
