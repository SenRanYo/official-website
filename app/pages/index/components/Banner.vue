<template>
  <div class="index-banner">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      :effect="'slide'"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      class="index-banner__swiper"
    >
      <SwiperSlide v-for="(item, index) in bannerData" :key="index">
        <img :src="item.image" :alt="`banner-${index}`" class="index-banner__image" />
        <div class="index-banner__content">
          <div class="index-banner__label">{{ item.label }}</div>
          <h2 class="index-banner__title">{{ item.title }}</h2>
          <p class="index-banner__description">{{ item.description }}</p>
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
// 动画定义
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

// 块容器
.index-banner {
  width: 100%;
  height: 100%;
  overflow: hidden;

  // Swiper 容器元素
  .index-banner__swiper {
    width: 100%;
    height: 100%;

    // 图片元素 - 短规则
    .index-banner__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    // Swiper 分页符号 - 中等长度规则
    :deep(.swiper-pagination-bullet) {
      width: 40px;
      height: 4px;
      gap: 6px;
      margin: 8px 0;
      opacity: 1;
      border-radius: 2px;
      background-color: rgba(255, 255, 255, 0.6);
      transition: all 0.3s ease;
    }

    // Swiper 分页活跃状态 - 短规则
    :deep(.swiper-pagination-bullet-active) {
      opacity: 1;
      background-color: #108cf0;
    }

    // 内容容器元素 - 长规则
    .index-banner__content {
      left: 0;
      top: 50%;
      z-index: 10;
      color: #fff;
      opacity: 0;
      padding: 0 60px;
      max-width: 600px;
      position: absolute;
      transform: translateY(-50%);
      animation: slideInContent 0.8s ease-out 0.3s forwards;

      // 标签元素 - 中等长度
      .index-banner__label {
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: 500;
        opacity: 0.9;
        letter-spacing: 0.5px;
      }

      // 标题元素 - 较长规则
      .index-banner__title {
        margin-top: 0;
        margin-bottom: 16px;
        padding-top: 2px;
        font-size: 56px;
        font-weight: bold;
        line-height: 1.3;
        white-space: nowrap;
        border-top: 2px solid #fff;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }

      // 描述元素 - 中等长度
      .index-banner__description {
        margin: 0;
        font-size: 20px;
        font-weight: 500;
        opacity: 0.95;
        letter-spacing: 0.5px;
      }
    }

    // Swiper 分页容器 - 中等长度规则
    :deep(.swiper-pagination) {
      gap: 6px;
      top: 50%;
      left: 60px;
      right: auto;
      width: auto;
      display: flex;
      height: fit-content;
      margin-top: 130px;
      align-items: flex-start;
      transform: translateY(-50%);
    }
  }
}
</style>
