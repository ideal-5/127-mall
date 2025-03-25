<script setup lang="ts">
import { ref } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
const scrollTop = ref(0);
onPageScroll((e) => {
    scrollTop.value = e.scrollTop;
});
const swiperList = ref(Array.from({ length: 5 }, (_, i) => `https://picsum.photos/700/350?random=${Math.random()}`));

const nodes = ref(`
<h2><strong>品牌故事：SilkEmbrace——贴近肌肤的温柔之选</strong></h2>

<h3><strong>起源：一场关于舒适与自信的探索</strong></h3>
<p>在快节奏的现代生活中，女性不仅追求外在的美丽，更渴望从内而外的舒适与自信。<strong>SilkEmbrace</strong> 诞生于这样一种理念：<em>内衣不仅是穿着的选择，更是一种生活方式的表达。</em> 我们希望每一位女性都能在贴身衣物中感受到温柔呵护，享受无拘无束的自在体验。</p>

<p>品牌创始人艾莉（Ellie）曾是一名服装设计师，在多年的设计生涯中，她不断观察并倾听女性对内衣的真正需求。她发现，市场上许多内衣品牌往往侧重于外观设计，而忽略了真正影响女性舒适度的面料、剪裁和支撑性。因此，<strong>她决定创立一个专注于“舒适、优雅、自信”的内衣品牌</strong>，用精致的工艺和考究的材质，让每一位女性都能拥有专属自己的温柔触感。</p>

<hr />

<h3><strong>匠心工艺：舒适与美学的完美结合</strong></h3>
<p>SilkEmbrace 甄选高品质面料，如<strong>奢华丝绸、轻柔莫代尔、有机棉</strong>，确保每一件内衣都如第二层肌肤般贴合人体曲线。我们的产品采用无痕裁剪技术，告别束缚感，同时结合人体工学设计，让穿着者全天候都能保持自在舒适。</p>

<ul>
    <li><strong>无钢圈支撑设计</strong> —— 释放束缚，塑造自然胸型。</li>
    <li><strong>高弹柔软面料</strong> —— 适应不同身形，提供极致贴合。</li>
    <li><strong>透气舒适工艺</strong> —— 即使炎热季节也能保持干爽透气。</li>
    <li><strong>精美蕾丝点缀</strong> —— 优雅与性感并存，展现女性魅力。</li>
</ul>

<p>每一处细节，我们都倾注心血，力求让每位女性在穿上 SilkEmbrace 内衣的瞬间，感受到如丝绸般的温柔包裹，激发自信与美丽。</p>

<hr />

<h3><strong>可持续发展：温柔对待女性，也温柔对待地球</strong></h3>
<p>SilkEmbrace 始终坚持<strong>环保与可持续发展</strong>理念，我们选用符合全球环保标准的可降解面料，减少化学染色剂的使用，并采用<strong>零浪费裁剪工艺</strong>，最大程度减少对环境的影响。此外，我们的供应链也遵循<strong>公平贸易原则</strong>，确保生产过程中每一位工匠都能获得合理的薪资和安全的工作环境。</p>

<hr />

<h3><strong>品牌愿景：让每一位女性都能拥抱真实自我</strong></h3>
<p>SilkEmbrace 不是一个简单的内衣品牌，而是<strong>女性自信生活方式的倡导者</strong>。我们相信，每一位女性都值得被温柔对待，值得拥有最舒适的贴身呵护。无论是忙碌的职场、甜蜜的约会，还是悠闲的居家时光，SilkEmbrace 都希望能成为你最贴心的陪伴，让你由内而外，焕发属于自己的光彩。</p>

<p>🌸 <strong>SilkEmbrace——让舒适成为美的一部分，让每一天都充满自信与优雅。</strong> 🌸</p>

`);
</script>

<template>
    <div>
        <NavBar isBackIconFill isEmptyFill :scrollTop="scrollTop" scrollLimit="1104rpx"> </NavBar>
        <nut-swiper
            :init-page="1"
            :pagination-visible="true"
            pagination-color="#426543"
            pagination-unselected-color="#808080"
            auto-play="30000"
            class="w-full h-1104"
        >
            <nut-swiper-item v-for="(item, index) in swiperList" :key="index">
                <!-- <image src="" mode="aspectFill" class="wfull hfull bg-emerald" /> -->
                <image :src="item" mode="aspectFill" class="wfull hfull" />
            </nut-swiper-item>
        </nut-swiper>
        <div wfull box-border px34>
            <div>
                <div flex items-center mb26>
                    <!-- <image src="@/static/img/underwear-3.png" size-36 mr16 /> -->
                    <span fw500 text-32>品牌故事</span>
                </div>
                <div wfull flex flex-wrap justify-between>
                    <rich-text :nodes="nodes"></rich-text>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
