<template>
  <div class="index-news-wrapper">
    <div class="index-news">
      <div class="index-news__top">
        <div class="index-news__top--left">
          <div class="index-news__title-section">
            <p class="index-news__title-en">CORPORATE</p>
            <h2 class="index-news__title-cn">新闻中心</h2>
          </div>
        </div>
        <div class="index-news__top--right">
          <div class="index-news__tabs">
            <div
              v-for="(tab, index) in tabs"
              :key="index"
              class="index-news__tab-item"
              :class="{ 'index-news__tab-item--active': activeTab === index }"
              @click="handleTabChange(index)"
            >
              {{ tab.label }}
            </div>
          </div>
        </div>
      </div>
      <div class="index-news__bottom">
        <div class="index-news__bottom--left">
          <Swiper
            :modules="modules"
            :slides-per-view="1"
            :loop="true"
            :effect="'slide'"
            :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :pagination="{ clickable: true }"
            class="index-news__swiper"
          >
            <SwiperSlide v-for="(news, index) in newsData" :key="index">
              <div class="index-news__slide">
                <img :src="news.image" :alt="`news-${index}`" class="index-news__slide-image" />
                <div class="index-news__slide-date">
                  <div class="index-news__date-year-month">{{ news.date }}</div>
                  <div class="index-news__date-day">{{ news.day }}</div>
                </div>
                <div class="index-news__slide-title">{{ news.title }}</div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="index-news__bottom--right">
          <div class="index-news__list">
            <div v-for="(item, index) in newsList" :key="activeTab + '-' + index" class="index-news__list-item">
              <div class="index-news__list-item-date">
                <div class="index-news__list-date-text">{{ item.date }}</div>
                <div class="index-news__list-date-day">{{ item.day }}</div>
              </div>
              <div class="index-news__list-item-content">
                <h3 class="index-news__list-item-title">{{ item.title }}</h3>
                <p class="index-news__list-item-description">{{ item.description }}</p>
              </div>
            </div>
          </div>
          <div class="index-news__view-more">
            <a href="#" class="index-news__view-more-btn">查看更多</a>
          </div>
        </div>
        <Transition name="loading-modal">
          <div v-if="isLoading" class="index-news__loading-overlay">
            <div class="index-news__loading-placeholder">
              <div class="index-news__loading-spinner"></div>
              <span class="index-news__loading-text">正在加载中...</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "swiper/css"
import "swiper/css/pagination"
import { getNewsList } from "~/api/news"
import { ref, onMounted } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules"
import swiper1 from "~/assets/images/swiper/swiper-1.jpg"
import swiper2 from "~/assets/images/swiper/swiper-2.jpg"
import swiper3 from "~/assets/images/swiper/swiper-3.jpg"
import swiper4 from "~/assets/images/swiper/swiper-4.jpg"
import swiper5 from "~/assets/images/swiper/swiper-5.jpg"
import swiper6 from "~/assets/images/swiper/swiper-6.jpg"

const activeTab = ref(0)

const tabs = [{ label: "公司要闻" }, { label: "媒体聚焦" }, { label: "公司新闻" }, { label: "职工园地" }, { label: "图片新闻" }]

const newsList = ref<any[]>([])
const isLoading = ref(false)

// 从 API 获取数据
const fetchNewsData = async () => {
  try {
    const news = await getNewsList({ category: activeTab.value })
    if (news) {
      newsList.value = news.list.slice(0, 6)
    }
  } catch (error) {
    console.error("Failed to fetch news data:", error)
  }
}

// 监听 tab 切换
const handleTabChange = (index: number) => {
  if (activeTab.value === index) return

  activeTab.value = index
  isLoading.value = true

  // 模拟数据加载延迟，实际环境中会由 API 请求决定
  setTimeout(() => {
    fetchNewsData()
    isLoading.value = false
  }, 500)
}

onMounted(() => {
  fetchNewsData()
})

const modules = [Autoplay, Pagination]

const newsData = [
  { image: swiper1, date: "2025.10", day: "13", title: "中国华电集团四川分公司2025年党风廉洁建设会议召开" },
  { image: swiper2, date: "2025.10", day: "12", title: "公司成功举办年度客户答谢会" },
  { image: swiper3, date: "2025.10", day: "11", title: "公司新项目启动，开启新篇章" },
  { image: swiper4, date: "2025.10", day: "10", title: "公司荣获2025年度优秀企业称号" },
  { image: swiper5, date: "2025.10", day: "09", title: "安全生产工作会议顺利召开" },
  { image: swiper6, date: "2025.10", day: "08", title: "党建活动丰富职工文化生活" },
]
</script>

<style scoped lang="scss">
// Loading spinner animation
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Loading modal transition
.loading-modal-enter-active,
.loading-modal-leave-active {
  transition: all 0.3s ease;
}

.loading-modal-enter-from,
.loading-modal-leave-to {
  opacity: 0;
}

// 最外层容器
.index-news-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
}

