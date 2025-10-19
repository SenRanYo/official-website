<template>
  <div class="xwzx-page">
    <!-- 页面标题 -->
    <Description text="新闻中心" :image="image" />

    <!-- 分类标签 -->
    <Tabs v-model="category" :list="categorys" @change="onCategoryChange" />

    <div class="px-[100px]">
      <News :list="newsList" :col="2" @click="onNewsClick" />
    </div>

    <!-- 分页组件 -->
    <Pagination v-model="currentPage" :total-pages="totalPages" :total="total" :page-size="pageSize" show-jump show-page-size show-stats @change="handlePaginationChange" />
  </div>
</template>

<script setup lang="ts">
import Tabs from "./components/tabs.vue"
import image from "~/assets/images/news-bg.webp"
import { getNewsList } from "~/api/news"

const route = useRoute()
const router = useRouter()

const category = ref("gsyw")
const categorys = ref<any[]>([
  { title: "公司要闻", value: "gsyw" },
  { title: "公司动态", value: "gsdt" },
  { title: "公司公告", value: "gsgg" },
  { title: "媒体聚焦", value: "mtjj" },
  { title: "专题聚焦", value: "ztjj" },
])

/** 当前页码 */
const currentPage = ref(1)

/** 每页条数 */
const pageSize = ref(10)

/** 总条数 */
const total = ref(0)

/** 新闻列表 */
const newsList = ref<any[]>([])

/** 加载状态 */
const isLoading = ref(false)

// ==================== 计算属性 ====================

/**
 * 计算总页数
 */
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

watch(() => category.value, handleTabChange)
watch(
  () => route.query.category,
  (value) => {
    if (value) {
      category.value = value as string
    }
  },
  { immediate: true },
)

// ==================== 方法 ====================

/**
 * 加载新闻列表
 * @param page - 页码（可选，默认使用当前页码）
 * @param size - 每页条数（可选，默认使用当前每页条数）
 */
const loadNews = async (page: number = currentPage.value, size: number = pageSize.value) => {
  isLoading.value = true

  try {
    // 调用 API 获取新闻列表
    const response = await getNewsList({
      category: category.value,
      page,
      pageSize: size,
    })

    // 处理响应数据
    if (Array.isArray(response)) {
      // 如果直接返回数组
      newsList.value = response
      total.value = response.length
    } else if (response && typeof response === "object") {
      // 如果返回对象，从中提取数据
      const resData = response as any
      newsList.value = resData.data || resData.list || []
      total.value = resData.total || newsList.value.length
    }
  } catch {
    // 错误处理 - 加载失败时清空列表
    newsList.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

/**
 * 处理分页改变
 */
const handlePaginationChange = (params: { page: number; pageSize: number }) => {
  currentPage.value = params.page
  pageSize.value = params.pageSize
  loadNews(params.page, params.pageSize)
}

function onNewsClick(value: any) {
  router.push({
    path: `/news/detail/${value.id}`,
  })
}

function handleTabChange() {
  currentPage.value = 1
  loadNews(1, pageSize.value)
}

function onCategoryChange(value: string) {
  router.push({
    path: "/xwzx",
    query: { category: value },
  })
}

/**
 * 组件挂载时加载初始数据
 */
onMounted(() => {
  loadNews()
})
</script>

<style scoped lang="scss">
/* 页面容器 */
.xwzx-page {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
}

/* 内容区域 */
.xwzx-content {
  width: 100%;
  padding: 60px 100px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background-color: #fafafa;

  /* 加载状态 */
  .xwzx-loading {
    text-align: center;
    padding: 60px 20px;
    font-size: 18px;
    color: #6b7280;
  }

  /* 新闻列表 */
  .news-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* 新闻项 */
  .news-item {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
    transition: all 300ms ease-in-out;

    &:hover {
      box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);

      .news-item__title {
        color: #108cf0;
      }

      .news-item__arrow {
        color: #108cf0;
        transform: translateX(4px);
      }
    }

    /* 日期区域 */
    &__date {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
      min-width: 60px;
      padding: 12px;
      text-align: center;
      border-radius: 6px;
      background-color: #f0f6ff;
    }

    /* 年月 */
    &__year-month {
      font-size: 14px;
      color: #108cf0;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    /* 日 */
    &__day {
      font-size: 18px;
      color: #1f2937;
      font-weight: 600;
    }

    /* 内容区域 */
    &__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }

    /* 标题 */
    &__title {
      margin: 0;
      font-size: 16px;
      color: #1f2937;
      font-weight: 600;
      line-height: 1.6;
      word-break: break-word;
      transition: color 300ms ease-in-out;
    }

    /* 描述 */
    &__description {
      margin: 0;
      font-size: 14px;
      color: #6b7280;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* 箭头 */
    &__arrow {
      flex-shrink: 0;
      font-size: 20px;
      color: #e5e7eb;
      transition: all 300ms ease-in-out;
    }
  }

  /* 空状态 */
  .news-empty {
    text-align: center;
    padding: 80px 20px;
    font-size: 18px;
    color: #6b7280;
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .xwzx-content {
    padding: 40px 60px;
  }
}

@media (max-width: 768px) {
  .xwzx-content {
    padding: 30px 20px;
    gap: 30px;

    .news-item {
      gap: 16px;
      padding: 16px;
      flex-direction: column;

      &__date {
        min-width: auto;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        padding: 8px 12px;
      }

      &__year-month {
        font-size: 12px;
      }

      &__day {
        font-size: 16px;
      }

      &__title {
        font-size: 14px;
      }

      &__description {
        font-size: 12px;
        -webkit-line-clamp: 1;
        line-clamp: 1;
      }

      &__arrow {
        display: none;
      }
    }

    .news-empty {
      padding: 60px 20px;
    }
  }
}
</style>
