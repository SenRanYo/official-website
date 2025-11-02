<template>
  <div class="news-list" :style="{ '--col': col } as any">
    <div v-for="item in list" :key="item.id" class="news-item" @click="handleClick(item)">
      <!-- 日期区域 -->
      <div class="news-item__date">
        <span class="news-item__year-month">{{ item.date }}</span>
        <span v-if="item.day" class="news-item__day">{{ item.day }}</span>
      </div>

      <!-- 内容区域 -->
      <div class="news-item__content">
        <h3 class="news-item__title">{{ item.title }}</h3>
        <p class="news-item__description">{{ item.description }}</p>
      </div>

      <!-- 箭头图标 -->
      <span class="news-item__arrow">→</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 新闻项目数据接口
 */
interface NewsItem {
  id?: string
  date: string
  day?: number
  title: string
  description: string
}

/**
 * Props 定义
 */
interface Props {
  /** 新闻列表数据 */
  list?: NewsItem[]
  /** 每行显示的列数，默认为 1 */
  col?: number
}

/**
 * Emits 定义
 */
interface Emits {
  /** 新闻项点击事件 */
  (e: "click", item: NewsItem): void
}

// ==================== Props 与 Emits ====================

/** Props 定义 */
withDefaults(defineProps<Props>(), {
  list: () => [],
  col: 1,
})

/** Emits 定义 */
const emit = defineEmits<Emits>()

// ==================== 方法 ====================

/**
 * 处理新闻项点击事件
 * @param item - 被点击的新闻项
 */
const handleClick = (item: NewsItem) => {
  emit("click", item)
}
</script>

<style scoped lang="scss">
/* 新闻列表容器 */
.news-list {
  width: 100%;
  display: grid;
  column-gap: 15px;
  overflow: hidden;
  grid-template-columns: repeat(var(--col, 1), 1fr);

  /* 单列布局 */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

/* 新闻项容器 */
.news-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 30px 0;
  border-radius: 0;
  overflow: hidden;
  background-color: transparent;
  cursor: pointer;
  border-bottom: 1px solid #e5e7eb;
  transition: all 300ms ease-in-out;

  /* 悬停效果 */
  &:hover {
    box-shadow: none;
    transform: none;

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
    gap: 0.25rem;
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    padding: 0;
    text-align: center;
    border-radius: 0.25rem;
    background-color: transparent;
    border: 1px solid #e5e7eb;
    justify-content: center;
  }

  /* 年月 */
  &__year-month {
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: 500;
    letter-spacing: normal;
  }

  /* 日期数字 */
  &__day {
    font-size: 1.25rem;
    color: #1f2937;
    font-weight: 600;
  }

  /* 内容区域 */
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
  }

  /* 标题 */
  &__title {
    margin: 0;
    font-size: 0.875rem;
    color: #1f2937;
    font-weight: 600;
    line-height: 1.4;
    word-break: break-word;
    transition: color 300ms ease-in-out;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* 描述文本 */
  &__description {
    margin: 0;
    font-size: 0.75rem;
    color: #9ca3af;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 箭头图标 */
  &__arrow {
    flex-shrink: 0;
    font-size: 1.125rem;
    color: transparent;
    transition: all 300ms ease-in-out;
  }
}
</style>
