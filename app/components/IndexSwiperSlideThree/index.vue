<template>
  <div class="index-swiper-slide-three">
    <p class="title">专题聚焦</p>
    <div class="content">
      <div class="content-item" :class="{ 'item-visible': isVisible }">
        <img :src="swiper1" alt="" />
      </div>
      <div class="content-item" :class="{ 'item-visible': isVisible }">
        <img :src="swiper2" alt="" />
      </div>
      <div class="content-item" :class="{ 'item-visible': isVisible }">
        <img :src="swiper3" alt="" />
      </div>
      <div class="content-item" :class="{ 'item-visible': isVisible }">
        <img :src="swiper4" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import swiper1 from "~/assets/images/swiper/swiper-1.jpg"
import swiper2 from "~/assets/images/swiper/swiper-2.jpg"
import swiper3 from "~/assets/images/swiper/swiper-3.jpg"
import swiper4 from "~/assets/images/swiper/swiper-6.jpg"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import { Swiper } from "swiper"
import { Pagination, Navigation, EffectFade, Mousewheel } from "swiper/modules"

const swiper = ref<Swiper>()
const swiperRef = ref<HTMLElement>()

// 控制动画状态的响应式变量
const isVisible = ref(false)

// 进入时触发动画
function enter() {
  isVisible.value = true
}

// 离开时重置动画
function leave() {
  isVisible.value = false
}

function initSwiper() {
  if (swiperRef.value) {
    swiper.value = new Swiper(swiperRef.value, {
      modules: [Pagination, Navigation, EffectFade, Mousewheel],
      mousewheel: { forceToAxis: true, releaseOnEdges: false },
      slidesPerView: 1,
      speed: 600,
      pagination: { el: ".swiper-pagination", clickable: true },
    })
  }
}

onMounted(() => {
  initSwiper()
})

// 导出方法供父组件调用
defineExpose({
  enter,
  leave,
})
</script>

<style scoped lang="scss">
.index-swiper-slide-three {
  height: 100%;
  display: flex;
  padding: 0 12.5%;
  padding-top: 120px;
  flex-direction: column;
  background-color: #f8f9fa;

  .title {
    font-size: 24px;
    color: $primary-color;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60px;
  }

  .content {
    gap: 50px;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);

    .content-item {
      width: 100%;
      height: 30vh;
      overflow: hidden;
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease-out;

      &:nth-child(1) {
        transition-delay: 0.1s;
      }

      &:nth-child(2) {
        transition-delay: 0.2s;
      }

      &:nth-child(3) {
        transition-delay: 0.3s;
      }

      &:nth-child(4) {
        transition-delay: 0.4s;
      }

      &.item-visible {
        opacity: 1;
        transform: translateY(0);
      }

      img {
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
}
</style>
