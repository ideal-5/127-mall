<script setup lang="ts"></script>

<template>
    <div
        class="main bg-[linear-gradient(183deg,#FFDBB8_0%,#FFEDC4_20%,#FCFCFC_45%,#FCFCFC_60%,#FCFCFC_100%)] flex flex-col justify-end"
    >
        <NavBar>更改手机号</NavBar>
        <div class="h-70vh w-full bg-#fff b-rd-tr-26 b-rd-tl-26 flex flex-col items-center">
            <div>
                <image src="https://picsum.photos/200" mode="aspectFill" class="size-214 b-rd-full mt--50%" />
            </div>
            <div class="text-46 font-500 my-32">武庸</div>
            <div class="text-30 text-#FFAA48">当前手机号</div>
            <div class="text-44 font-500 mt52 mb100">191****0101</div>
            <div class="w-618 h-82 flex items-center justify-center text-#fff text-30 bg-#FFAA48 b-rd-full">
                更换手机号
            </div>
        </div>
    </div>
</template>

<route lang="json">
{
    "layout": "anyLayout"
}
</route>

<style scoped lang="scss"></style>
