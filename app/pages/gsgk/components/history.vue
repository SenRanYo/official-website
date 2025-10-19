<template>
  <div class="history" :style="{ backgroundImage: `url(${historyBg})` }">
    <div class="history__header">
      <div class="history__title-wrapper">
        <h2 class="history__title">发展历程</h2>
      </div>
    </div>
    <div class="history__content">
      <!-- 左侧时间列表 -->
      <div class="history__left">
        <div class="history__timeline-list">
          <div ref="timelineRef" class="history__timeline-wrapper">
            <div class="history__timeline-inner">
              <div v-for="(item, index) in years" :key="index" class="history__year" :class="{ 'history__year--active': item === year }" @click="handleYearClick(item)">
                {{ item }}
              </div>
            </div>
            <div class="history__timeline-indicator" />
          </div>
        </div>
      </div>

      <!-- 右侧内容展示 -->
      <div class="history__right">
        <div class="history__details">
          <div class="history__details-content">
            <div v-for="item in currentData" :key="item.id" class="history__details-item">
              <div class="history__details-indicator" />
              <div class="history__details-text">
                <span class="history__details-title">{{ item.title }}</span>
                <span class="history__details-desc">{{ item.desc }}</span>
              </div>
            </div>
          </div>
          <div class="history__details-image">
            <img :src="image" :alt="year" />
          </div>
        </div>
        <!-- 加载状态 -->
        <Transition name="loading-modal">
          <div v-if="isLoading" class="history__loading-overlay">
            <div class="history__loading-placeholder">
              <div class="history__loading-spinner" />
              <span class="history__loading-text">正在加载中...</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { getHistoryList } from "~/api/news"
import image from "~/assets/images/swiper/swiper-2.jpg"
import historyBg from "~/assets/images/history-bg.webp"

const year = ref("2025")
const isLoading = ref(false)
const currentData = ref<any[]>([])

const years = computed(() => {
  const currentYear = parseInt(year.value)
  const list = []
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    list.push(i.toString())
  }
  return list
})

// 获取历史数据
const fetchHistoryData = async (y: string) => {
  const list = await getHistoryList({ date: y })
  currentData.value = list
}

// 处理年份点击事件
const handleYearClick = async (item: string) => {
  if (item === year.value) return

  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 500))
  year.value = item
  await fetchHistoryData(item)
  isLoading.value = false
}

// 初始化数据
fetchHistoryData("2025")
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss";

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

/**
 * 发展历程组件 - BEM 命名规范
 */
.history {
  gap: 30px;
  width: 100%;
  display: flex;
  padding: 60px 100px;
  position: relative;
  flex-direction: column;
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;

  /* ============ 头部样式 ============ */
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title-wrapper {
    display: flex;
    flex-direction: column;
  }

  &__title {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: #1f2937;
  }

  /* ============ 内容布局 ============ */
  &__content {
    height: 350px;
    display: flex;
    overflow: hidden;
    margin-top: 30px;
  }

  /* ============ 左侧时间线 ============ */
  &__left {
    flex: 0 0 150px;
    display: flex;
    position: relative;
    border-right: 1px solid $primary-color;
  }

  &__timeline-list {
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
  }

  &__timeline-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  &__timeline-inner {
    top: 50%;
    left: 0;
    display: flex;
    position: absolute;
    flex-direction: column;
    transform: translateY(-50%);
  }

  &__timeline-indicator {
    top: 50%;
    right: 50px;
    z-index: 10;
    width: 0;
    height: 0;
    position: absolute;
    transform: translateY(-50%);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 16px solid $primary-color;
  }

  &__year {
    width: 80px;
    margin: 15px 0;
    padding: 0;
    display: flex;
    cursor: pointer;
    font-size: 20px;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: inherit;

    &--active {
      font-size: 26px;
      font-weight: bold;
    }
  }

  /* ============ 右侧内容 ============ */
  &__right {
    flex: 1;
    padding: 60px;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
  }

  &__details {
    gap: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: fadeIn $transition-normal ease-in-out;
  }

  &__details-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  &__details-item {
    gap: 30px;
    display: flex;
    align-items: center;
  }

  &__details-indicator {
    flex: 0 0 auto;
    width: 0;
    height: 0;
    margin-top: 4px;
    border-left: 16px solid $primary-color;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }

  &__details-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__details-date {
    font-size: 12px;
    font-weight: 500;
    color: #999;
  }

  &__details-title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  &__details-desc {
    font-size: 14px;
    color: #666;
    line-height: 1.8;
  }

  &__details-image {
    flex: 0 0 350px;
    width: 350px;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  /* ============ 加载状态 ============ */
  &__loading-overlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.1);
  }

  &__loading-placeholder {
    gap: 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  &__loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e5e7eb;
    border-top-color: $primary-color;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  &__loading-text {
    font-size: 14px;
    font-weight: 500;
    color: #4b5563;
  }
}

/* ============ 动画 ============ */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
