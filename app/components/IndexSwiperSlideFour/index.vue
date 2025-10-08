<template>
  <div class="index-swiper-slide-four">
    <div class="caursel3d-container">
      <div class="caursel3d">
        <div class="caursel">
          <figure v-for="(item, index) in items" :key="index" class="caursel-item">
            <img class="item-img" :src="item" alt="" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import swiper1 from "~/assets/images/swiper/swiper-1.jpg"
import swiper2 from "~/assets/images/swiper/swiper-2.jpg"
import swiper3 from "~/assets/images/swiper/swiper-3.jpg"
import swiper4 from "~/assets/images/swiper/swiper-4.jpg"
import swiper5 from "~/assets/images/swiper/swiper-5.jpg"
import swiper6 from "~/assets/images/swiper/swiper-6.jpg"

const items = ref([swiper1, swiper2, swiper3, swiper4, swiper5, swiper6, swiper4, swiper5])
</script>

<style scoped lang="scss">
.index-swiper-slide-four {
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  background-image: url("~/assets/images/bg_3d.png");
  background-repeat: no-repeat;
  background-position: center;
  .caursel3d-container {
    width: 100%;
    height: 600px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    .caursel3d {
      width: 400px;
      height: 250px;
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
      }
      .caursel-item {
        top: 10px;
        left: 10px;
        margin: 0;
        width: 300px;
        display: block;
        height: 200px;
        overflow: hidden;
        position: absolute;
        &:nth-child(1) {
          transform: rotateY(0deg) translateZ(450px);
        }
        &:nth-child(2) {
          transform: rotateY(45deg) translateZ(450px);
        }
        &:nth-child(3) {
          transform: rotateY(90deg) translateZ(450px);
        }
        &:nth-child(4) {
          transform: rotateY(135deg) translateZ(450px);
        }
        &:nth-child(5) {
          transform: rotateY(180deg) translateZ(450px);
        }
        &:nth-child(6) {
          transform: rotateY(225deg) translateZ(450px);
        }
        &:nth-child(7) {
          transform: rotateY(270deg) translateZ(450px);
        }
        &:nth-child(8) {
          transform: rotateY(315deg) translateZ(450px);
        }
        .item-img {
          width: 100%;
          height: 100%;
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
</style>
