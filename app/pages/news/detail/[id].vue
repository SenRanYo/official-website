<template>
  <div class="view-container">
    <Description text="新闻中心" :image="image" />
    <div class="news-detail-wrapper">
      <div class="news-detail">
        <!-- 顶部标题区域 -->
        <div class="news-detail__top">
          <div class="news-detail__top--left">
            <div class="news-detail__title-section">
              <p class="news-detail__title-en">CORPORATE</p>
              <h2 class="news-detail__title-cn">新闻中心</h2>
            </div>
          </div>
        </div>

        <!-- 新闻内容区域 -->
        <div class="news-detail__content">
          <!-- 新闻标题 -->
          <h1 class="news-detail__title">{{ newsData?.title }}</h1>

          <!-- 新闻元数据 -->
          <div class="news-detail__metadata">
            <div class="metadata-item">
              <span class="metadata-label">发布日期：</span>
              <span class="metadata-value">{{ newsData?.publishDate }}</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">浏览量：</span>
              <span class="metadata-value">{{ newsData?.views }}</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">作者：</span>
              <span class="metadata-value">{{ newsData?.author }}</span>
            </div>
          </div>

          <!-- 新闻主图 -->
          <div v-if="newsData?.image" class="news-detail__image">
            <img :src="newsData.image" :alt="newsData.title" />
          </div>

          <!-- 新闻正文 -->
          <div class="news-detail__body">
            <!-- @vue-ignore 用于忽略XSS警告，因为内容来自可信的内部数据 -->
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="newsData?.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { articleDetail } from "~/api"
import dayjs from "dayjs"
import image from "~/assets/images/news-bg.png"

definePageMeta({
  layout: "others",
})

interface NewsData {
  id: string
  title: string
  publishDate: string
  views: number
  author: string
  collect: string
  image: string
  content: string
  description: string
}

const route = useRoute()
const newsData = ref<NewsData | null>(null)
const isLoading = ref(false)

const fetchNewsDetail = async () => {
  const newsId = route.params.id as string

  if (!newsId) return

  isLoading.value = true

  try {
    const response = await articleDetail(newsId)

    if (response) {
      newsData.value = {
        id: response.id,
        title: response.title,
        publishDate: response.publishDate ? dayjs(response.publishDate).format("YYYY-MM-DD") : "",
        views: parseInt(response.views) || parseInt(response.yearViews) || 0,
        author: response.user?.username || "",
        collect: "收藏本文",
        image: `http://2444450wnth3.vicp.fun${response.image}`,
        content: response.text,
        description: response.plainText,
      }
    }
  } catch (error) {
    console.error("Failed to fetch news detail:", error)
    newsData.value = null
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchNewsDetail()
})
</script>

<style scoped lang="scss">
// 最外层容器
.view-container {
  width: 100%;
  background-color: #fff;
}

// 新闻详情包装器
.news-detail-wrapper {
  width: 100%;
  display: flex;
  align-items: flex-start;
  background-color: #fff;
}

// 新闻详情主容器
.news-detail {
  width: 100%;
  padding: 80px 250px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;

  // 顶部区域
  .news-detail__top {
    display: flex;
    align-items: center;
    width: 100%;

    .news-detail__top--left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;

      // 英文标题
      .news-detail__title-en {
        color: #e5e5e5;
        font-size: 27px;
        line-height: 0;
        font-weight: bold;
        margin-bottom: 13px;
      }

      // 中文标题
      .news-detail__title-cn {
        color: #1f2937;
        font-size: 32px;
        font-weight: bold;
      }
    }
  }

  // 内容区域
  .news-detail__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 0 auto;

    // 元数据容器
    .news-detail__metadata {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 40px;
      flex-wrap: wrap;
      padding-bottom: 20px;
      text-align: center;

      // 元数据项
      .metadata-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;

        // 元数据标签
        .metadata-label {
          color: #6b7280;
          font-weight: 500;
        }

        // 元数据值
        .metadata-value {
          color: #1f2937;
        }
      }
    }

    // 新闻标题
    .news-detail__title {
      margin: 0;
      font-size: 36px;
      font-weight: bold;
      color: #1f2937;
      line-height: 1.5;
      text-align: center;
    }

    // 新闻主图
    .news-detail__image {
      width: 100%;
      max-height: 500px;
      overflow: hidden;
      border-radius: 8px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    // 新闻正文
    .news-detail__body {
      font-size: 18px;
      color: #374151;
      line-height: 1.8;

      p {
        margin: 0 0 20px 0;
        text-align: justify;
      }
    }
  }
}
</style>
