<template>
  <div class="index-container" :style="{ transform: showFooter ? `translateY(${-footerHeight}px)` : 'translateY(0)' }">
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
    <LayoutFooter ref="footerRef"></LayoutFooter>
  </div>
</template>

<script setup lang="ts">
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import { Swiper } from "swiper"
import { useElementBounding } from "@vueuse/core"

definePageMeta({ layout: "home" })

const swiper = ref<Swiper>()
const swiperRef = ref<HTMLElement>()
const swiperIndex = ref<number>(0)
const showFooter = ref<boolean>(false)

const swiperSlideTwoRef = ref()
const swiperSlideThreeRef = ref()
const swiperSlideFourRef = ref()

const footerRef = ref<HTMLElement>()
const { height: footerHeight } = useElementBounding(footerRef)

// 监听footer状态变化，控制动画状态
watch(showFooter, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    isFooterAnimating = true
    // 300ms后动画结束（与CSS transition时间一致）
    setTimeout(() => {
      isFooterAnimating = false
    }, 300)
  }
})

// 轮播图动画状态控制
let isAnimating = false
// Footer动画状态控制
let isFooterAnimating = false

function initSwiper() {
  if (swiperRef.value) {
    swiper.value = new Swiper(swiperRef.value, {
      direction: "vertical",
      allowTouchMove: false, // 禁用手动滑动
      allowSlideNext: true,
      allowSlidePrev: true,
      on: {
        slideChangeTransitionStart: () => {
          isAnimating = true
        },
        slideChangeTransitionEnd: () => {
          isAnimating = false
        },
        slideChange: (swiper) => {
          swiperIndex.value = swiper.realIndex

          // 如果不在最后一页，隐藏footer
          const totalSlides = swiper.slides.length
          if (swiper.realIndex < totalSlides - 1) {
            showFooter.value = false
          }

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

// 鼠标滚轮事件处理函数
function handleWheel(event: WheelEvent) {
  event.preventDefault()

  // 如果轮播图或footer正在动画中，则忽略滚轮事件
  if (isAnimating || isFooterAnimating || !swiper.value) {
    return
  }

  const totalSlides = swiper.value.slides.length
  const isLastSlide = swiperIndex.value === totalSlides - 1
  const isFirstSlide = swiperIndex.value === 0

  if (event.deltaY > 0) {
    // 向下滚动
    if (isLastSlide && !showFooter.value) {
      // 在最后一页且footer未显示，显示footer
      showFooter.value = true
    } else if (!isLastSlide) {
      // 不在最后一页，切换到下一张
      swiper.value.slideNext()
    }
    // 如果在最后一页且footer已显示，不做任何操作
  } else if (event.deltaY < 0) {
    // 向上滚动
    if (showFooter.value) {
      // 如果footer正在显示，只隐藏footer，不滚动轮播图
      showFooter.value = false
    } else if (!isFirstSlide) {
      // footer未显示且不在第一页，切换到上一张
      swiper.value.slidePrev()
    }
    // 如果footer未显示且在第一页，不做任何操作
  }
}

onMounted(() => {
  initSwiper()

  // 添加鼠标滚轮事件监听器
  if (swiperRef.value) {
    swiperRef.value.addEventListener("wheel", handleWheel, { passive: false })
  }
})

onUnmounted(() => {
  // 清理事件监听器
  if (swiperRef.value) {
    swiperRef.value.removeEventListener("wheel", handleWheel)
  }
})
</script>

<style scoped lang="scss">
.index-container {
  flex: 1;
  width: 100vw;
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  transition: all 0.3s ease;
  &.show-footer {
    transform: translateY(100px);
  }
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
