<template>
  <div class="index-container">
    <div ref="swiperRef" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <IndexSwiperSlideOne></IndexSwiperSlideOne>
        </div>

        <div class="swiper-slide">
          <IndexSwiperSlideTwo></IndexSwiperSlideTwo>
        </div>

        <div class="swiper-slide">
          <IndexSwiperSlideThree></IndexSwiperSlideThree>
        </div>

        <div class="swiper-slide">4</div>
      </div>

      <!-- 分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import { Swiper } from "swiper"
import { Pagination, Navigation, EffectFade, Mousewheel } from "swiper/modules"

const swiper = ref<Swiper>()
const swiperRef = ref<HTMLElement>()

function initSwiper() {
  if (swiperRef.value) {
    swiper.value = new Swiper(swiperRef.value, {
      modules: [Pagination, Navigation, EffectFade, Mousewheel],
      direction: "vertical",
      mousewheel: { forceToAxis: true, releaseOnEdges: false },
      allowTouchMove: false,
      slidesPerView: 1,
      speed: 600,
      effect: "creative",
      creativeEffect: {
        prev: {
          translate: [0, "-100%", 0],
        },
        next: {
          translate: [0, "100%", 0],
        },
      },
      fadeEffect: { crossFade: true },
      pagination: { el: ".swiper-pagination", clickable: true },
    })
  }
}

onMounted(() => {
  initSwiper()
})
</script>

<style scoped lang="scss">
.index-container {
  width: 100vw;
  height: 100vh;
  .swiper {
    width: 100vw;
    height: 100vh;

    .swiper-slide {
      background-color: #fff;
    }
  }
  .swiper-pagination {
    right: 30px;
    :deep(.swiper-pagination-bullet) {
      width: 6px;
      height: 6px;
      margin: 24px 0;
      position: relative;
    }
    :deep(.swiper-pagination-bullet-active) {
      background-color: $primary-color;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid $primary-color;
      }
    }
  }
}
</style>
