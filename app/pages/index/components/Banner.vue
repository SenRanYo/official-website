<template>
  <div class="index-banner">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      :effect="'slide'"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      class="banner-swiper"
    >
      <SwiperSlide v-for="(item, index) in bannerData" :key="index">
        <img :src="item.image" :alt="`banner-${index}`" class="banner-image" />
        <div class="banner-content">
          <div class="banner-label">{{ item.label }}</div>
          <h2 class="banner-title">{{ item.title }}</h2>
          <p class="banner-description">{{ item.description }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

import banner1 from "~/assets/images/swiper/swiper-1.jpg"
import banner2 from "~/assets/images/swiper/swiper-2.jpg"
import banner3 from "~/assets/images/swiper/swiper-3.jpg"
import banner4 from "~/assets/images/swiper/swiper-4.jpg"
import banner5 from "~/assets/images/swiper/swiper-5.jpg"
import banner6 from "~/assets/images/swiper/swiper-6.jpg"

const modules = [Autoplay, Pagination]

const bannerData = [
  {
    image: banner1,
    label: '千字当头迎难而上 决胜"十四五"',
    title: "建设区域一流清洁低碳能源企业",
    description: "增强核心功能 提高核心竞争力",
  },
  {
    image: banner2,
    label: "绿色发展 和谐共生",
    title: "打造清洁能源标杆企业",
    description: "坚持可持续发展道路",
  },
  {
    image: banner3,
    label: "创新驱动 领先发展",
    title: "推进能源结构优化升级",
    description: "实现高质量发展目标",
  },
  {
    image: banner4,
    label: "担当社会责任",
    title: "服务国家能源战略",
    description: "为社会创造更大价值",
  },
  {
    image: banner5,
    label: "深化改革创新",
    title: "提升核心竞争力",
    description: "打造一流企业品牌",
  },
  {
    image: banner6,
    label: "合作共赢 互利发展",
    title: "共同描绘美好未来",
    description: "携手助力国家发展",
  },
]
</script>

<style scoped lang="scss">
@keyframes slideInContent {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

.index-banner {
  width: 100%;
  height: 600px;
  overflow: hidden;

  .banner-swiper {
    width: 100%;
    height: 100%;

    :deep(.swiper-slide) {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .banner-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .banner-content {
      position: absolute;
      left: 0;
      top: 50%;
      z-index: 10;
      color: #fff;
      max-width: 600px;
      padding: 0 60px;
      opacity: 0;
      transform: translateY(-50%) translateX(-50px);
      animation: slideInContent 0.8s ease-out 0.3s forwards;

      .banner-label {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.9;
        margin-bottom: 12px;
        letter-spacing: 0.5px;
      }

      .banner-title {
        font-size: 48px;
        font-weight: bold;
        line-height: 1.3;
        margin-bottom: 16px;
        margin-top: 0;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        padding-top: 2px;
        border-top: 2px solid #fff;
        white-space: nowrap;
      }

      .banner-description {
        font-size: 16px;
        font-weight: 500;
        opacity: 0.95;
        margin: 0;
        letter-spacing: 0.5px;
      }
    }

    :deep(.swiper-pagination-bullet) {
      background-color: rgba(255, 255, 255, 0.6);
      opacity: 1;
      transition: all 0.3s ease;
      width: 40px;
      height: 4px;
      border-radius: 2px;
      margin: 8px 0;
    }

    :deep(.swiper-pagination-bullet-active) {
      background-color: #108cf0;
      opacity: 1;
    }

    :deep(.swiper-pagination) {
      gap: 6px;
      left: 60px;
      right: auto;
      bottom: 150px;
      width: auto;
      display: flex;
      align-items: flex-start;
    }
  }
}
</style>