// 块容器 - 主容器
.index-news {
  gap: 20px;
  width: 100%;
  padding: 80px 160px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  // 顶部区域
  .index-news__top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    // 顶部左侧 - 标题部分
    .index-news__top--left {
      .index-news__title-section {
        display: flex;
        flex-direction: column;

        // 英文标题 - 短规则
        .index-news__title-en {
          color: #e5e5e5;
          font-size: 27px;
          line-height: 0;
          margin-bottom: 13px;
        }

        // 中文标题 - 短规则
        .index-news__title-cn {
          color: #1f2937;
          font-size: 32px;
          line-height: 0;
          font-weight: bold;
        }
      }
    }

    // 顶部右侧 - 标签页部分
    .index-news__top--right {
      .index-news__tabs {
        gap: 27px;
        display: flex;

        // 标签项 - 中等规则
        .index-news__tab-item {
          padding: 7px;
          font-size: 19px;
          color: #1f2937;
          font-weight: 500;
          cursor: pointer;
          font-size: 22px;
          transition: color 0.3s ease;

          &:hover,
          &.index-news__tab-item--active {
            color: #108cf0;
          }
        }
      }
    }
  }

  // 底部区域
  .index-news__bottom {
    gap: 40px;
    display: flex;
    position: relative;

    // 底部左侧 - 轮播图
    .index-news__bottom--left {
      width: 600px;
      height: 427px;
      position: relative;

      // 轮播容器 - 中等规则
      .index-news__swiper {
        height: 100%;
        overflow: hidden;

        // Swiper 分页符号 - 短规则
        :deep(.swiper-pagination-bullet) {
          width: 8px;
          height: 8px;
          opacity: 1;
          background-color: rgba(255, 255, 255, 0.6);
        }

        // Swiper 分页活跃状态 - 短规则
        :deep(.swiper-pagination-bullet-active) {
          opacity: 1;
          background-color: #108cf0;
        }

        // Swiper 分页容器 - 短规则
        :deep(.swiper-pagination) {
          left: auto;
          right: 27px;
          bottom: 24px;
          width: fit-content;
        }

        // 轮播项 - 短规则
        :deep(.swiper-slide) {
          position: relative;
        }

        // 幻灯片内容容器 - 短规则
        .index-news__slide {
          width: 100%;
          height: 100%;
          position: relative;
        }

        // 图片元素 - 短规则
        .index-news__slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        // 日期容器 - 中等规则
        .index-news__slide-date {
          top: 27px;
          right: 27px;
          z-index: 10;
          text-align: right;
          position: absolute;

          // 年月文本 - 短规则
          .index-news__date-year-month {
            color: #fff;
            font-size: 19px;
            font-weight: 500;
          }

          // 日期数字 - 短规则
          .index-news__date-day {
            color: #fff;
            font-size: 43px;
            font-weight: bold;
            line-height: 1;
          }
        }

        // 标题文本 - 中等规则
        .index-news__slide-title {
          width: 60%;
          bottom: 20px;
          left: 27px;
          right: 27px;
          z-index: 10;
          color: #fff;
          font-size: 21px;
          font-weight: 500;
          line-height: 1.4;
          position: absolute;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }

    // 底部右侧 - 新闻列表
    .index-news__bottom--right {
      flex: 1;
      display: flex;
      flex-direction: column;

      // 新闻列表容器 - 中等规则
      .index-news__list {
        display: grid;
        gap: 27px;
        margin-bottom: 27px;
        grid-template-columns: 1fr 1fr;

        // 列表项 - 中等规则
        .index-news__list-item {
          gap: 21px;
          display: flex;
          cursor: pointer;
          border-radius: 5px;
          align-items: center;
          transition: all 0.3s ease;

          &:hover {
            .index-news__list-item-content {
              .index-news__list-item-title {
                color: #108cf0;
              }
            }
          }

          // 日期框 - 较长规则
          .index-news__list-item-date {
            aspect-ratio: 1/1;
            min-width: 107px;
            flex-shrink: 0;
            display: flex;
            text-align: center;
            border-radius: 5px;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            border: 1px solid #e5e7eb;

            // 日期文本 - 短规则
            .index-news__list-date-text {
              color: #6b7280;
              font-size: 16px;
              margin-bottom: 5px;
            }

            // 日期数字 - 短规则
            .index-news__list-date-day {
              color: #1f2937;
              font-size: 32px;
              font-weight: bold;
            }
          }

          // 内容容器 - 短规则
          .index-news__list-item-content {
            flex: 1;
            min-width: 0;

            // 标题 - 中等规则
            .index-news__list-item-title {
              margin: 0 0 11px 0;
              font-size: 19px;
              color: #1f2937;
              font-weight: 600;
              line-height: 1.4;
              transition: all 0.3s ease;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            // 描述 - 中等规则
            .index-news__list-item-description {
              margin: 0;
              font-size: 16px;
              color: #9ca3af;
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

      // 查看更多区域 - 短规则
      .index-news__view-more {
        display: flex;

        // 查看更多按钮 - 中等规则
        .index-news__view-more-btn {
          color: #108cf0;
          font-size: 19px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;

          &:hover {
            color: #0872b8;
            text-decoration: underline;
          }
        }
      }
    }
  }

  // 加载中覆盖层 - 中等规则
  .index-news__loading-overlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.7);

    // 加载占位符容器 - 中等规则
    .index-news__loading-placeholder {
      gap: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      // 加载旋转器 - 短规则
      .index-news__loading-spinner {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        border: 4px solid #e5e7eb;
        border-top-color: #108cf0;
        animation: spin 1s linear infinite;
      }

      // 加载文本 - 短规则
      .index-news__loading-text {
        color: #4b5563;
        font-size: 21px;
        font-weight: 500;
      }
    }
  }
}
</style>
