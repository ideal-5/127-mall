<script setup lang="ts">
import { gotoPage } from '@/utils/uni';

</script>

<template>
    <div @click="gotoPage('vip-center')" >
        <image src="@/static/bj/vip-card.png" class="w-full h-134" />
    </div>
</template>

<style scoped lang="scss"></style>
