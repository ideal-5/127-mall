<script setup lang="ts">
import { ref } from "vue";

const moneyInp = ref("");
</script>

<template>
    <div class="main">
        <navBar barColor="#fff">提现</navBar>
        <div class="yue">
            <div class="text">账户余额</div>
            <div class="amount">
                <span class="num">￥11.26</span>
            </div>
        </div>
        <div class="tixian">
            <div class="title">提现金额</div>
            <div class="inp-box">
                <nut-input
                    v-model="moneyInp"
                    placeholder="请输入提现金额"
                    :border="false"
                    style="--nut-input-padding: 10px 0"
                ></nut-input>
            </div>
        </div>
        <div class="tishi">服务费：1%，最低提现10元</div>
        <div class="num-type">
            <div class="left">
                <span class="i-ri:wechat-pay-fill mx-20 text-#3BCA72"></span>
                <div class="text">微信</div>
            </div>
            <div class="right">
                <div class="yuan yuan--active">
                    <span class="i-mdi:check text-#fff"></span>
                </div>
            </div>
        </div>

        <div class="btn" :class="{ 'btn--setout': moneyInp }">立即提现</div>
    </div>
</template>
<route lang="json">
{
    "layout": "anyLayout"
}
</route>

<style scoped lang="scss">
.main {
    min-height: 100vh;
    width: 100%;
    background-color: #f2f2f2;
    box-sizing: border-box;
    padding: 20rpx;
    .yue {
        width: 100%;
        // height: 136rpx;
        background-color: #fff;
        border-radius: 8rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 25rpx 20rpx;
        .text {
            font-size: 26rox;
            margin-bottom: 20rpx;
        }
        .title {
            margin-bottom: 20rpx;
        }
        .amount {
            .num {
                font-size: 34rpx;
                font-weight: 600;
            }
            .unit {
                font-size: 24rpx;
            }
        }
    }
    .tixian {
        @extend .yue;
        margin-top: 20rpx;
        .inp-box {
            height: 50rpx;
        }
    }
    .tishi {
        color: #8a8a8a;
        font-size: 24rpx;
        width: 100%;
        height: 80rpx;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-left: 20rpx;
    }
    .num-type {
        width: 100%;
        height: 86rpx;
        background: #ffffff;
        box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
        border-radius: 8rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            .icon {
                width: 45rpx;
                height: 45rpx;
                margin: 0 20rpx;
            }
            .text {
                font-size: 26rpx;
            }
        }
        .right {
            margin-right: 20rpx;
            .yuan {
                width: 40rpx;
                height: 40rpx;
                border-radius: 9999rpx;
                @include my-flex;
                border: 1rpx solid #ffaa48;
                &--active {
                    background-color: #ffaa48;
                }
            }
        }
    }
    .btn {
        width: 100%;
        height: 78rpx;
        background: #fcd1a0;
        border-radius: 99999rpx;
        @include my-flex;
        color: #fff;
        font-size: 28rpx;
        margin-top: 200rpx;
        transition: all 0.3s;
        &--setout {
            background: #ffaa48;
        }
    }
    .bottom {
        @include my-flex;
        justify-content: space-around;
    }
}
</style>
