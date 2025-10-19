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
          <!-- 时间列表容器 -->
          <div ref="timelineRef" class="history__timeline-wrapper">
            <div class="history__timeline-inner">
              <div v-for="(item, index) in years" :key="index" class="history__year" :class="{ 'history__year--active': item === year }" @click="handleYearClick(item)">
                {{ item }}
              </div>
            </div>
            <!-- 指示箭头 -->
            <div class="history__timeline-indicator" />
          </div>
        </div>
      </div>

      <!-- 右侧内容展示 -->
      <div class="history__right">
        <div class="history__details">
          <div class="history__details-content">
            <div class="flex items-center">
              <div class="history__details-indicator" />
              <div class="history__details-text">
                <span class="history__details-title">远控中心投运</span>
                <span class="history__details-desc">成都远控中心正式投入运行，实现电站智能化管理，成都远控中心正式投入运行，</span>
              </div>
            </div>
            <div class="flex items-center">
              <div class="history__details-indicator" />
              <div class="history__details-text">
                <span class="history__details-title">远控中心投运</span>
                <span class="history__details-desc">成都远控中心正式投入运行，实现电站智能化管理，成都远控中心正式投入运行，</span>
              </div>
            </div>
          </div>
          <div class="history__details-image">
            <img :src="image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import image from "~/assets/images/swiper/swiper-2.jpg"
import historyBg from "~/assets/images/history-bg.webp"

const year = ref("2025")
const years = computed(() => {
  const currentYear = parseInt(year.value)
  const list = []
  // 生成前后5个年份，共11个年份
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    list.push(i.toString())
  }
  return list
})

/**
 * 处理年份点击事件，滚动到中间
 */
const handleYearClick = async (item: string) => {
  year.value = item
}
</script>

<style scoped lang="scss">
@import "~/assets/css/variables.scss";

/**
 * 发展历程组件样式 - BEM命名规范
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

  /**
   * 头部容器
   */
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /**
   * 标题包装器
   */
  &__title-wrapper {
    display: flex;
    flex-direction: column;
  }

  /**
   * 标题
   */
  &__title {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: #1f2937;
  }

  /* ============ 内容布局 ============ */

  /**
   * 内容区域
   */
  &__content {
    height: 400px;
    display: flex;
    overflow: hidden;
  }

  /**
   * 左侧时间列表
   */
  &__left {
    flex: 0 0 150px;
    display: flex;
    position: relative;
    border-right: 1px solid $primary-color;
  }

  /**
   * 时间列表
   */
  &__timeline-list {
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
  }

  /**
   * 时间列表包装器（滚动容器）
   */
  &__timeline-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  /**
   * 时间列表内容
   */
  &__timeline-inner {
    top: 50%;
    left: 0%;
    display: flex;
    position: absolute;
    flex-direction: column;
    transform: translateY(-50%);
  }

  /**
   * 指示箭头
   */
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

  /**
   * 年份项
   */
  &__year {
    width: 80px;
    display: flex;
    margin: 15px 0;
    cursor: pointer;
    font-size: 20px;
    text-align: center;
    align-items: center;
    justify-content: center;

    &--active {
      font-size: 26px;
      font-weight: bold;
    }
  }

  /**
   * 右侧内容展示
   */
  &__right {
    flex: 1;
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /**
   * 详细内容
   */
  &__details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: fadeIn $transition-normal ease-in-out;

    &-indicator {
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-left: 16px solid $primary-color;
      border-bottom: 10px solid transparent;
    }
    &-text {
      gap: 10px;
      display: flex;
      margin-left: 30px;
      flex-direction: column;
    }
  }

  /**
   * 详细内容文字部分
   */
  &__details-content {
    gap: 60px;
    display: flex;
    margin-left: 30px;
    flex-direction: column;
  }

  /**
   * 日期
   */
  &__details-date {
    font-size: 14px;
    color: #999;
    font-weight: 500;
  }

  /**
   * 标题
   */
  &__details-title {
    font-size: 18px;
    font-weight: bold;
  }

  /**
   * 描述
   */
  &__details-desc {
    font-size: 14px;
    color: #666;
    line-height: 1.8;
  }

  /**
   * 步骤列表
   */
  &__details-steps {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /**
   * 单个步骤
   */
  &__step {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /**
   * 步骤图标
   */
  &__step-icon {
    flex: 0 0 auto;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #16a34a;
    font-size: 16px;
    font-weight: bold;
  }

  /**
   * 步骤文本
   */
  &__step-text {
    flex: 1;
    font-size: 12px;
    color: #666;
    line-height: 1.5;
  }

  /**
   * 详细内容图片
   */
  &__details-image {
    width: 350px;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

/* ============ 动画 ============ */

/**
 * 淡入动画
 */
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
