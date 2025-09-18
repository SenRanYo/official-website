<template>
  <div class="index-swiper-slide-five">
    <p class="section-title">专题专栏</p>
    <div class="top-swiper">
      <swiper :slides-per-view="3" :space-between="90" :loop="true" :autoplay="true" :speed="1500" :centered-slides="true" :modules="topSwiperModules">
        <swiper-slide>
          <img :src="img" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img :src="img" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img :src="img" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img :src="img" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img :src="img" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img :src="img" alt="" />
        </swiper-slide>
      </swiper>
    </div>
    <p class="section-title">奋斗华电人</p>
    <div ref="bottomSwiperRef" class="bottom-swiper">
      <swiper
        :slides-per-view="4.5"
        :space-between="20"
        :loop="true"
        :autoplay="{
          delay: 4000,
          disableOnInteraction: true,
        }"
        :speed="1000"
        :effect="'coverflow'"
        :centered-slides="true"
        :coverflow-effect="{ rotate: 30, stretch: 15, depth: 0, modifier: 1, slideShadows: false }"
        :modules="bottomSwiperModules"
        @slide-change="onBottomSwiperSlideChange"
      >
        <swiper-slide v-for="(item, index) in 9" :key="index">
          <img :src="img" alt="" />
          <div v-if="bottomSwiperIndex === index" class="slide-text">我是内容</div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import img from "~/assets/images/banner1.jpg"
import "swiper/css"
import type { Swiper as SwiperType } from "swiper/types"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, EffectCoverflow } from "swiper/modules"

const bottomSwiperRef = ref<HTMLElement>()
const bottomSwiperIndex = ref<number>(-1)

const topSwiperModules = [Autoplay]
const bottomSwiperModules = [Autoplay, EffectCoverflow]

function onBottomSwiperSlideChange(swiper: SwiperType) {
  bottomSwiperIndex.value = swiper.realIndex
}
</script>

<style scoped lang="scss">
.index-swiper-slide-five {
  height: 100%;
  display: flex;
  padding: 0 12.5%;
  overflow: hidden;
  padding-top: 120px;
  flex-direction: column;
  background-color: #f8f9fa;

  .section-title {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    position: relative;
    margin-bottom: 20px;
    &::before {
      content: "";
      width: 30px;
      height: 2px;
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #007bff;
    }
  }

  .top-swiper {
    width: 100%;
    overflow: hidden;
    .swiper {
      width: 100%;
      height: 100%;
      padding: 30px 20px;
      overflow: visible;

      .swiper-slide {
        width: 310px;
        height: 164px;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        border-radius: 12px;
        transform: scale(1);
        background-color: #fff;
        transition: all 0.3s ease;

        &.swiper-slide-active {
          z-index: 2;
          transform: scale(1.2);
        }

        &:hover {
          transform: scale(1.2);
        }

        &.swiper-slide-active:hover {
          transform: scale(1.2);
        }

        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
          overflow: hidden;
          object-fit: cover;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .slide-caption {
          width: 100%;
          position: absolute;
          bottom: 0;
          z-index: 99;
          height: 50px;
          font-size: 18px;
          background: rgba(0, 80, 165, 0.7);
          padding-left: 30px;
          display: flex;
          color: #fff;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }

  .bottom-swiper {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;

    .swiper {
      width: 100%;
      height: 100%;
      padding: 30px 20px;
      overflow: visible;

      .swiper-slide {
        cursor: pointer;
        overflow: hidden;
        position: relative;
        transform: scale(1);

        &.swiper-slide-active {
          z-index: 2;
          padding: 8px;
          transform: scale(1.1);
          background-color: $primary-color;
          transition: background-color 0.3s ease;
        }

        &:hover {
          transform: scale(1.1);
        }

        img {
          width: 100%;
          height: 170px;
          cursor: pointer;
          overflow: hidden;
          object-fit: cover;
        }

        .slide-text {
          color: #fff;
          padding: 8px 0;
        }
      }
    }
  }
}
</style>
