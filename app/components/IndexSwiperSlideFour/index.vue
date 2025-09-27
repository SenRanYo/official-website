<template>
  <div class="staff-gallery">
    <!-- 标题区域 -->
    <div class="gallery-header">
      <h2 class="gallery-title">职工风采</h2>
      <p class="gallery-subtitle">展现团队风采，传递企业精神</p>
    </div>

    <!-- 连图展示区域 -->
    <div class="gallery-container">
      <div ref="bottomSwiperRef" class="image-carousel">
        <swiper
          :slides-per-view="3"
          :space-between="30"
          :loop="true"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :speed="800"
          :centered-slides="true"
          :modules="bottomSwiperModules"
          @slide-change="onBottomSwiperSlideChange"
        >
          <swiper-slide v-for="(item, index) in staffList" :key="index">
            <div class="image-card" :class="{ active: bottomSwiperIndex === index }">
              <div class="image-wrapper">
                <img :src="item.image" :alt="item.name" class="gallery-image" />
                <div class="image-overlay">
                  <div class="overlay-content">
                    <h3 class="staff-name">{{ item.name }}</h3>
                    <p class="staff-position">{{ item.position }}</p>
                    <span class="staff-department">{{ item.department }}</span>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import swiper1 from "~/assets/images/swiper/swiper-1.jpg"
import swiper2 from "~/assets/images/swiper/swiper-2.jpg"
import swiper5 from "~/assets/images/swiper/swiper-5.jpg"
import swiper6 from "~/assets/images/swiper/swiper-6.jpg"
import swiper7 from "~/assets/images/swiper/swiper-3.jpg"
import swiper8 from "~/assets/images/swiper/swiper-4.jpg"
import "swiper/css"
import type { Swiper as SwiperType } from "swiper/types"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay } from "swiper/modules"

// 职工数据接口
interface StaffMember {
  id: number
  name: string
  position: string
  department: string
  image: string
  achievements: string[]
}

// 职工风采数据
const staffList: StaffMember[] = [
  {
    id: 1,
    name: "张明",
    position: "技术总监",
    department: "技术部",
    image: swiper1,
    achievements: ["优秀员工", "技术创新奖", "团队协作奖"],
  },
  {
    id: 2,
    name: "李华",
    position: "项目经理",
    department: "产品部",
    image: swiper2,
    achievements: ["项目管理专家", "客户满意度奖", "年度优秀"],
  },
  {
    id: 3,
    name: "王芳",
    position: "设计主管",
    department: "设计部",
    image: swiper5,
    achievements: ["设计创新奖", "用户体验奖", "创意之星"],
  },
  {
    id: 4,
    name: "刘强",
    position: "销售经理",
    department: "销售部",
    image: swiper6,
    achievements: ["销售冠军", "客户开拓奖", "业绩突出"],
  },
  {
    id: 5,
    name: "陈静",
    position: "人事经理",
    department: "人事部",
    image: swiper7,
    achievements: ["人力资源专家", "团队建设奖", "员工关怀奖"],
  },
  {
    id: 6,
    name: "赵磊",
    position: "财务总监",
    department: "财务部",
    image: swiper8,
    achievements: ["财务管理专家", "成本控制奖", "风险管控奖"],
  },
]

const bottomSwiperRef = ref<HTMLElement>()
const bottomSwiperIndex = ref<number>(0)
const swiperInstance = ref<SwiperType>()

const bottomSwiperModules = [Autoplay]

function onBottomSwiperSlideChange(swiper: SwiperType) {
  bottomSwiperIndex.value = swiper.realIndex
}

function _goToSlide(index: number) {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(index)
  }
}

// 监听 swiper 实例
onMounted(() => {
  nextTick(() => {
    if (bottomSwiperRef.value) {
      const swiperEl = bottomSwiperRef.value.querySelector(".swiper") as HTMLElement & { swiper?: SwiperType }
      if (swiperEl && swiperEl.swiper) {
        swiperInstance.value = swiperEl.swiper
      }
    }
  })
})

