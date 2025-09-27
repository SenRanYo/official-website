<template>
  <div class="index-swiper-slide-two">
    <div class="news-content" :class="{ 'animate-in': isVisible }">
      <!-- 主要新闻区域 - 公司要闻（带图片） -->
      <section class="featured-news-section">
        <div class="section-header">
          <h3>公司要闻</h3>
          <span class="more-link">更多 →</span>
        </div>

        <div class="featured-news-content">
          <!-- 轮播图区域 -->
          <div class="swiper-container">
            <div ref="swiperRef" class="swiper">
              <div class="swiper-wrapper">
                <div v-for="item in featuredNews" :key="item.id" class="swiper-slide">
                  <img :src="item.image" :alt="item.title" />
                  <div class="slide-overlay">
                    <h4 class="slide-title">{{ item.title }}</h4>
                    <p class="slide-summary">{{ item.summary }}</p>
                    <div class="slide-meta">
                      <span class="slide-date">{{ item.date }}</span>
                      <span class="slide-views">{{ item.views }} 阅读</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
          </div>

          <!-- 要闻列表 -->
          <div class="featured-news-list">
            <div v-for="item in featuredNewsList" :key="item.id" class="news-item">
              <div class="news-date">
                <span class="day">{{ formatDay(item.date) }}</span>
                <span class="month">{{ formatMonth(item.date) }}</span>
              </div>
              <div class="news-content">
                <h4 class="news-title">{{ item.title }}</h4>
                <p class="news-excerpt">{{ item.excerpt }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 次要新闻区域 - 2行2列布局 -->
      <div class="secondary-news-grid">
        <!-- 第一行 -->
        <div class="news-row">
          <!-- 媒体聚焦 -->
          <section class="news-section media-focus">
            <div class="section-header">
              <h3>媒体聚焦</h3>
              <span class="more-link">更多 →</span>
            </div>
            <div class="news-list">
              <div v-for="item in mediaNews" :key="item.id" class="news-item">
                <div class="news-meta">
                  <span class="news-source">{{ item.source }}</span>
                  <span class="news-date">{{ item.date }}</span>
                </div>
                <h4 class="news-title">{{ item.title }}</h4>
              </div>
            </div>
          </section>

          <!-- 公司新闻 -->
          <section class="news-section company-news">
            <div class="section-header">
              <h3>公司新闻</h3>
              <span class="more-link">更多 →</span>
            </div>
            <div class="news-list">
              <div v-for="item in companyNews" :key="item.id" class="news-item">
                <div class="news-meta">
                  <span class="news-category">{{ item.category }}</span>
                  <span class="news-date">{{ item.date }}</span>
                </div>
                <h4 class="news-title">{{ item.title }}</h4>
              </div>
            </div>
          </section>
        </div>

        <!-- 第二行 -->
        <div class="news-row">
          <!-- 职工园地 -->
          <section class="news-section employee-corner">
            <div class="section-header">
              <h3>职工园地</h3>
              <span class="more-link">更多 →</span>
            </div>
            <div class="news-list">
              <div v-for="item in employeeNews" :key="item.id" class="news-item">
                <div class="news-meta">
                  <span class="news-type">{{ item.type }}</span>
                  <span class="news-date">{{ item.date }}</span>
                </div>
                <h4 class="news-title">{{ item.title }}</h4>
              </div>
            </div>
          </section>

          <!-- 图片新闻 -->
          <section class="news-section photo-news">
            <div class="section-header">
              <h3>图片新闻</h3>
              <span class="more-link">更多 →</span>
            </div>
            <div class="photo-news-grid">
              <div v-for="item in photoNews" :key="item.id" class="photo-item">
                <div class="photo-wrapper">
                  <img :src="item.image" :alt="item.title" />
                  <div class="photo-overlay">
                    <span class="photo-date">{{ item.date }}</span>
                  </div>
                </div>
                <h4 class="photo-title">{{ item.title }}</h4>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import banner1 from "~/assets/images/banner1.jpg"
import banner2 from "~/assets/images/banner2.jpg"
import banner3 from "~/assets/images/banner3.jpg"
import swiper1 from "~/assets/images/swiper/swiper-1.jpg"
import swiper2 from "~/assets/images/swiper/swiper-2.jpg"
import swiper3 from "~/assets/images/swiper/swiper-3.jpg"
import swiper4 from "~/assets/images/swiper/swiper-4.jpg"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import { Swiper } from "swiper"
import { Pagination, Navigation, EffectFade, Mousewheel, Autoplay } from "swiper/modules"

const swiper = ref<Swiper>()
const swiperRef = ref<HTMLElement>()
const isVisible = ref(false)

// 公司要闻轮播数据
const featuredNews = ref([
  {
    id: 1,
    title: "公司召开2025年工作会议暨党建工作会议",
    summary: "会议总结了2024年工作成果，部署了2025年重点任务，强调要坚持高质量发展...",
    date: "2025-01-15",
    views: "1,256",
    image: banner1,
  },
  {
    id: 2,
    title: '公司荣获"2024年度优秀企业"称号',
    summary: "在全省企业评选中，公司凭借出色的经营业绩和社会责任担当，荣获优秀称号...",
    date: "2025-01-12",
    views: "986",
    image: banner2,
  },
  {
    id: 3,
    title: "重大项目建设取得新突破",
    summary: "公司重点投资项目进展顺利，预计将为地方经济发展注入新动力...",
    date: "2025-01-10",
    views: "1,458",
    image: banner3,
  },
])

// 公司要闻列表数据
const featuredNewsList = ref([
  {
    id: 1,
    title: "公司与知名高校签署产学研合作协议",
    excerpt: "加强校企合作，推进技术创新",
    date: "2025-01-14",
  },
  {
    id: 2,
    title: "第四季度安全生产工作会议召开",
    excerpt: "强化安全管理，确保生产安全",
    date: "2025-01-13",
  },
  {
    id: 3,
    title: "公司参加行业高峰论坛并发表主题演讲",
    excerpt: "分享发展经验，展示企业形象",
    date: "2025-01-11",
  },
  {
    id: 4,
    title: "新员工入职培训圆满结束",
    excerpt: "帮助新员工快速融入企业",
    date: "2025-01-09",
  },
])

// 媒体聚焦数据
const mediaNews = ref([
  {
    id: 1,
    title: "《经济日报》：企业数字化转型的典型案例",
    source: "经济日报",
    date: "01-14",
  },
  {
    id: 2,
    title: "《人民日报》：助力乡村振兴的企业担当",
    source: "人民日报",
    date: "01-13",
  },
  {
    id: 3,
    title: "《光明日报》：绿色发展的先行者",
    source: "光明日报",
    date: "01-11",
  },
  {
    id: 4,
    title: "央视新闻：创新驱动发展的实践者",
    source: "央视新闻",
    date: "01-09",
  },
])

// 公司新闻数据
const companyNews = ref([
  {
    id: 1,
    title: "公司举办员工技能竞赛活动",
    category: "企业活动",
    date: "01-14",
  },
  {
    id: 2,
    title: "新产品发布会成功举办",
    category: "产品发布",
    date: "01-13",
  },
  {
    id: 3,
    title: "公司通过ISO质量管理体系认证",
    category: "资质认证",
    date: "01-11",
  },
  {
    id: 4,
    title: "季度经营分析会议召开",
    category: "经营管理",
    date: "01-09",
  },
])

// 职工园地数据
const employeeNews = ref([
  {
    id: 1,
    title: "员工读书分享会：《管理的常识》",
    type: "文化活动",
    date: "01-14",
  },
  {
    id: 2,
    title: "公司篮球队在联赛中夺冠",
    type: "体育活动",
    date: "01-12",
  },
  {
    id: 3,
    title: "优秀员工表彰大会",
    type: "表彰活动",
    date: "01-10",
  },
  {
    id: 4,
    title: "员工子女夏令营活动",
    type: "关爱活动",
    date: "01-08",
  },
])

// 图片新闻数据
const photoNews = ref([
  {
    id: 1,
    title: "新厂区建设进展",
    date: "01-14",
    image: swiper1,
  },
  {
    id: 2,
    title: "员工培训活动",
    date: "01-12",
    image: swiper2,
  },
  {
    id: 3,
    title: "社区公益活动",
    date: "01-10",
    image: swiper3,
  },
  {
    id: 4,
    title: "产品展示会",
    date: "01-08",
    image: swiper4,
  },
])

// 格式化日期
function formatDay(date: string) {
  return new Date(date).getDate().toString().padStart(2, "0")
}

function formatMonth(date: string) {
  const d = new Date(date)
  return `${(d.getMonth() + 1).toString().padStart(2, "0")}.${d.getFullYear()}`
}

// 进入时触发动画
function enter() {
  isVisible.value = true
}

// 离开时重置动画
function leave() {
  isVisible.value = false
}

function initSwiper() {
  nextTick(() => {
    if (swiperRef.value) {
      swiper.value = new Swiper(swiperRef.value, {
        modules: [Pagination, Navigation, EffectFade, Mousewheel, Autoplay],
        mousewheel: { forceToAxis: true, releaseOnEdges: false },
        slidesPerView: 1,
        speed: 800,
        effect: "fade",
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      })
    }
  })
}

onMounted(() => {
  initSwiper()
})

defineExpose({
  enter,
  leave,
})
</script>

<style scoped lang="scss">
.index-swiper-slide-two {
  height: 100%;
  padding: 30px 12.5%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .news-content {
    flex: 1;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease-out;

    &.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    .featured-news-section {
      background: #fff;
      border-radius: 20px;
      padding: 32px;
      margin-bottom: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 16px;
        border-bottom: 3px solid #2c5aa0;

        h3 {
          font-size: 28px;
          font-weight: 600;
          color: #2c5aa0;
          margin: 0;
        }

        .more-link {
          color: #666;
          font-size: 16px;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.3s ease;
          cursor: pointer;

          &:hover {
            background: #2c5aa0;
            color: #fff;
            transform: translateX(5px);
          }
        }
      }

      .featured-news-content {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 40px;

        .swiper-container {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

          .swiper {
            width: 100%;
            height: 400px;

            .swiper-slide {
              position: relative;
              overflow: hidden;

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
              }

              &:hover img {
                transform: scale(1.1);
              }

              .slide-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%);
                padding: 30px;
                color: #fff;
                transform: translateY(0);
                transition: transform 0.3s ease;

                .slide-title {
                  font-size: 22px;
                  font-weight: 600;
                  margin: 0 0 12px 0;
                  line-height: 1.3;
                }

                .slide-summary {
                  font-size: 14px;
                  opacity: 0.9;
                  margin: 0 0 16px 0;
                  line-height: 1.5;
                }

                .slide-meta {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  font-size: 12px;
                  opacity: 0.8;

                  .slide-views {
                    background: rgba(255, 255, 255, 0.2);
                    padding: 4px 12px;
                    border-radius: 12px;
                    backdrop-filter: blur(10px);
                  }
                }
              }
            }

            :deep(.swiper-pagination) {
              bottom: 20px;
              left: 30px;
              width: fit-content;

              .swiper-pagination-bullet {
                background: rgba(255, 255, 255, 0.5);
                opacity: 1;
                width: 12px;
                height: 12px;
                margin: 0 6px;
                transition: all 0.3s ease;

                &.swiper-pagination-bullet-active {
                  background: #fff;
                  transform: scale(1.2);
                }
              }
            }

            :deep(.swiper-button-prev),
            :deep(.swiper-button-next) {
              color: #fff;
              background: rgba(0, 0, 0, 0.3);
              width: 44px;
              height: 44px;
              border-radius: 50%;
              backdrop-filter: blur(10px);
              transition: all 0.3s ease;

              &:hover {
                background: rgba(44, 90, 160, 0.8);
                transform: scale(1.1);
              }

              &::after {
                font-size: 18px;
                font-weight: bold;
              }
            }
          }
        }

        .featured-news-list {
          .news-item {
            display: flex;
            align-items: flex-start;
            padding: 20px 0;
            border-bottom: 1px solid #f0f0f0;
            transition: all 0.3s ease;

            &:hover {
              background: #f8f9fa;
              border-radius: 12px;
              padding: 20px 16px;
              margin: 0 -16px;
            }

            &:last-child {
              border-bottom: none;
            }

            .news-date {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-right: 20px;
              background: #2c5aa0;
              color: #fff;
              border-radius: 8px;
              padding: 8px;
              min-width: 60px;

              .day {
                font-size: 20px;
                font-weight: bold;
                line-height: 1;
              }

              .month {
                font-size: 10px;
                margin-top: 4px;
                opacity: 0.9;
              }
            }

            .news-content {
              flex: 1;

              .news-title {
                font-size: 16px;
                font-weight: 600;
                color: #333;
                margin: 0 0 8px 0;
                line-height: 1.4;
                cursor: pointer;
                transition: color 0.3s ease;

                &:hover {
                  color: #2c5aa0;
                }
              }

              .news-excerpt {
                font-size: 14px;
                color: #666;
                margin: 0;
                line-height: 1.4;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
            }
          }
        }
      }
    }

    .secondary-news-grid {
      display: flex;
      flex-direction: column;
      gap: 30px;

      .news-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
      }

      .news-section {
        background: #fff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .section-header {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 20px 24px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;

          h3 {
            font-size: 20px;
            font-weight: 600;
            color: #333;
            margin: 0;
          }

          .more-link {
            color: #666;
            font-size: 14px;
            text-decoration: none;
            transition: color 0.3s ease;
            cursor: pointer;

            &:hover {
              color: #2c5aa0;
            }
          }
        }

        .news-list {
          padding: 20px 24px;
          max-height: 300px;
          overflow-y: auto;

          .news-item {
            padding: 12px 0;
            border-bottom: 1px solid #f5f5f5;
            transition: all 0.3s ease;

            &:hover {
              background: #f8f9fa;
              border-radius: 8px;
              padding: 12px 12px;
              margin: 0 -12px;
            }

            &:last-child {
              border-bottom: none;
            }

            .news-meta {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 8px;
              font-size: 12px;

              .news-source,
              .news-category,
              .news-type {
                background: #e9ecef;
                color: #666;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 11px;
              }

              .news-date {
                color: #999;
              }
            }

            .news-title {
              font-size: 14px;
              color: #333;
              margin: 0;
              line-height: 1.4;
              cursor: pointer;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              transition: color 0.3s ease;

              &:hover {
                color: #2c5aa0;
              }
            }
          }
        }

        &.photo-news {
          .photo-news-grid {
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;

            .photo-item {
              text-align: center;
              transition: transform 0.3s ease;

              &:hover {
                transform: translateY(-3px);
              }

              .photo-wrapper {
                position: relative;
                border-radius: 8px;
                overflow: hidden;
                margin-bottom: 12px;

                img {
                  width: 100%;
                  height: 100px;
                  object-fit: cover;
                  transition: transform 0.3s ease;
                }

                &:hover img {
                  transform: scale(1.05);
                }

                .photo-overlay {
                  position: absolute;
                  top: 8px;
                  right: 8px;
                  background: rgba(0, 0, 0, 0.6);
                  color: #fff;
                  padding: 4px 8px;
                  border-radius: 12px;
                  font-size: 10px;
                  backdrop-filter: blur(10px);
                }
              }

              .photo-title {
                font-size: 12px;
                color: #333;
                margin: 0;
                line-height: 1.3;
                cursor: pointer;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                transition: color 0.3s ease;

                &:hover {
                  color: #2c5aa0;
                }
              }
            }
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 1400px) {
  .index-swiper-slide-two {
    padding: 25px 3% 40px;

    .news-content .featured-news-section .featured-news-content {
      grid-template-columns: 1fr;
      gap: 30px;

      .swiper-container .swiper {
        height: 300px;
      }
    }

    .secondary-news-grid {
      gap: 25px;

      .news-row {
        grid-template-columns: 1fr;
        gap: 25px;
      }
    }
  }
}

@media (max-width: 768px) {
  .index-swiper-slide-two {
    padding: 15px 2% 30px;

    .news-content {
      .featured-news-section {
        padding: 20px;

        .section-header h3 {
          font-size: 22px;
        }

        .featured-news-content {
          .swiper-container .swiper {
            height: 250px;

            .swiper-slide .slide-overlay {
              padding: 20px;

              .slide-title {
                font-size: 18px;
              }
            }
          }

          .featured-news-list .news-item {
            flex-direction: column;
            text-align: center;

            .news-date {
              margin: 0 0 16px 0;
            }
          }
        }
      }

      .secondary-news-grid {
        .news-row {
          grid-template-columns: 1fr;
        }

        .news-section {
          &.photo-news .photo-news-grid {
            grid-template-columns: 1fr !important;
          }
        }
      }
    }
  }
}

// 动画效果
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
