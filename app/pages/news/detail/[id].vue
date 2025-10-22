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
import image from "~/assets/images/news-bg.webp"

// 新闻数据接口
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

/**
 * 获取新闻详情数据
 * 模拟从API获取数据
 */
const fetchNewsDetail = async () => {
  const newsId = route.params.id

  // 这里应该调用实际的API接口获取新闻详情
  // const response = await getNewsDetail(newsId)

  // 模拟数据
  newsData.value = {
    id: String(newsId),
    title: '"三维发力"推动学习教育落地见效',
    publishDate: "2025-08-13",
    views: 9,
    author: "李欣澜",
    collect: "收藏本文",
    image: "",
    content: `
      <p>自深入贯彻中央八项规定精神学习教育开展以来，公司党委锚定"学思想、强作风、促实干"目标，通过项目设计、系统学习、成果转化三维驱动，推动学习教育走深走实、常态长效，为企业高质量发展提供坚强有力的作风保障。</p>

      <p>项层设计突出精准时效，学习教育全面铺开。公司党委第一时间召开部署，随保学习教育高起点开局。召开专题委会传达中央精神，制定《学习教育重点工作任务清单》，创新打造"情景教学+鲜活案例+现身说法"特色实践模式，实现领导干部、年经管、关键岗位员工覆盖。各党支部迅速应对，通过"领学+研讨"线上+线下多元开展学习，同步开展"作风建设大家谈"活动，推动学习教育从"有形覆盖"迈向"有效覆盖"。</p>

      <p>系统学习强化导向实效，学习教育全面深化。与保学用融合，将教育成果切实转化为公司治理效能与发展动力。精准施治除垢，深入基层一线指导问题、深化根源、找准病灶，推动整改落实。崇尚"四风"隐形变异，针对个务待和公务用车等重点领域，并展全面自查和专项督查，以专项治理为重点，重点核查领导干部事业。督促参加警示教育领导干部审视、创新意识、"活学"渗透，打造党性数教。</p>

      <p>成果转化注重长效融合，融诚高质量发展。坚持学用结合从，深入基层一线指导问题、深化根源、找准病灶，推动整改落实。崇尚"四风"隐形变异，针对个务待和公务用车等重点领域，并展全面自查和专项督查。以专项治理为重点、重点核查领导干部事业。督促参加警示教育领导干部审视、创新意识、"活学"渗透，打造党性数教。各党支部迅速应对，通过多元化的学习形式开展学习。</p>
    `,
    description: "自深入贯彻中央八项规定精神学习教育开展以来，公司党委锚定学思想、强作风、促实干目标...",
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
  padding: 80px 160px;
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
