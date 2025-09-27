<template>
  <template v-if="notices.length > 0">
    <!-- 最小化状态 -->
    <div v-if="store.isMinimized" class="fixed-notice-minimized" @click="store.restore">
      <div class="minimized-icon">📢</div>
      <div v-if="count > 0" class="minimized-count">{{ count }}</div>
    </div>

    <!-- 正常状态 -->
    <div v-else class="fixed-notice">
      <!-- 标题栏 -->
      <div class="notice-header">
        <div class="header-content">
          <i class="notice-icon">📢</i>
          <span class="header-title">公告通知</span>
          <div class="header-actions">
            <button class="action-btn minimize-btn" title="最小化" @click="store.minimize">
              <i class="action-icon">−</i>
            </button>
          </div>
        </div>
      </div>

      <!-- 分类标签 -->
      <div class="notice-tabs">
        <button v-for="tab in tabs" :key="tab.key" class="tab-btn" :class="{ active: store.activeTab === tab.key }" @click="handleTabSwitch(tab.key)">
          {{ tab.label }}
          <span v-if="getTabCount(tab.key) > 0" class="tab-count">({{ getTabCount(tab.key) }})</span>
        </button>
      </div>

      <!-- 公告内容区域 -->
      <div class="notice-content">
        <div class="notice-scroll-container" @mouseenter="handleScrollPause" @mouseleave="handleScrollResume">
          <div ref="scrollList" class="notice-scroll-list" :style="{ transform: `translateY(${scrollOffset}px)` }">
            <!-- 渲染两倍数据用于无缝循环 -->
            <div v-for="(notice, index) in displayList" :key="`${notice.id}-${Math.floor(index / filteredNotices.length)}`" class="notice-item" @click="handleNoticeClick(notice)">
              <div class="notice-dot" :class="`dot-${notice.type}`"></div>
              <div class="notice-text">
                <span class="notice-title" :title="notice.title">{{ notice.title }}</span>
                <div class="notice-meta">
                  <span class="notice-date">{{ handleDateFormat(notice.date) }}</span>
                  <span class="notice-type" :class="`type-${notice.type}`">{{ handleTypeLabel(notice.type) }}</span>
                </div>
              </div>
              <i class="notice-arrow">→</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue"
import { useFixedNoticeStore } from "~/store/fixedNotice"

interface NoticeItem {
  id: string | number
  title: string
  date: string
  url?: string
  type: "factory" | "daily" // 厂务公开 | 日常通知
}

// Props
const props = withDefaults(
  defineProps<{
    scrollSpeed?: number
    autoScroll?: boolean
    maxHeight?: string
  }>(),
  {
    scrollSpeed: 30, // 滚动速度（像素/秒）
    autoScroll: true,
    maxHeight: "240px",
  },
)

// 使用 store
const store = useFixedNoticeStore()

// 响应式数据
const scrollOffset = ref(0)
const isPaused = ref(false)
const scrollList = ref<HTMLElement>()
const notices = ref<NoticeItem[]>([])

// 分类标签配置
const tabs = [
  { key: "all" as const, label: "全部" },
  { key: "factory" as const, label: "厂务公开" },
  { key: "daily" as const, label: "日常通知" },
]

// 滚动相关
let scrollInterval: number | null = null
const itemHeight = 60 // 每个公告项的高度

// 计算属性

// 公告总数
const count = computed(() => notices.value.length)

// 根据当前标签过滤的通知列表
const filteredNotices = computed(() => {
  if (store.activeTab === "all") {
    return notices.value
  }
  return notices.value.filter((notice) => notice.type === store.activeTab)
})

// 用于循环滚动的双倍数据
const displayList = computed(() => [...filteredNotices.value, ...filteredNotices.value])

// 获取标签对应的数量
const getTabCount = (tabKey: string) => {
  if (tabKey === "all") return notices.value.length
  return notices.value.filter((notice) => notice.type === tabKey).length
}

// 方法

/**
 * 模拟接口获取公告数据
 */
const handleFetchNotices = async () => {
  // 模拟异步请求
  return new Promise<NoticeItem[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "关于公司年度工作总结大会的通知",
          date: "2024-01-15",
          url: "/notice/1",
          type: "daily",
        },
        {
          id: 2,
          title: "春节放假安排及相关工作部署通知",
          date: "2024-01-10",
          url: "/notice/2",
          type: "daily",
        },
        {
          id: 3,
          title: "生产车间安全规程及操作指南公示",
          date: "2024-01-08",
          url: "/notice/3",
          type: "factory",
        },
        {
          id: 4,
          title: "办公区域安全检查及整改要求通知",
          date: "2024-01-05",
          url: "/notice/4",
          type: "daily",
        },
        {
          id: 5,
          title: "环保设施运行状况及排放数据公开",
          date: "2024-01-03",
          url: "/notice/5",
          type: "factory",
        },
        {
          id: 6,
          title: "员工福利制度及申请流程公示",
          date: "2024-01-02",
          url: "/notice/6",
          type: "factory",
        },
      ])
    }, 300)
  })
}

