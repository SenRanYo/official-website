<template>
  <div class="index-staff">
    <div class="index-staff__top">
      <div class="top-left">
        <div class="title-section">
          <p class="title-en">In Focus</p>
          <h2 class="title-cn">职工风采</h2>
        </div>
      </div>
      <div class="top-right"></div>
    </div>
    <div class="index-staff__bottom">
      <div class="caursel3d-container">
        <div class="caursel3d">
          <div class="caursel" :class="{ paused: isHovered }" @mouseenter="pauseRotation" @mouseleave="resumeRotation">
            <figure v-for="(item, index) in items" :key="index" class="caursel-item">
              <img class="item-img" :src="item" alt="" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import swiper1 from "~/assets/images/swiper/swiper-1.jpg"
import swiper2 from "~/assets/images/swiper/swiper-2.jpg"
import swiper3 from "~/assets/images/swiper/swiper-3.jpg"
import swiper4 from "~/assets/images/swiper/swiper-4.jpg"
import swiper5 from "~/assets/images/swiper/swiper-5.jpg"
import swiper6 from "~/assets/images/swiper/swiper-6.jpg"

const items = ref([swiper1, swiper2, swiper3, swiper4, swiper5, swiper6, swiper4, swiper5])
const isHovered = ref(false)

const pauseRotation = () => {
  isHovered.value = true
}

const resumeRotation = () => {
  isHovered.value = false
}
</script>

<style scoped lang="scss">
.index-staff {
  gap: 15px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top-left {
      .title-section {
        display: flex;
        flex-direction: column;
        .title-en {
          font-size: 20px;
          line-height: 0;
          color: #e5e5e5;
          margin-bottom: 10px;
        }

        .title-cn {
          color: #1f2937;
          font-size: 24px;
          line-height: 0;
          font-weight: bold;
        }
      }
    }

    .top-right {
      .tabs {
        gap: 20px;
        display: flex;

        .tab-item {
          font-size: 14px;
          color: #1f2937;
          font-weight: 500;
          cursor: pointer;
          padding: 5px;
          transition: color 0.3s ease;

          &:hover,
          &.active {
            color: #108cf0;
          }
        }
      }
    }
  }

  &__bottom {
    gap: 30px;
    height: 400px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-size: 90% 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("~/assets/images/bg_3d.png");

    .caursel3d-container {
      width: 100%;
      height: 100%;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;

      .caursel3d {
        width: 330px;
        height: 210px;
        margin: 0 auto;
        position: relative;
        perspective: 2100px;

        .caursel {
          width: 100%;
          height: 100%;
          margin: auto;
          position: absolute;
          transform-style: preserve-3d;
          animation-duration: 30s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-name: rotation;

          &.paused {
            animation-play-state: paused;
          }
        }

        .caursel-item {
          top: 10px;
          left: 10px;
          margin: 0;
          width: 250px;
          display: block;
          height: 170px;
          overflow: hidden;
          position: absolute;

          &:nth-child(1) {
            transform: rotateY(0deg) translateZ(370px);
          }
          &:nth-child(2) {
            transform: rotateY(45deg) translateZ(370px);
          }
          &:nth-child(3) {
            transform: rotateY(90deg) translateZ(370px);
          }
          &:nth-child(4) {
            transform: rotateY(135deg) translateZ(370px);
          }
          &:nth-child(5) {
            transform: rotateY(180deg) translateZ(370px);
          }
          &:nth-child(6) {
            transform: rotateY(225deg) translateZ(370px);
          }
          &:nth-child(7) {
            transform: rotateY(270deg) translateZ(370px);
          }
          &:nth-child(8) {
            transform: rotateY(315deg) translateZ(370px);
          }

          .item-img {
            width: 100%;
            height: 100%;
            transition: transform 0.3s ease;
            cursor: pointer;

            &:hover {
              transform: scale(1.1);
            }
          }
        }

        @keyframes rotation {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(-360deg);
          }
        }
      }
    }
  }
}
</style>
