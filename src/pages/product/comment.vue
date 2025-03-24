<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref(0);

const tabList = ref([
    { label: "全部", count: 1500 },
    { label: "回头客", count: 200 },
    { label: "很厚实", count: 200 },
    { label: "很柔软", count: 200 },
    { label: "性价比高", count: 200 },
]);

const activeMinTab = ref("综合");
</script>

<template>
    <div class="main">
        <NavBar isBackIconFill barColor="#fff" style="--my-navbar-border-bottom-color: #f2f2f2">
            <template #left>
                <div class="hfull text-34 flex items-center">评价</div>
            </template>
        </NavBar>
        <div wfull flex flex-wrap box-border px34 pb30 b-b-solid b-b-4rpx class="b-b-#F2F2F2">
            <div
                class="text-24 b-rd-full box-border px18 py8 mr20 mt20 transition"
                :class="activeTab === index ? 'bg-#FFEDC4 text-#FF8900' : 'bg-#F5F5F5 text-#949494'"
                v-for="(item, index) in tabList"
                :key="index"
                @click="activeTab = index"
            >
                {{ `${item.label}(${item.count})` }}
            </div>
        </div>
        <div class="wfull box-border px-34">
            <div class="h80 flex items-center">
                <span
                    class="transition"
                    :class="activeMinTab === '综合' ? 'fw500 text-26' : 'text-#AEAEAE text-24'"
                    @click="activeMinTab = '综合'"
                    >综合</span
                >
                <span class="text-24 text-#AEAEAE fw500 mx20">|</span>
                <span
                    class="transition"
                    :class="activeMinTab === '最新' ? 'fw500 text-26' : 'text-#AEAEAE text-24'"
                    @click="activeMinTab = '最新'"
                    >最新</span
                >
            </div>
        </div>
        <nut-backtop>
            <template #content>
                <div class="wfull">
                    <div
                        class="wfull box-border px34 b-b-solid b-b-4rpx b-b-#F2F2F2 mb24"
                        v-for="(maxitem, maxIndex) in 9"
                        :key="maxIndex"
                    >
                        <div flex items-center>
                            <div size-64 mr18>
                                <image size-full b-rd-full src="https://picsum.photos/200/300" mode="aspectFill" />
                            </div>
                            <div flex-col>
                                <span tetx-22 fw500>岁**好</span>
                                <span class="text-#AEAEAE text-22">1周前评价</span>
                            </div>
                        </div>
                        <div class="text-#949494 text-24 my30">【加厚珍珠纹】1提100抽 送挂钩</div>
                        <div text-26>
                            在真实工作中，估计import和require大家经常见到，如果做前端业务代码，那么import更是随处可见了。但我们都是直接去使用，但是这两种方式的区别是什么呢？应用场景有什么区别呢？
                            大部分能说出来import是ES6规范，而require是CommonJS规范，然后面试官深入问你两者编译规则有啥不一样？然后就不知道了
                            本文一次性对import和require的模块基本概念、编译规则、基本用法差异、生态支持和性能对比等5个方面一次理清总结好，下次遇到这种问题直接举一反三。
                            作者：天天鸭 链接：https://juejin.cn/post/7425135423145394213 来源：稀土掘金
                            著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
                        </div>
                        <div wfull grid grid-cols-3 gap-4 mt25>
                            <div class="size-192 mb20" v-for="(item, index) in maxitem" :key="index">
                                <image
                                    class="size-full b-rd-12"
                                    src="https://picsum.photos/seed/picsum/200/300"
                                    mode="aspectFill"
                                />
                            </div>
                        </div>
                        <div class="text-#AEAEAE text-22 mb-25">浏览123456</div>
                    </div>
                </div>
            </template>
        </nut-backtop>
    </div>
</template>

<style scoped lang="scss">
.a {
    // transition: ;
}
</style>
