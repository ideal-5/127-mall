<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
    console.log("App Launch");
});
onShow(() => {
    console.log("App Show");
});
onHide(() => {
    console.log("App Hide");
});
</script>
<!-- 注意这里的 lang="scss"，并且没有 scoped -->
<style lang="scss">
@import "nutui-uniapp/styles/index.scss";

// ...
</style>
