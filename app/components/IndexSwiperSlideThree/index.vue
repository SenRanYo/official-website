<template>
  <div class="index-swiper-slide-three">
    <p class="title">专题聚焦</p>
    <div class="content">
      <div class="content-item">
        <img :src="banner1" alt="" />
      </div>
      <div class="content-item">
        <img :src="banner1" alt="" />
      </div>
      <div class="content-item">
        <img :src="banner1" alt="" />
      </div>
      <div class="content-item">
        <img :src="banner1" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import banner1 from "~/assets/images/banner1.jpg"
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
      height: 220px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
