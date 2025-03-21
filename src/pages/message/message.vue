<script setup lang="ts">
const toast = useToast();
</script>

<template>
    <div class="main">
        <NavBar style="--my-navbar-border-bottom-color: #efefef" barColor="#fff">消息</NavBar>

        <nut-swipe-group lock>
            <template v-for="(item, index) in 20" :key="idnex">
                <nut-swipe :name="index + ''">
                    <div class="w100% flex items-center box-border px32">
                        <div class="size-72 flex-shrink-0 mr24">
                            <image
                                src="https://picsum.photos/id/237/200/300"
                                mode="aspectFill"
                                class="size-full b-rd-full"
                            />
                        </div>
                        <div
                            class="flex-1 hfull min-w-0 b-b-solid b-b-#DBDBDB b-b-1 flex items-center justify-between box-border py25"
                        >
                            <div class="flex items-center hfull flex-1 min-w-0">
                                <div class="flex-col wfull">
                                    <span class="font-500 text-28 wfull truncate mb8">小尾巴~</span>
                                    <span class="text-24 text-#A5A5A5 wfull truncate"
                                        >你好你好，请问有这个衣服链接吗？15645616515616351531351351</span
                                    >
                                </div>
                            </div>
                            <div class="hfull w150 flex-shrink-0 flex justify-end">
                                <span class="text-20 text-#A5A5A5">2小时前</span>
                            </div>
                        </div>
                    </div>
                    <template #right>
                        <nut-button style="height: 100%" type="danger" shape="square">删除</nut-button>
                    </template>
                </nut-swipe>
            </template>
        </nut-swipe-group>
    </div>
</template>

<route lang="json">
{
    "layout": "tabbarLayout"
}
</route>

<style scoped lang="scss"></style>