// 暴露方法给父组件
defineExpose({
  enter: () => {
    // 可以添加进入动画
  },
  leave: () => {
    // 可以添加离开动画
  },
})
</script>

<style scoped lang="scss">
.staff-gallery {
  height: 100%;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  position: relative;

  .gallery-header {
    text-align: center;
    padding: 60px 0 40px;
    background: white;

    .gallery-title {
      font-size: 40px;
      font-weight: 700;
      color: $text-color;
      margin: 0 0 16px 0;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 4px;
        background: linear-gradient(90deg, $primary-color, #4f46e5);
        border-radius: 2px;
      }
    }

    .gallery-subtitle {
      font-size: 18px;
      color: $text-light;
      margin: 0;
      font-weight: 400;
    }
  }

  .gallery-container {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0 5%;
    min-height: 500px;

    .image-carousel {
      padding: 40px 0;
      overflow: hidden;

      .swiper {
        height: 500px;
        padding: 0 20px;

        .swiper-slide {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .image-card {
        height: 400px;
        width: 100%;
        border-radius: 16px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transform: scale(0.9);
        opacity: 0.7;
        margin: 0 auto;

        &.active {
          transform: scale(1);
          opacity: 1;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        &:hover {
          transform: scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        }

        .image-wrapper {
          position: relative;
          height: 100%;
          width: 100%;

          .gallery-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
          }

          .image-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
            padding: 30px 20px 20px;
            color: white;
            opacity: 0;
            transition: opacity 0.3s ease;

            .overlay-content {
              .staff-name {
                font-size: 24px;
                font-weight: 700;
                margin: 0 0 8px 0;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
              }

              .staff-position {
                font-size: 16px;
                margin: 0 0 6px 0;
                opacity: 0.9;
                font-weight: 500;
              }

              .staff-department {
                font-size: 14px;
                opacity: 0.8;
                background: rgba(255, 255, 255, 0.2);
                padding: 4px 12px;
                border-radius: 12px;
                display: inline-block;
                backdrop-filter: blur(10px);
              }
            }
          }

          &:hover .image-overlay {
            opacity: 1;
          }

          &:hover .gallery-image {
            transform: scale(1.1);
          }
        }
      }
    }

    .gallery-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 40px;
      padding: 30px 0;
      background: white;
      border-top: 1px solid #e5e7eb;

      .control-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: $primary-color;
        border: none;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(44, 104, 185, 0.3);

        &:hover {
          background: #1d4ed8;
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(44, 104, 185, 0.4);
        }

        &:active {
          transform: scale(0.95);
        }
      }

      .slide-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        font-weight: 600;
        color: $text-color;

        .current-slide {
          color: $primary-color;
        }

        .slide-separator {
          color: $text-light;
        }

        .total-slides {
          color: $text-light;
        }
      }
    }
  }

  // 响应式设计
  @media (max-width: 1200px) {
    .gallery-container {
      padding: 0 4%;
      min-height: 450px;

      .image-carousel {
        padding: 30px 0;

        .swiper {
          height: 450px;
        }

        .image-card {
          height: 350px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .gallery-header {
      padding: 40px 0 30px;

      .gallery-title {
        font-size: 32px;
      }

      .gallery-subtitle {
        font-size: 16px;
      }
    }

    .gallery-container {
      padding: 0 3%;
      min-height: 400px;

      .image-carousel {
        padding: 20px 0;

        .swiper {
          height: 400px;
          padding: 0 10px;
        }

        .image-card {
          height: 300px;
          border-radius: 12px;

          .image-wrapper .image-overlay {
            padding: 20px 15px 15px;

            .overlay-content {
              .staff-name {
                font-size: 20px;
              }

              .staff-position {
                font-size: 14px;
              }

              .staff-department {
                font-size: 12px;
                padding: 3px 10px;
              }
            }
          }
        }
      }

      .gallery-controls {
        gap: 30px;
        padding: 20px 0;

        .control-btn {
          width: 45px;
          height: 45px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .gallery-container {
      min-height: 350px;

      .image-carousel {
        .swiper {
          height: 350px;
        }

        .image-card {
          height: 250px;
        }
      }
    }
  }
}
</style>
