<template>
  <div v-if="noticeList.length > 0" class="fixed-notice">
    <!-- 标题栏 -->
    <div class="notice-header">
      <div class="header-content">
        <i class="notice-icon">📢</i>
        <span class="header-title">公告通知</span>
        <button class="toggle-btn" :class="{ expanded: isExpanded }" @click="toggleExpand">
          <i class="toggle-icon">{{ isExpanded ? "▼" : "▲" }}</i>
        </button>
      </div>
    </div>

    <!-- 公告内容区域 -->
    <div class="notice-content" :class="{ expanded: isExpanded }">
      <div class="notice-scroll-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
        <div ref="scrollList" class="notice-scroll-list" :style="{ transform: `translateY(${scrollOffset}px)` }">
          <!-- 渲染两倍数据用于无缝循环 -->
          <div v-for="(notice, index) in displayNotices" :key="`${notice.id}-${Math.floor(index / noticeList.length)}`" class="notice-item" @click="handleNoticeClick(notice)">
            <div class="notice-dot"></div>
            <div class="notice-text">
              <span class="notice-title" :title="notice.title">{{ notice.title }}</span>
              <span class="notice-date">{{ formatDate(notice.date) }}</span>
            </div>
            <i class="notice-arrow">→</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue"

interface NoticeItem {
  id: string | number
  title: string
  date: string
  url?: string
}

// Props
const props = withDefaults(
  defineProps<{
    notices?: NoticeItem[]
    scrollSpeed?: number
    autoScroll?: boolean
    maxHeight?: string
  }>(),
  {
    notices: () => [],
    scrollSpeed: 30, // 滚动速度（像素/秒）
    autoScroll: true,
    maxHeight: "240px",
  },
)

// 响应式数据
const isExpanded = ref(false)
const scrollOffset = ref(0)
const isPaused = ref(false)
const scrollList = ref<HTMLElement>()

// 模拟公告数据（如果没有传入props）
const defaultNotices: NoticeItem[] = [
  {
    id: 1,
    title: "关于公司年度工作总结大会的通知",
    date: "2024-01-15",
    url: "/notice/1",
  },
  {
    id: 2,
    title: "春节放假安排及相关工作部署通知",
    date: "2024-01-10",
    url: "/notice/2",
  },
  {
    id: 3,
    title: "新员工入职培训计划安排通知",
    date: "2024-01-08",
    url: "/notice/3",
  },
  {
    id: 4,
    title: "办公区域安全检查及整改要求通知",
    date: "2024-01-05",
    url: "/notice/4",
  },
  {
    id: 5,
    title: "关于更新员工手册的重要通知",
    date: "2024-01-03",
    url: "/notice/5",
  },
]

// 计算属性
const noticeList = computed(() => (props.notices.length > 0 ? props.notices : defaultNotices))

// 用于循环滚动的双倍数据
const displayNotices = computed(() => [...noticeList.value, ...noticeList.value])

// 滚动相关
let scrollInterval: number | null = null
const itemHeight = 60 // 每个公告项的高度

// 方法
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
  if (!isExpanded.value) {
    stopScroll()
  } else if (props.autoScroll) {
    startScroll()
  }
}

const startScroll = () => {
  if (!props.autoScroll || noticeList.value.length <= 1) return

  stopScroll()
  scrollInterval = window.setInterval(() => {
    if (!isPaused.value && isExpanded.value) {
      scrollOffset.value -= 1

      // 当滚动到一半时重置位置，实现无缝循环
      const totalHeight = noticeList.value.length * itemHeight
      if (Math.abs(scrollOffset.value) >= totalHeight) {
        scrollOffset.value = 0
      }
    }
  }, 1000 / props.scrollSpeed)
}

const stopScroll = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval)
    scrollInterval = null
  }
}

const pauseScroll = () => {
  isPaused.value = true
}

const resumeScroll = () => {
  isPaused.value = false
}

const handleNoticeClick = (notice: NoticeItem) => {
  if (notice.url) {
    // 使用 Nuxt 的路由导航
    navigateTo(notice.url)
  }
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

// 生命周期
onMounted(() => {
  // 默认展开状态，自动开始滚动
  isExpanded.value = true
  if (props.autoScroll && noticeList.value.length > 1) {
    startScroll()
  }
})

onUnmounted(() => {
  stopScroll()
})
</script>

<style lang="scss" scoped>
@use "~/assets/css/variables" as *;

.fixed-notice {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 320px;
  background: white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-xl;
  border: 1px solid $border-color;
  z-index: 1000;
  overflow: hidden;
  transition: all $transition-normal;

  @media (max-width: $breakpoint-sm) {
    width: 280px;
    right: 10px;
    bottom: 10px;
  }
}

.notice-header {
  background: linear-gradient(135deg, $primary-color, #1e4a73);
  color: white;
  padding: 12px 16px;
  cursor: pointer;
  user-select: none;

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .notice-icon {
    font-size: 16px;
    margin-right: 8px;
  }

  .header-title {
    font-weight: 600;
    font-size: $font-size-sm;
    flex: 1;
  }

  .toggle-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    border-radius: $border-radius-sm;
    transition: all $transition-fast;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .toggle-icon {
      font-size: 12px;
      transition: transform $transition-normal;
    }

    &.expanded .toggle-icon {
      transform: rotate(180deg);
    }
  }
}

.notice-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height $transition-normal ease-in-out;

  &.expanded {
    max-height: v-bind(maxHeight);
  }
}

.notice-scroll-container {
  height: 240px;
  overflow: hidden;
  position: relative;
}

.notice-scroll-list {
  transition: transform linear;
}

.notice-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  height: 60px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    background: #f8fafc;

    .notice-arrow {
      transform: translateX(4px);
      color: $primary-color;
    }
  }

  &:last-child {
    border-bottom: none;
  }

  .notice-dot {
    width: 6px;
    height: 6px;
    background: $primary-color;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 12px;
  }

  .notice-text {
    flex: 1;
    min-width: 0;

    .notice-title {
      display: block;
      font-size: $font-size-sm;
      color: $text-color;
      line-height: 1.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }

    .notice-date {
      font-size: $font-size-xs;
      color: $text-light;
    }
  }

  .notice-arrow {
    color: #cbd5e1;
    font-size: 14px;
    transition: all $transition-fast;
    flex-shrink: 0;
    margin-left: 8px;
  }
}

// 动画优化
.notice-scroll-list {
  will-change: transform;
}

// 深色模式支持
@media (prefers-color-scheme: dark) {
  .fixed-notice {
    background: #1f2937;
    border-color: #374151;
  }

  .notice-item {
    border-bottom-color: #374151;

    &:hover {
      background: #374151;
    }

    .notice-title {
      color: #f9fafb;
    }

    .notice-date {
      color: #9ca3af;
    }
  }
}
</style>
