<template>
  <div class="index-news">
    <div class="index-news__top">
      <div class="top-left">
        <div class="title-section">
          <p class="title-en">CORPORATE</p>
          <h2 class="title-cn">新闻中心</h2>
        </div>
      </div>
      <div class="top-right">
        <div class="tabs">
          <div v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: activeTab === index }" @click="handleTabChange(index)">
            {{ tab.label }}
          </div>
        </div>
      </div>
    </div>
    <div class="index-news__bottom">
      <div class="bottom-left">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :loop="true"
          :effect="'slide'"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          class="news-swiper"
        >
          <SwiperSlide v-for="(news, index) in newsData" :key="index">
            <div class="news-slide">
              <img :src="news.image" :alt="`news-${index}`" class="news-image" />
              <div class="news-date">
                <div class="date-year-month">{{ news.date }}</div>
                <div class="date-day">{{ news.day }}</div>
              </div>
              <div class="news-title">{{ news.title }}</div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="bottom-right">
        <div class="news-list">
          <div v-for="(item, index) in newsList" :key="activeTab + '-' + index" class="news-list-item">
            <div class="item-date">
              <div class="date-text">{{ item.date }}</div>
              <div class="date-day">{{ item.day }}</div>
            </div>
            <div class="item-content">
              <h3 class="item-title">{{ item.title }}</h3>
              <p class="item-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
        <div class="view-more">
          <a href="#" class="view-more-btn">查看更多</a>
        </div>
      </div>
      <Transition name="loading-modal">
        <div v-if="isLoading" class="loading-overlay">
          <div class="loading-placeholder">
            <div class="loading-spinner"></div>
            <span class="loading-text">正在加载中...</span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import "swiper/css"
import "swiper/css/pagination"
import { ref, onMounted } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules"
import { getNewsList, type NewsItem } from "~/api/news"
import swiper1 from "~/assets/images/swiper/swiper-1.jpg"
import swiper2 from "~/assets/images/swiper/swiper-2.jpg"
import swiper3 from "~/assets/images/swiper/swiper-3.jpg"
import swiper4 from "~/assets/images/swiper/swiper-4.jpg"
import swiper5 from "~/assets/images/swiper/swiper-5.jpg"
import swiper6 from "~/assets/images/swiper/swiper-6.jpg"

const activeTab = ref(0)

const tabs = [{ label: "公司要闻" }, { label: "媒体聚焦" }, { label: "公司新闻" }, { label: "职工园地" }, { label: "图片新闻" }]

const newsList = ref<NewsItem[]>([])
const isLoading = ref(false)

// 从 API 获取数据
const fetchNewsData = async () => {
  try {
    const news = await getNewsList({ category: activeTab.value })
    if (news) {
      newsList.value = news.slice(0, 6)
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

.index-news {
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
    display: flex;
    position: relative;

    .bottom-left {
      width: 450px;
      height: 320px;
      position: relative;

      .news-swiper {
        height: 100%;
        overflow: hidden;

        :deep(.swiper-slide) {
          position: relative;
        }

        .news-slide {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .news-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .news-date {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 10;
          text-align: right;

          .date-year-month {
            font-size: 14px;
            color: #fff;
            font-weight: 500;
          }

          .date-day {
            font-size: 32px;
            color: #fff;
            font-weight: bold;
            line-height: 1;
          }
        }

        .news-title {
          width: 60%;
          position: absolute;
          bottom: 15px;
          left: 20px;
          right: 20px;
          z-index: 10;
          color: #fff;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        :deep(.swiper-pagination-bullet) {
          background-color: rgba(255, 255, 255, 0.6);
          opacity: 1;
          width: 6px;
          height: 6px;
        }

        :deep(.swiper-pagination-bullet-active) {
          background-color: #108cf0;
          opacity: 1;
        }

        :deep(.swiper-pagination) {
          left: auto;
          right: 20px;
          bottom: 18px;
          width: fit-content;
        }
      }
    }

    .bottom-right {
      flex: 1;
      display: flex;
      flex-direction: column;

      .news-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;

        .news-list-inner {
          display: contents;
        }

        .news-list-item {
          gap: 16px;
          cursor: pointer;
          display: flex;
          border-radius: 4px;
          align-items: center;
          transition: all 0.3s ease;

          &:hover {
            .item-content {
              .item-title {
                color: #108cf0;
              }
            }
          }

          .item-date {
            aspect-ratio: 1/1;
            min-width: 80px;
            flex-shrink: 0;
            display: flex;
            text-align: center;
            border-radius: 4px;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            border: 1px solid #e5e7eb;

            .date-text {
              font-size: 12px;
              color: #6b7280;
              margin-bottom: 4px;
            }

            .date-day {
              font-size: 24px;
              color: #1f2937;
              font-weight: bold;
            }
          }

          .item-content {
            flex: 1;
            min-width: 0;

            .item-title {
              font-size: 14px;
              color: #1f2937;
              font-weight: 600;
              margin: 0 0 8px 0;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              line-height: 1.4;
              transition: all 0.3s ease;
            }

            .item-description {
              font-size: 12px;
              color: #9ca3af;
              margin: 0;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              line-height: 1.4;
            }
          }
        }
      }

      .view-more {
        display: flex;

        .view-more-btn {
          color: #108cf0;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;

          &:hover {
            color: #0872b8;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;

    .loading-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 12px;

      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #e5e7eb;
        border-top-color: #108cf0;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      .loading-text {
        font-size: 16px;
        color: #4b5563;
        font-weight: 500;
      }
    }
  }
}
</style>
