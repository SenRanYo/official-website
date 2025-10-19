<template>
  <div class="history" :style="{ backgroundImage: `url(${historyBg})` }">
    <div class="history__header">
      <div class="history__title-wrapper">
        <h2 class="history__title">发展历程</h2>
      </div>
    </div>
    <div class="history__list">
      <div v-for="(item, index) in list" :key="index" class="history__item">
        <div class="history__timeline"></div>
        <div class="history__item-date">{{ item.date }}</div>
        <div class="history__item-title">{{ item.title }}</div>
        <div class="history__item-desc">{{ item.desc }}</div>
        <div class="history__steps">
          <div v-for="(step, stepIndex) in item.steps" :key="stepIndex" class="history__step">
            <span class="history__step-icon">✓</span>
            <span class="history__step-text">{{ step }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import historyBg from "~/assets/images/history-bg.webp"

/**
 * 发展历程数据结构
 */
interface HistoryItem {
  date: string
  title: string
  desc: string
  steps: string[]
}

const list = ref<HistoryItem[]>([
  {
    date: "2004年6月",
    title: "项目筹建",
    desc: "电站开始筹建工作，标志着泸定水电站建设的正式启动",
    steps: ["完成项目前期调研", "组件项目筹建团队", "启动可行性研究"],
  },
  {
    date: "2005年12月",
    title: "前期工程开工",
    desc: '"三通一平"等前期工程正式开工，为主体建设奠定基础',
    steps: ["完成场地平整", "建设临时道路", "完善基础设施"],
  },
  {
    date: "2006年6月",
    title: "公司成立",
    desc: "四川华电泸定水电有限公司正式注册成立，由华电国际负资设立",
    steps: ["公司正式注册", "完成组织架构", "建立管理体系"],
  },
  {
    date: "2009年3月",
    title: "项目核准",
    desc: "获得国家发改委项目核准，成为四川地片首个核准的大型水电站",
    steps: ["获得国家批准", "完成环保审批", "启动主题施工"],
  },
  {
    date: "2009年11月",
    title: "大江截留",
    desc: "成功实现大江截流，这是水电站建设的重要里程碑节点",
    steps: ["完成截留工程", "实现水流改道", "确保施工安全"],
  },
  {
    date: "2011年10月",
    title: "首台机组投产",
    desc: "首台机组成功投产发电，标志着电站开始发挥经济效益",
    steps: ["首台机组并网", "开始商业发电", "验证设备性能"],
  },
  {
    date: "2012年6月",
    title: "全面投产",
    desc: "4台机组全部投入商业运营，电站建设目标全面实现",
    steps: ["全部机组投运", "达到设计容量", "进入稳定运营期"],
  },
  {
    date: "2014年7月",
    title: "远控中心投运",
    desc: "成都远控中心正式投入运行，实现电站智能化管理",
    steps: ["智能化管理", "远程监控系统", "提升运营效率"],
  },
])
</script>

<style scoped lang="scss">
/* 发展历程组件样式 - BEM命名规范 */
.history {
  gap: 15px;
  display: flex;
  padding: 60px 100px;
  position: relative;
  flex-direction: column;
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;

  /* ============ 头部样式 ============ */

  /* 头部容器 */
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* 标题包装器 */
  &__title-wrapper {
    display: flex;
    flex-direction: column;
  }

  /* 标题 */
  &__title {
    margin: 0;
    color: #1f2937;
    font-size: 24px;
    font-weight: bold;
  }

  /* ============ 列表样式 ============ */

  /* 列表容器 */
  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    position: relative;
  }

  /* 列表项 */
  &__item {
    display: flex;
    flex-direction: column;
  }

  /* 时间线点 */
  &__timeline {
    position: relative;
    margin-bottom: 30px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: $primary-color;
    }

    &::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #d8d8d8;
    }
  }

  /* 项目日期 */
  &__item-date {
    margin-bottom: 10px;
    color: #333;
    font-size: 14px;
  }

  /* 项目标题 */
  &__item-title {
    margin-bottom: 5px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
  }

  /* 项目描述 */
  &__item-desc {
    color: #999;
    font-size: 14px;
    line-height: 1.5;
  }

  /* ============ 步骤列表样式 ============ */

  /* 步骤容器 */
  &__steps {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* 单个步骤项 */
  &__step {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* 步骤图标 */
  &__step-icon {
    flex: 0 0 auto;
    min-width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #16a34a;
    font-size: 16px;
    font-weight: bold;
  }

  /* 步骤文本 */
  &__step-text {
    flex: 1;
    color: #666;
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>
