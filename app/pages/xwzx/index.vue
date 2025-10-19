<template>
  <div class="xwzx-page">
    <Description text="新闻中心" :image="image" />
    <Tabs v-model="activeTab" :list="tabs" />
  </div>
</template>

<script setup lang="ts">
import Tabs from "./components/tabs.vue"
import image from "~/assets/images/swiper/swiper-4.jpg"

const activeTab = ref("gsyw")
const tabs = ref<any[]>([
  { title: "公司要闻", value: "gsyw" },
  { title: "公司动态", value: "gsdt" },
  { title: "公司公告", value: "gsgg" },
  { title: "媒体聚焦", value: "mtjj" },
  { title: "专题聚焦", value: "ztjj" },
])
</script>

<style scoped lang="scss"></style>
