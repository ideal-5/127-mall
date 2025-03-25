<!-- 

内衣专场

-->
<script setup lang="ts">
import { gotoPage } from "@/utils/uni";
</script>

<template>
    <div
        class="w-324 h-568 box-border p-10 b-rd-10 underwear-box flex flex-col justify-end"
        @click.stop="gotoPage('/pages/underwear/underwear-home')"
    >
        <div
            class="w-full h-44 border-solid border-[1px] border-[#fff] bg-[#FE854E] b-rd-10 mb-10 flex items-center justify-between box-border py-6 px-20"
        >
            <span class="text-28 text-white font-500">满200减30</span>
            <div class="bg-white b-rd-6 w-[fit-content] flex items-center h-full px-10">
                <span class="text-16 text-[#FF9113] font-500">立即抢购</span>
                <span class="i-mdi:chevron-right text-16 text-#FF9113 font-500" />
            </div>
        </div>
        <div class="w-full flex justify-between">
            <div class="flex flex-col w-148">
                <div class="w-full h-200 mb-8">
                    <image
                        :src="`https://picsum.photos/200/300?random=${Math.random()}`"
                        mode="aspectFill"
                        class="size-full b-rd-10"
                    />
                </div>
                <div class="w-full h-236">
                    <image
                        :src="`https://picsum.photos/200/300?random=${Math.random()}`"
                        mode="aspectFill"
                        class="size-full b-rd-10"
                    />
                </div>
            </div>
            <div class="flex flex-col w-148">
                <div class="w-full h-246 mb-8">
                    <image
                        :src="`https://picsum.photos/200/300?random=${Math.random()}`"
                        mode="aspectFill"
                        class="size-full b-rd-10"
                    />
                </div>
                <div class="w-full h-190">
                    <image
                        :src="`https://picsum.photos/200/300?random=${Math.random()}`"
                        mode="aspectFill"
                        class="size-full b-rd-10"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.underwear-box {
    background: url("@/static/img/underwear.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>
