<template>
  <div class="gsgk-page">
    <Description text="公司概况" :image="bannerImage" />

    <Tabs :anchors="anchors" :active-anchor="activeAnchor" @change="scrollToAnchor" />

    <!-- 主容器 -->
    <div class="page-content">
      <!-- 公司简介区块 -->
      <section :ref="(el) => registerSection('gsjj', el as HTMLElement | null)" class="section section-gsjj" data-anchor="gsjj">
        <div class="section-container">
          <h2 class="section-title">公司简介</h2>
          <!-- 占位符：公司简介内容将在这里呈现 -->
          <div class="section-placeholder">公司简介内容区域</div>
        </div>
      </section>

      <!-- 领导班子区块 -->
      <section :ref="(el) => registerSection('ldbz', el as HTMLElement | null)" class="section section-ldbz" data-anchor="ldbz">
        <div class="section-container">
          <h2 class="section-title">领导班子</h2>
          <!-- 占位符：领导班子内容将在这里呈现 -->
          <div class="section-placeholder">领导班子内容区域</div>
        </div>
      </section>

      <!-- 组织机构区块 -->
      <section :ref="(el) => registerSection('zzjg', el as HTMLElement | null)" class="section section-zzjg" data-anchor="zzjg">
        <div class="section-container">
          <h2 class="section-title">组织机构</h2>
          <!-- 占位符：组织机构内容将在这里呈现 -->
          <div class="section-placeholder">组织机构内容区域</div>
        </div>
      </section>

      <!-- 发展历程区块 -->
      <section :ref="(el) => registerSection('fzlc', el as HTMLElement | null)" class="section section-fzlc" data-anchor="fzlc">
        <div class="section-container">
          <h2 class="section-title">发展历程</h2>
          <!-- 占位符：发展历程内容将在这里呈现 -->
          <div class="section-placeholder">发展历程内容区域</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from "./components/tabs.vue"
import { useAnchorNavigation } from "~/composables/useAnchorNavigation"
import bannerImage from "~/assets/images/swiper/swiper-4.jpg"

/**
 * 锚点列表配置
 * 每个锚点对应一个区块，title用于显示在tab中，id用于标识和滚动
 */
const anchors = [
  { id: "gsjj", title: "公司简介" },
  { id: "ldbz", title: "领导班子" },
  { id: "zzjg", title: "组织机构" },
  { id: "fzlc", title: "发展历程" },
]

// 使用锚点导航composable
// 返回值：
// - activeAnchor: 当前激活的锚点id (响应式)
// - registerSection: 注册区块DOM引用的函数
// - scrollToAnchor: 滚动到指定锚点的函数
const { activeAnchor, registerSection, scrollToAnchor } = useAnchorNavigation()
</script>

<style scoped lang="scss">
.gsgk-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* 页面主容器 */
.page-content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* 区块通用样式 */
.section {
  width: 100%;
  padding: 80px 20px;
  scroll-margin-top: 60px; /* 固定导航栏高度 */

  .section-container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  /* 区块标题样式 */
  .section-title {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin: 0 0 40px 0;
    padding-bottom: 20px;
    border-bottom: 2px solid #0066ff;
    display: inline-block;
  }

  /* 占位符样式（开发时用） */
  .section-placeholder {
    min-height: 300px;
    padding: 40px;
    background-color: #f9f9f9;
    border: 2px dashed #ddd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #999;
    font-style: italic;
  }
}

/* 各区块的特定背景颜色（可选） */
.section-gsjj {
  background-color: #ffffff;
}

.section-ldbz {
  background-color: #fafafa;
}

.section-zzjg {
  background-color: #ffffff;
}

.section-fzlc {
  background-color: #fafafa;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .section {
    padding: 40px 16px;

    .section-title {
      font-size: 24px;
      margin-bottom: 20px;
    }

    .section-placeholder {
      min-height: 200px;
      padding: 24px;
      font-size: 16px;
    }
  }
}
</style>
