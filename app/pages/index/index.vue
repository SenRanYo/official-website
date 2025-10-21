<template>
  <div class="view-container">
    <Swiper
      :modules="modules"
      direction="vertical"
      :slides-per-view="1"
      :mousewheel="true"
      :keyboard="false"
      :simulate-touch="false"
      :resistance-ratio="0.85"
      class="swiper-container"
    >
      <SwiperSlide class="slide-item">
        <Banner />
      </SwiperSlide>
      <SwiperSlide class="slide-item">
        <News />
      </SwiperSlide>
      <SwiperSlide class="slide-item">
        <Topic />
      </SwiperSlide>
      <SwiperSlide class="slide-item">
        <Staff />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import { Mousewheel } from "swiper/modules"
import "swiper/css"

import News from "./components/news.vue"
import Topic from "./components/topic.vue"
import Staff from "./components/staff.vue"
import Banner from "./components/banner.vue"

// 配置 Swiper 模块：启用鼠标滚轮模块
const modules = [Mousewheel]
</script>

<style scoped lang="scss">
.view-container {
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  overflow: hidden;
  flex-direction: column;

  .swiper-container {
    width: 100%;
    height: 100%;

    .slide-item {
      height: calc(100vh - 80px);
      display: flex;
      justify-content: center;
    }

    // 每个 slide 占满整个视口高度
    :deep(.swiper-slide) {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow-y: auto;

      // 禁用内容滚动时的弹跳效果
      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: #c0c0c0;
        border-radius: 4px;

        &:hover {
          background: #909090;
        }
      }
    }
  }
}
</style>
