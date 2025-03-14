<script setup lang="ts">
import DirectSelling from "./DirectSelling.vue";
import Underwear from "./Underwear.vue";
import Prefecture from "./Prefecture.vue";
import NewProduct from "./NewProduct.vue";
</script>

<template>
    <div class="w-full flex justify-between">
        <div>
            <DirectSelling class="mb-12"></DirectSelling>
            <Underwear></Underwear>
        </div>
        <div>
            <Prefecture class="mb-12"></Prefecture>
            <NewProduct></NewProduct>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
