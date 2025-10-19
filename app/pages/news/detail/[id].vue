<template>
  <div class="view-container">
    <Description text="新闻中心" :image="image" />
  </div>
</template>

<script setup lang="ts">
import Tabs from "./components/tabs.vue"
import image from "~/assets/images/news-bg.webp"

const route = useRoute()
console.log(route)
</script>

<style scoped lang="scss">
.view-container {
}
</style>