/**
 * 开始滚动
 */
const handleScrollStart = () => {
  if (!props.autoScroll || filteredNotices.value.length <= 1) return

  handleScrollStop()
  scrollInterval = window.setInterval(() => {
    if (!isPaused.value) {
      scrollOffset.value -= 1

      // 当滚动到一半时重置位置，实现无缝循环
      const totalHeight = filteredNotices.value.length * itemHeight
      if (Math.abs(scrollOffset.value) >= totalHeight) {
        scrollOffset.value = 0
      }
    }
  }, 1000 / props.scrollSpeed)
}

/**
 * 停止滚动
 */
const handleScrollStop = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval)
    scrollInterval = null
  }
}

/**
 * 暂停滚动
 */
const handleScrollPause = () => {
  isPaused.value = true
}

/**
 * 恢复滚动
 */
const handleScrollResume = () => {
  isPaused.value = false
}

/**
 * 点击公告项
 */
const handleNoticeClick = (notice: NoticeItem) => {
  if (notice.url) {
    // 使用 Nuxt 的路由导航
    navigateTo(notice.url)
  }
}

/**
 * 格式化日期
 */
const handleDateFormat = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

/**
 * 获取类型标签
 */
const handleTypeLabel = (type: "factory" | "daily") => {
  return type === "factory" ? "厂务公开" : "日常通知"
}

/**
 * 切换标签
 */
const handleTabSwitch = (tabKey: "all" | "factory" | "daily") => {
  store.switchTab(tabKey)
}

// 监听状态变化
watch(
  () => store.activeTab,
  () => {
    scrollOffset.value = 0 // 重置滚动位置
    if (props.autoScroll && filteredNotices.value.length > 1) {
      handleScrollStart()
    }
  },
)

// 生命周期
onMounted(async () => {
  // 获取公告数据
  notices.value = await handleFetchNotices()

  // 开始自动滚动
  if (props.autoScroll && filteredNotices.value.length > 1) {
    handleScrollStart()
  }
})

onUnmounted(() => {
  handleScrollStop()
})
</script>

<style lang="scss" scoped>
@use "~/assets/css/variables" as *;

// 最小化状态样式
.fixed-notice-minimized {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, $primary-color, #1e4a73);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: $shadow-xl;
  z-index: 1000;
  transition: all $transition-normal;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .minimized-icon {
    font-size: 24px;
    color: white;
  }

  .minimized-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff4757;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
  }

  @media (max-width: $breakpoint-sm) {
    right: 10px;
    bottom: 10px;
  }
}

.fixed-notice {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 360px;
  background: white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-xl;
  border: 1px solid $border-color;
  z-index: 1000;
  overflow: hidden;
  transition: all $transition-normal;

  @media (max-width: $breakpoint-sm) {
    width: 320px;
    right: 10px;
    bottom: 10px;
  }
}

.notice-header {
  background: linear-gradient(135deg, $primary-color, #1e4a73);
  color: white;
  padding: 12px 16px;
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

  .header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .action-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px 6px;
    border-radius: $border-radius-sm;
    transition: all $transition-fast;
    font-size: 14px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .action-icon {
      font-size: 14px;
      font-weight: bold;
    }
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

// 分类标签样式
.notice-tabs {
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;

  .tab-btn {
    flex: 1;
    background: none;
    border: none;
    padding: 10px 12px;
    font-size: $font-size-xs;
    color: $text-light;
    cursor: pointer;
    transition: all $transition-fast;
    position: relative;

    &:hover {
      background: #e2e8f0;
      color: $text-color;
    }

    &.active {
      color: $primary-color;
      background: white;
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: $primary-color;
      }
    }

    .tab-count {
      margin-left: 4px;
      font-weight: normal;
      opacity: 0.7;
    }
  }
}

.notice-content {
  max-height: v-bind(maxHeight);
  overflow: hidden;
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
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 12px;

    &.dot-factory {
      background: #10b981; // 绿色 - 厂务公开
    }

    &.dot-daily {
      background: $primary-color; // 蓝色 - 日常通知
    }
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

    .notice-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .notice-date {
      font-size: $font-size-xs;
      color: $text-light;
    }

    .notice-type {
      font-size: $font-size-xs;
      padding: 2px 6px;
      border-radius: 10px;
      font-weight: 500;
      white-space: nowrap;

      &.type-factory {
        background: #dcfce7;
        color: #16a34a;
      }

      &.type-daily {
        background: #dbeafe;
        color: #2563eb;
      }
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

  .notice-tabs {
    background: #374151;
    border-bottom-color: #4b5563;

    .tab-btn {
      color: #9ca3af;

      &:hover {
        background: #4b5563;
        color: #f9fafb;
      }

      &.active {
        background: #1f2937;
        color: #60a5fa;
      }
    }
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

    .notice-type {
      &.type-factory {
        background: #064e3b;
        color: #34d399;
      }

      &.type-daily {
        background: #1e3a8a;
        color: #93c5fd;
      }
    }
  }
}
</style>
