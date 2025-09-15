<template>
  <div class="index-swiper-slide-two">
    <p class="title">公司要闻</p>
    <div class="content">
      <!-- 左侧轮播图 -->
      <div class="left-section">
        <div ref="swiperRef" class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img :src="banner1" alt="" />
              <div class="slide-caption">吕军学向国与国家电网董事长张智刚总经理座谈会</div>
            </div>

            <div class="swiper-slide">
              <img :src="banner1" alt="" />
              <div class="slide-caption">吕军学向国与国家电网董事长张智刚总经理座谈会</div>
            </div>

            <div class="swiper-slide">
              <img :src="banner1" alt="" />
              <div class="slide-caption">吕军学向国与国家电网董事长张智刚总经理座谈会</div>
            </div>

            <div class="swiper-slide">
              <img :src="banner1" alt="" />
              <div class="slide-caption">吕军学向国与国家电网董事长张智刚总经理座谈会</div>
            </div>
          </div>

          <div class="swiper-pagination"></div>
        </div>
      </div>

      <!-- 右侧新闻列表 -->
      <div class="right-section">
        <div class="news-header">
          <span class="news-category active">公司要闻</span>
          <span class="more">更多</span>
        </div>

        <div class="news-list">
          <div class="news-item">
            <div class="news-date">
              <span class="day">12</span>
              <span class="month">2025.09</span>
            </div>
            <div class="news-content">
              <h4>中央第十生态环境保护督察组向中国大唐集团有限公司反馈督察情况</h4>
            </div>
          </div>

          <div class="news-item">
            <div class="news-date">
              <span class="day">15</span>
              <span class="month">2025.09</span>
            </div>
            <div class="news-content">
              <h4>中国大唐总部机关单位举办办公室工运动会</h4>
            </div>
          </div>

          <div class="news-item">
            <div class="news-date">
              <span class="day">12</span>
              <span class="month">2025.09</span>
            </div>
            <div class="news-content">
              <h4>中国大唐召开党组织的建设工作领导小组（扩大）会议</h4>
            </div>
          </div>

          <div class="news-item">
            <div class="news-date">
              <span class="day">12</span>
              <span class="month">2025.09</span>
            </div>
            <div class="news-content">
              <h4>中国大唐召开总部2025年优才计划新员工见面会</h4>
            </div>
          </div>

          <div class="news-item">
            <div class="news-date">
              <span class="day">05</span>
              <span class="month">2025.09</span>
            </div>
            <div class="news-content">
              <h4>吕军出席中马企业家家庭座谈会</h4>
            </div>
          </div>
        </div>
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
.index-swiper-slide-two {
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
    gap: 30px;
    height: 430px;
    display: flex;

    .left-section {
      width: 650px;
      position: relative;

      .swiper {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .swiper-slide {
          position: relative;
          background-color: #fff;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
            transition: all 0.5s ease;
            &:hover {
              transform: scale(1.05);
            }
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

      :deep(.swiper-pagination) {
        left: auto;
        right: 20px;
        bottom: 15px;
        width: fit-content;
        .swiper-pagination-bullet {
          opacity: 1;
          background-color: #fff;
        }

        .swiper-pagination-bullet-active {
          background-color: $primary-color;
        }
      }
    }

    .right-section {
      flex: 1;
      overflow: hidden;

      .news-header {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #e5e5e5;

        .news-category {
          margin-right: 16px;
          font-size: 18px;
          color: #333;
          cursor: pointer;
          position: relative;
          border-radius: 4px;
          transition: all 0.3s ease;

          &:hover {
            font-weight: bold;
          }

          &.active {
            font-weight: bold;
            &::after {
              content: "";
              position: absolute;
              left: 0;
              width: 30px;
              height: 3px;
              bottom: -10px;
              background-color: #1a5490;
            }
          }
        }

        .more {
          cursor: pointer;
          font-size: 14px;
          margin-left: auto;

          &:hover {
            color: $primary-color;
          }
        }
      }

      .news-list {
        padding: 0;

        .news-item {
          display: flex;
          padding: 15px 0;
          align-items: center;
          border-bottom: 1px solid #e5e5e5;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #f8f9fa;
          }

          &:last-child {
            border-bottom: none;
          }

          .news-date {
            color: #c4c4c4;
            display: flex;
            flex-direction: column;
            margin-right: 20px;

            .day {
              font-size: 24px;
              font-weight: bold;
              line-height: 1;
            }

            .month {
              font-size: 12px;
              margin-top: 4px;
            }
          }

          .news-content {
            flex: 1;

            h4 {
              margin: 0;
              font-size: 16px;
              line-height: 1.5;
              color: #333;
              font-weight: 500;
              cursor: pointer;

              &:hover {
                color: #1a5490;
              }
            }
          }
        }
      }
    }
  }
}
</style>
