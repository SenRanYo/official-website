<template>
  <div class="index-swiper-container">
    <div ref="swiperContainer" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="slide-content" :style="{ backgroundImage: `url(${banner1})` }"></div>
        </div>

        <div class="swiper-slide">
          <div class="slide-content" :style="{ backgroundImage: `url(${banner2})` }"></div>
        </div>

        <div class="swiper-slide">
          <div class="slide-content" :style="{ backgroundImage: `url(${banner3})` }"></div>
        </div>

        <div class="swiper-slide">
          <div class="slide-content" :style="{ backgroundImage: `url(${banner4})` }"></div>
        </div>
      </div>

      <!-- <div class="swiper-pagination"></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import banner1 from "~/assets/images/banner1.jpg"
import banner2 from "~/assets/images/banner2.jpg"
import banner3 from "~/assets/images/banner3.jpg"
import banner4 from "~/assets/images/banner4.jpg"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import { Swiper } from "swiper"
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules"

const swiperContainer = ref<HTMLElement>()
let swiperInstance: Swiper | null = null

onMounted(() => {
  if (swiperContainer.value) {
    swiperInstance = new Swiper(swiperContainer.value, {
      modules: [Pagination, Navigation, EffectFade, Autoplay],
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 300000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,
      speed: 1000,
    })
  }
})

onUnmounted(() => {
  if (swiperInstance) {
    swiperInstance.destroy()
  }
})
</script>

<style scoped>
.index-swiper-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
}

.slide-content {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-size: 100% 100%;
  background-position: center;
}

.slide-overlay {
  text-align: center;
  color: white;
  z-index: 2;
  padding: 2rem;
}

.slide-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.slide-description {
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Swiper 导航样式 */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-top: -25px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

:deep(.swiper-button-next):hover,
:deep(.swiper-button-prev):hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 18px;
}

/* 分页器样式 */
:deep(.swiper-pagination) {
  bottom: 20px;
}

:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
  width: 12px;
  height: 12px;
  margin: 0 6px;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: white;
  transform: scale(1.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .index-swiper-container {
    height: 400px;
  }

  .slide-title {
    font-size: 2rem;
  }

  .slide-description {
    font-size: 1rem;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    width: 40px;
    height: 40px;
    margin-top: -20px;
  }

  :deep(.swiper-button-next::after),
  :deep(.swiper-button-prev::after) {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .index-swiper-container {
    height: 300px;
  }

  .slide-title {
    font-size: 1.5rem;
  }

  .slide-description {
    font-size: 0.9rem;
  }

  .slide-overlay {
    padding: 1rem;
  }
}
</style>
