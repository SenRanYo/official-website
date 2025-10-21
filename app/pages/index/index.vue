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
      :pagination="{ clickable: true, el: '.view-container__pagination' }"
      class="view-container__swiper"
    >
      <SwiperSlide class="view-container__slide-item">
        <Banner />
      </SwiperSlide>
      <SwiperSlide class="view-container__slide-item">
        <News />
      </SwiperSlide>
      <SwiperSlide class="view-container__slide-item">
        <Topic />
      </SwiperSlide>
      <SwiperSlide class="view-container__slide-item">
        <Staff />
      </SwiperSlide>
    </Swiper>

    <!-- Swiper 分页器容器 -->
    <div class="view-container__pagination"></div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import { Mousewheel, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

import News from "./components/news.vue"
import Topic from "./components/topic.vue"
import Staff from "./components/staff.vue"
import Banner from "./components/banner.vue"

// 配置 Swiper 模块
const modules = [Mousewheel, Pagination]
</script>

<style scoped lang="scss">
.view-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  overflow: hidden;
  flex-direction: column;

  // Swiper 容器 - 短规则
  .view-container__swiper {
    width: 100%;
    height: 100%;

    // 幻灯片项 - 中等规则
    .view-container__slide-item {
      height: calc(100vh - 80px);
      display: flex;
      justify-content: center;
    }

    // 每个 slide 占满整个视口高度 - 较长规则
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

  // 分页器容器 - 中等规则
  .view-container__pagination {
    top: 50%;
    gap: 20px;
    width: 50px;
    right: 60px;
    z-index: 20;
    opacity: 0.3;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transform: translateY(-50%);

    // 分页圆点 - 未激活态
    :deep(.swiper-pagination-bullet) {
      width: 12px;
      height: 12px;
      margin: 0;
      opacity: 1;
      background-color: transparent;
      border: 2px solid #108cf0;
      border-radius: 50%;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    // 分页圆点 - 激活态
    :deep(.swiper-pagination-bullet-active) {
      width: 20px;
      height: 20px;
      background-color: #108cf0;
      border-color: #108cf0;
    }
  }
}
</style>
