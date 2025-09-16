<template>
  <div class="index-container">
    <div ref="swiperRef" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <IndexSwiperSlideOne></IndexSwiperSlideOne>
        </div>

        <div class="swiper-slide" @click="onClickTest">
          <IndexSwiperSlideTwo ref="swiperSlideTwoRef"></IndexSwiperSlideTwo>
        </div>

        <div class="swiper-slide">
          <IndexSwiperSlideThree ref="swiperSlideThreeRef"></IndexSwiperSlideThree>
        </div>

        <div class="swiper-slide">
          <IndexSwiperSlideFour ref="swiperSlideFourRef"></IndexSwiperSlideFour>
        </div>

        <div class="swiper-slide">
          <IndexSwiperSlideFive ref="swiperSlideFiveRef"></IndexSwiperSlideFive>
        </div>
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

definePageMeta({ layout: "home" })

const swiper = ref<Swiper>()
const swiperRef = ref<HTMLElement>()

const swiperSlideTwoRef = ref()
const swiperSlideThreeRef = ref()
const swiperSlideFourRef = ref()

function initSwiper() {
  if (swiperRef.value) {
    swiper.value = new Swiper(swiperRef.value, {
      modules: [Pagination, Navigation, EffectFade, Mousewheel],
      direction: "vertical",
      mousewheel: { forceToAxis: true, releaseOnEdges: false },
      allowTouchMove: false,
      slidesPerView: 1,
      speed: 600,
      fadeEffect: { crossFade: true },
      pagination: { el: ".swiper-pagination", clickable: true },
      on: {
        slideChange: (swiper) => {
          swiperSlideTwoRef.value.leave()
          swiperSlideThreeRef.value.leave()
          swiperSlideFourRef.value.leave()
          switch (swiper.realIndex) {
            case 1:
              setTimeout(() => {
                swiperSlideTwoRef.value.enter()
              }, 200)
              break
            case 2:
              setTimeout(() => {
                swiperSlideThreeRef.value.enter()
              }, 200)
              break
            case 3:
              setTimeout(() => {
                swiperSlideFourRef.value.enter()
              }, 200)
              break

            default:
              break
          }
        },
      },
    })
  }
}

function onClickTest() {
  swiperSlideTwoRef.value.enter()
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
