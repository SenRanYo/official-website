<template>
  <div class="banner" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
    <div class="carousel-container">
      <img v-for="(image, index) in bannerImages" :key="index" :src="image.src" :alt="image.alt" class="carousel-image" :class="{ active: currentIndex === index }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import banner from "~/assets/images/banner.png"
import banner1 from "~/assets/images/banner-1.jpg"
import banner2 from "~/assets/images/banner-2.jpg"
import banner3 from "~/assets/images/banner-3.jpg"

// 轮播图数据
const bannerImages = [
  { src: banner, alt: "轮播图 0" },
  { src: banner1, alt: "轮播图 1" },
  { src: banner2, alt: "轮播图 2" },
  { src: banner3, alt: "轮播图 3" },
]

// 当前显示的图片索引
const currentIndex = ref(0)
let intervalId: NodeJS.Timeout | null = null

// 下一张图片
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % bannerImages.length
}

// 开始自动轮播
const startAutoPlay = () => {
  intervalId = setInterval(nextSlide, 4000) // 每4秒切换一次
}

// 停止自动轮播
const stopAutoPlay = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// 组件挂载时开始自动轮播
onMounted(() => {
  startAutoPlay()
})

// 组件卸载时清理定时器
onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  height: 310px;
  position: relative;
  overflow: hidden;
  border: 1px solid green;

  .carousel-container {
    width: 100%;
    height: 100%;
    position: relative;

    .carousel-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
      opacity: 0;
      transition: opacity 0.8s ease-in-out;

      &.active {
        opacity: 1;
      }
    }

    .indicators {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;

      .indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: rgba(255, 255, 255, 0.8);
        }

        &.active {
          background-color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>
