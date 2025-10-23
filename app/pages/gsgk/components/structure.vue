<template>
  <section class="section section-zzjg" data-anchor="zzjg">
    <img :src="zzjg" alt="" />
  </section>
</template>

<script setup lang="ts">
import zzjg from "~/assets/images/zzjg.png"

// 此组件无需任何逻辑
// 只需设置 data-anchor 属性，useAnchorNavigation 会自动找到这个元素
</script>

<style scoped lang="scss">
/* 组织机构区块样式 */
.section {
  width: 100%;
  padding: 80px 160px;
  scroll-margin-top: 60px; /* 固定导航栏高度 */
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

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
