<template>
  <div class="index-container" :style="{ transform: `translateY(${translateOffset})` }">
    <Swiper
      ref="swiperRef"
      :modules="modules"
      direction="vertical"
      :slides-per-view="1"
      :mousewheel="true"
      :keyboard="false"
      :simulate-touch="false"
      :resistance-ratio="0.85"
      :pagination="{ clickable: true, el: '.view-container__pagination' }"
      class="view-container__swiper"
      @swiper="onSwiperInit"
      @slide-change-transition-end="handleSlideChange"
    >
      <SwiperSlide class="view-container__slide">
        <Banner />
      </SwiperSlide>
      <SwiperSlide class="view-container__slide">
        <News />
      </SwiperSlide>
      <SwiperSlide class="view-container__slide">
        <Topic />
      </SwiperSlide>
      <SwiperSlide class="view-container__slide">
        <Staff />
      </SwiperSlide>
    </Swiper>

    <!-- Swiper 分页器容器 -->
    <div class="view-container__pagination"></div>
    <!-- Footer 容器 - 固定在底部 -->
    <div class="footer-wrapper" :style="{ bottom: `-${footerHeight}px` }">
      <Footer ref="footerRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from "~/utils/utils"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Mousewheel, Pagination } from "swiper/modules"
import { ref, onMounted, onUnmounted, computed, watch } from "vue"
import "swiper/css"
import "swiper/css/pagination"

import News from "./components/News.vue"
import Topic from "./components/Topic.vue"
import Staff from "./components/Staff.vue"
import Banner from "./components/Banner.vue"

// 配置 Swiper 模块

const modules = computed(() => [isFooter.value ? false : Mousewheel, Pagination])

let swiper: any = null
// Swiper 实例引用
const swiperRef = ref<any>(null)

// Footer 实例引用
const footerRef = ref<any>(null)

// 状态管理
const isFooter = ref(false)
const isEndSlide = ref(false)
const footerHeight = ref(0)

/**
 * 计算页面偏移量
 * 根据 isFooter 状态和 Footer 高度计算需要上移的距离
 */
const translateOffset = computed(() => {
  return isFooter.value ? `-${footerHeight.value}px` : "0"
})

const onSwiperInit = (s: any) => {
  swiper = s
}

/**
 * 处理 slide 变化事件
 * 当到达最后一页时更新状态
 */
const handleSlideChange = (e: any) => {
  isEndSlide.value = e.isEnd
}

/**
 * 处理鼠标滚轮事件，管理 Footer 显示/隐藏
 * @param event - 鼠标滚轮事件
 */
const handleWheel = (event: WheelEvent) => {
  // 如果 isFooter 为 true，阻止滚轮事件继续传播给 Swiper

  if (isEndSlide.value) {
    debounce(() => {
      const down = event.deltaY > 0
      if (down) {
        isFooter.value = down
        swiper.disable()
      } else {
        isFooter.value = down
        setTimeout(() => {
          swiper.enable()
        }, 300)
      }
    }, 100)
  }
}

/**
 * 获取 Footer 高度
 */
const getFooterHeight = () => {
  if (footerRef.value?.$el) {
    footerHeight.value = footerRef.value.$el.offsetHeight
  }
}

/**
 * 挂载时绑定滚轮事件并获取 Footer 高度
 */
onMounted(() => {
  window.addEventListener("wheel", handleWheel, { passive: false })
  // 等待 DOM 渲染完成后获取高度
  setTimeout(() => {
    getFooterHeight()
  }, 100)
})

/**
 * 卸载时移除滚轮事件
 */
onUnmounted(() => {
  window.removeEventListener("wheel", handleWheel)
})

/**
 * 监听窗口大小变化，重新计算 Footer 高度
 */
watch(
  () => window.innerHeight,
  () => {
    getFooterHeight()
  },
)
</script>

<style scoped lang="scss">
// 主容器块
.index-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  // Swiper 容器元素 - 短规则
  .view-container__swiper {
    width: 100%;
    height: 100%;

    // 轮播页幻灯片项 - 中等规则
    .view-container__slide {
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

      // 自定义滚动条宽度 - 短规则
      &::-webkit-scrollbar {
        width: 8px;
      }

      // 滚动条轨道 - 短规则
      &::-webkit-scrollbar-track {
        background: transparent;
      }

      // 滚动条滑块 - 中等规则
      &::-webkit-scrollbar-thumb {
        background: #c0c0c0;
        border-radius: 4px;

        &:hover {
          background: #909090;
        }
      }
    }
  }

  // 分页器容器元素 - 较长规则
  .view-container__pagination {
    top: 50%;
    right: 60px;
    z-index: 20;
    gap: 20px;
    width: 50px;
    display: flex;
    opacity: 0.3;
    position: fixed;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transform: translateY(-50%);
    // Swiper 分页符号 - 未激活态 - 短规则
    :deep(.swiper-pagination-bullet) {
      width: 12px;
      height: 12px;
      margin: 0;
      opacity: 1;
      flex-shrink: 0;
      border-radius: 50%;
      border: 2px solid #108cf0;
      background-color: transparent;
      transition: all 0.3s ease;
    }

    // Swiper 分页符号 - 激活态 - 短规则
    :deep(.swiper-pagination-bullet-active) {
      width: 20px;
      height: 20px;
      border-color: #108cf0;
      background-color: #108cf0;
    }
  }
}

// Footer 容器 - 较长规则
.footer-wrapper {
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  bottom: -100%;
  position: absolute;
}
</style>
