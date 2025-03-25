<script setup lang="ts"></script>

<template>
    <div class="main h100vh flex-col">
        <NavBar>
            <template #left>
                <div class="wfull hfull flex-center relative">
                    <div>邀请分享</div>
                    <span class="i-fluent:share-16-filled absolute right-34"></span>
                </div>
            </template>
        </NavBar>
        <div class="flex-1 min-h-0 wfull bg flex-center bg-cyan">
            <div class="flex-col items-center -translate-y-80">
                <div class="fw500 text-34">邀请二维码</div>
                <div class="size-310 bg-emerald mt20"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bg {
    background: url("@/static/bj/invite-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
