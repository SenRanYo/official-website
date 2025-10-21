<template>
  <div class="view-container">
    <Banner />
    <News />
    <Topic />
    <Staff />
  </div>
</template>

<script setup lang="ts">
import Banner from "./components/Banner.vue"
import News from "./components/News.vue"
import Topic from "./components/Topic.vue"
import Staff from "./components/Staff.vue"
</script>

<style scoped lang="scss">
.view-container {
}
</style>
