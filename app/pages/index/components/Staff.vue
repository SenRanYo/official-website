<template>
  <div class="index-staff-wrapper">
    <div class="index-staff">
      <div class="index-staff__top">
        <div class="index-staff__top--left">
          <div class="index-staff__title-section">
            <p class="index-staff__title-en">In Focus</p>
            <h2 class="index-staff__title-cn">职工风采</h2>
          </div>
        </div>
        <div class="index-staff__top--right"></div>
      </div>
      <div class="index-staff__bottom">
        <div class="index-staff__carousel-container">
          <div class="index-staff__carousel-3d">
            <div class="index-staff__carousel" :class="{ 'index-staff__carousel--paused': isHovered }" @mouseenter="pauseRotation" @mouseleave="resumeRotation">
              <figure v-for="(item, index) in items" :key="index" class="index-staff__carousel-item">
                <img class="index-staff__carousel-img" :src="item" alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { blockItem } from "~/api"
import { buildFullUrl } from "~/utils/utils"

const items = ref<string[]>([])
const isHovered = ref(false)

/**
 * 暂停3D轮播旋转
 */
const pauseRotation = () => {
  isHovered.value = true
}

/**
 * 恢复3D轮播旋转
 */
const resumeRotation = () => {
  isHovered.value = false
}

/**
 * 获取职工风采数据
 */
const fetchStaffData = async () => {
  try {
    const response = await blockItem({ block: "zhigongfengcai" })
    // 处理返回的数据，提取图片URL并进行完整URL拼接
    items.value = (response || []).map((item: any) => buildFullUrl(item.image))
    console.log("🚀 ~ fetchStaffData ~ items.value:", items.value)
  } catch (error) {
    console.error("Failed to fetch staff data:", error)
    items.value = []
  }
}

onMounted(() => {
  fetchStaffData()
})
</script>

<style scoped lang="scss">
// 3D旋转动画
@keyframes rotation {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(-360deg);
  }
}

// 最外层容器
.index-staff-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
}

// 块容器 - 主容器
.index-staff {
  gap: 15px;
  width: 100%;
  padding: 80px 160px;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  // 顶部区域
  .index-staff__top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    // 顶部左侧 - 标题部分
    .index-staff__top--left {
      .index-staff__title-section {
        display: flex;
        flex-direction: column;

        // 英文标题 - 短规则
        .index-staff__title-en {
          color: #e5e5e5;
          font-size: 27px;
          line-height: 0;
          font-weight: bold;
          margin-bottom: 13px;
        }

        // 中文标题 - 短规则
        .index-staff__title-cn {
          color: #1f2937;
          font-size: 32px;
          font-weight: bold;
        }
      }
    }
  }

  // 底部区域 - 中等规则
  .index-staff__bottom {
    gap: 30px;
    height: 500px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-size: 90% 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("~/assets/images/bg_3d.png");

    // 轮播容器 - 中等规则
    .index-staff__carousel-container {
      width: 100%;
      height: 100%;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;

      // 3D 旋转容器 - 中等规则
      .index-staff__carousel-3d {
        width: 440px;
        height: 280px;
        margin: 0 auto;
        position: relative;
        perspective: 2100px;

        // 轮播容器 - 中等规则
        .index-staff__carousel {
          width: 100%;
          height: 100%;
          margin: auto;
          position: absolute;
          transform-style: preserve-3d;
          animation-duration: 30s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-name: rotation;

          // 暂停状态
          &.index-staff__carousel--paused {
            animation-play-state: paused;
          }

          // 轮播项 - 较长规则
          .index-staff__carousel-item {
            top: 10px;
            left: 10px;
            margin: 0;
            width: 333px;
            height: 227px;
            display: block;
            overflow: hidden;
            position: absolute;

            &:nth-child(1) {
              transform: rotateY(0deg) translateZ(493px);
            }
            &:nth-child(2) {
              transform: rotateY(45deg) translateZ(493px);
            }
            &:nth-child(3) {
              transform: rotateY(90deg) translateZ(493px);
            }
            &:nth-child(4) {
              transform: rotateY(135deg) translateZ(493px);
            }
            &:nth-child(5) {
              transform: rotateY(180deg) translateZ(493px);
            }
            &:nth-child(6) {
              transform: rotateY(225deg) translateZ(493px);
            }
            &:nth-child(7) {
              transform: rotateY(270deg) translateZ(493px);
            }
            &:nth-child(8) {
              transform: rotateY(315deg) translateZ(493px);
            }

            // 图片元素 - 中等规则
            .index-staff__carousel-img {
              width: 100%;
              height: 100%;
              cursor: pointer;
              transition: transform 0.3s ease;
              object-fit: cover;

              &:hover {
                transform: scale(1.1);
              }
            }
          }
        }
      }
    }
  }
}
</style>
