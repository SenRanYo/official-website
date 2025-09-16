<template>
  <div class="company-news">
    <!-- 页面标题 -->
    <div class="page-title">
      <h1>国资动态</h1>
    </div>

    <!-- 新闻列表 -->
    <div class="news-list">
      <div v-for="item in currentPageNews" :key="item.id" class="news-item">
        <div class="news-content">
          <h3 class="news-title">{{ item.title }}</h3>
          <p class="news-summary">{{ item.summary }}</p>
          <div class="news-date">{{ item.date }}</div>
        </div>
      </div>
    </div>

    <!-- 分页组件 -->
    <div class="pagination">
      <button :disabled="currentPage === 1" class="page-btn" @click="goToPage(1)">首页</button>
      <button :disabled="currentPage === 1" class="page-btn" @click="goToPage(currentPage - 1)">上一页</button>

      <button v-for="page in visiblePages" :key="page" class="page-btn" :class="{ active: page === currentPage }" @click="goToPage(page)">
        {{ page }}
      </button>

      <button :disabled="currentPage === totalPages" class="page-btn" @click="goToPage(currentPage + 1)">下一页</button>
      <button :disabled="currentPage === totalPages" class="page-btn" @click="goToPage(totalPages)">尾页</button>

      <div class="page-info">
        跳至
        <input v-model="jumpPage" type="number" min="1" :max="totalPages" class="page-input" @keyup.enter="jumpToPage" />
        页
      </div>

      <button class="page-btn" @click="jumpToPage">确定</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

definePageMeta({ layout: "section" })

// 模拟新闻数据
const newsData = ref([
  {
    id: 1,
    title: "习近平总书记的国企足迹",
    summary: "",
    date: "2024-09-10",
  },
  {
    id: 2,
    title: "国务院国资委党委召开理论学习中心组集体学习会 传承和弘扬伟大抗战精神 合力谱写中国式现代化国...",
    summary: "",
    date: "2025-09-10",
  },
  {
    id: 3,
    title: "国务院国资委党委召开扩大会议暨党建工作领导小组会议 锚定不舍落实中央八项规定精神国资央...",
    summary: "",
    date: "2025-09-05",
  },
  {
    id: 4,
    title: "国务院国资委党委召开理论学习中心组集体学习会 学深悟透党的创新理论最新成果 筑牢国资央企高质...",
    summary: "",
    date: "2025-09-02",
  },
  {
    id: 5,
    title: "《党建》杂志刊发国务院国资委党委署名文章：以过硬作风有力保障国资央企高质量发展",
    summary: "",
    date: "2025-09-02",
  },
  {
    id: 6,
    title: "国务院国资委党委认真学习贯彻习近平总书记在听取自治区党委和政府工作汇报时的重要讲话精神 ...",
    summary: "",
    date: "2025-08-27",
  },
  {
    id: 7,
    title: "《旗帜》刊发国务院国资委党委署名文章：在培育壮大新质生产力上当好排头兵",
    summary: "",
    date: "2025-08-25",
  },
  {
    id: 8,
    title: "国务院国资委党委传达学习习近平总书记近期重要讲话重要指示精神",
    summary: "",
    date: "2025-08-04",
  },
  {
    id: 9,
    title: "《机关党建研究》杂志刊发国务院国资委党委署名文章：以作风建设新成效为国资央企高质量发展提供...",
    summary: "",
    date: "2025-07-29",
  },
  {
    id: 10,
    title: "国务院国资委党委传达学习习近平总书记在中央城市工作会议上重要讲话精神 为建设现代化人民城市贡...",
    summary: "",
    date: "2025-07-23",
  },
  {
    id: 11,
    title: "国务院国资委举办中央企业负责人研讨班 注重提升'五个价值'推进高质量发展 有力有效应对局势稳大...",
    summary: "",
    date: "2025-07-21",
  },
  {
    id: 12,
    title: "国务院国资委党委专题学习习近平总书记重要讲话重要指示批示精神 强化政治担当机关作风建设 更好...",
    summary: "",
    date: "2025-07-11",
  },
])

// 分页相关数据
const currentPage = ref(1)
const pageSize = ref(8) // 每页显示8条
const jumpPage = ref("")

// 计算总页数
const totalPages = computed(() => Math.ceil(newsData.value.length / pageSize.value))

// 当前页显示的新闻
const currentPageNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return newsData.value.slice(start, end)
})

// 可见的页码
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  let start = Math.max(1, current - 2)
  let end = Math.min(total, current + 2)

  // 确保显示5个页码（如果总页数足够）
  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(total, start + 4)
    } else {
      start = Math.max(1, end - 4)
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// 跳转到指定页面
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// 跳转页面功能
const jumpToPage = () => {
  const page = parseInt(jumpPage.value)
  if (!isNaN(page) && page >= 1 && page <= totalPages.value) {
    goToPage(page)
    jumpPage.value = ""
  }
}
</script>

<style scoped lang="scss">
.company-news {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;

  .page-title {
    margin-bottom: 30px;

    h1 {
      font-size: 24px;
      color: #2c5aa0;
      font-weight: 600;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 10px;
    }
  }

  .news-list {
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px 20px;

    .news-item {
      padding: 20px;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      transition: all 0.3s ease;
      background: #fff;

      &:hover {
        background-color: #f8f9fa;
        border-color: #e0e0e0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .news-content {
        .news-title {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 12px;
          color: #333;
          cursor: pointer;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 48px;

          &:hover {
            color: #2c5aa0;
          }
        }

        .news-summary {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-date {
          font-size: 12px;
          color: #999;
          text-align: right;
        }
      }
    }
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;

    .page-btn {
      padding: 8px 12px;
      border: 1px solid #d9d9d9;
      background: #fff;
      color: #666;
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        color: #2c5aa0;
        border-color: #2c5aa0;
      }

      &.active {
        background: #2c5aa0;
        color: #fff;
        border-color: #2c5aa0;
      }

      &:disabled {
        color: #ccc;
        cursor: not-allowed;
        border-color: #f0f0f0;
        background: #f9f9f9;
      }
    }

    .page-info {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 16px;
      font-size: 14px;
      color: #666;

      .page-input {
        width: 50px;
        padding: 4px 8px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        text-align: center;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: #2c5aa0;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .company-news {
    padding: 15px;

    .page-title h1 {
      font-size: 20px;
    }

    .news-list {
      grid-template-columns: 1fr;
      gap: 20px;

      .news-item {
        padding: 15px;

        .news-content .news-title {
          font-size: 15px;
          min-height: auto;
        }
      }
    }

    .pagination {
      gap: 4px;

      .page-btn {
        padding: 6px 10px;
        font-size: 13px;
      }

      .page-info {
        margin: 0 8px;
        font-size: 13px;

        .page-input {
          width: 40px;
        }
      }
    }
  }
}
</style>
