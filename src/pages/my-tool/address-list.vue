<script setup lang="ts">
import { useStyle } from "@/hooks/useStyle";
import { ref } from "vue";
import {gotoPage} from '@/utils/uni'

const { bottomHeight, bottomStyle } = useStyle().absoluteBottom(150);

const defaultAddress = ref(true);
</script>

<template>
    <div class="main" :style="{ paddingBottom: bottomHeight }">
        <NavBar barColor="#fff" style="--my-navbar-border-bottom-color: #F2F2F2">地址管理</NavBar>
        <div class="box-border px-32">
            <div
                class="w-full shadow-[0rpx_6rpx_12rpx_0rpx_rgba(0,0,0,0.1608)] b-rd-12 mt-30  last:mb-20"
                v-for="(item, index) in 10"
                :key="index"
            >
                <div class="flex items-center box-border py-25 pr-20">
                    <div class="w-70 flex-center flex-shrink-0">
                        <div class="size-40 flex-center bg-[#FFAA48] b-rd-full">
                            <span class="i-mdi:check text-#fff"></span>
                        </div>
                    </div>
                    <div class="text-26 flex-1 min-w-0 break-all">
                        <div>djkasdhkasddaksjdhkjasdasdlkasjddajklsdjl</div>
                        <div class="mb-20 mt-15">djkasdhk asddaksjdhkjasd asd lkasjd</div>
                        <div class="text-#BFBFBF">
                            <span class="mr-20">狗蛋</span>
                            <span>191211410122</span>
                        </div>
                    </div>
                </div>
                <div
                    class="text-#818181 flex items-center justify-between border-t-#DBDBDB border-t-solid border-t-1 box-border py-25 pr-20"
                >
                    <div class="ml-70">
                        <nut-switch v-model="defaultAddress" active-color="#55BC8D" />
                        <span class="ml-20">默认地址</span>
                    </div>
                    <div class="flex-center">
                        <div class="flex-center mr-30">
                            <span class="i-mdi:pencil-outline"></span>
                            <span>编辑</span>
                        </div>
                        <div class="flex-center">
                            <span class="i-proicons:delete"></span>
                            <span>删除</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div :style="bottomStyle" class="flex-center box-border px-30">
            <div class="w-full flex-center text-#fff h-90 bg-#FFAA48 b-rd-full" @click="gotoPage('address-add')" >+添加地址</div>
        </div>
    </div>
</template>

<route lang="json">
{
    "layout": "anyLayout"
}
</route>
