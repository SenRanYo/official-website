<template>
  <section class="section" data-anchor="gsjj">
    <div class="section-container">
      <div class="overview-wrapper">
        <!-- 左侧图片 -->
        <div class="overview-image">
          <img src="@/assets/images/swiper/swiper-1.jpg" alt="公司介绍" />
        </div>

        <!-- 右侧内容 -->
        <div class="overview-content">
          <!-- 标题和描述 -->
          <div class="overview-text">
            <h2 class="section-title">公司介绍</h2>
            <p class="description">四川华电泸定水电有限公司（以下简称公司）于2006年6月注册成立，由华电国际电力股份有限公司全资设立，负责泸定水电站的投资、建设和运营。</p>
          </div>

          <!-- 数据指标 -->
          <div class="data-metrics">
            <div class="metric-item">
              <div class="metric-value">920</div>
              <div class="metric-label">MW总装机容量</div>
            </div>
            <div class="metric-item">
              <div class="metric-value">37.8</div>
              <div class="metric-label">亿KW.h年发电量</div>
            </div>
            <div class="metric-item">
              <div class="metric-value">2012</div>
              <div class="metric-label">年全面投产</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 此组件无需任何逻辑
// 只需设置 data-anchor 属性，useAnchorNavigation 会自动找到这个元素
</script>

<style scoped lang="scss">
/* 公司介绍区块样式 */
.section {
  width: 100%;
  padding: 60px 100px;
  scroll-margin-top: 60px;
  background-color: #ffffff;
  position: relative;

  .section-container {
    width: 100%;
    margin: 0 auto;
  }

  /* 布局容器：两列式左图右文 */
  .overview-wrapper {
    display: flex;
    gap: 60px;
    align-items: flex-start;
  }

  /* 左侧图片区域 */
  .overview-image {
    flex: 0 0 35%;
    min-width: 0;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: -30px;
      right: -30px;
      width: 100px;
      height: 15px;
      background: linear-gradient(to left, #0066ff, rgba(0, 102, 255, 0));
      pointer-events: none;
    }

    &::after {
      content: "";
      position: absolute;
      top: -30px;
      right: -30px;
      width: 15px;
      height: 100px;
      background: linear-gradient(to bottom, #0066ff, rgba(0, 102, 255, 0));
      pointer-events: none;
    }

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  /* 右侧内容区域 */
  .overview-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* 文字区域 */
  .overview-text {
    margin-bottom: 40px;

    /* 区块标题样式 */
    .section-title {
      color: #333;
      margin: 0;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    /* 描述文本样式 */
    .description {
      font-size: 14px;
      line-height: 1.8;
      color: #666;
      margin: 0;
    }
  }

  /* 数据指标容器 */
  .data-metrics {
    display: flex;
    gap: 30px;
    justify-content: space-between;
  }

  /* 单个指标项 */
  .metric-item {
    flex: 1;
    text-align: center;

    /* 指标数值 */
    .metric-value {
      font-size: 36px;
      font-weight: bold;
      color: #0066ff;
      margin-bottom: 10px;
    }

    /* 指标标签 */
    .metric-label {
      font-size: 12px;
      color: #999;
      line-height: 1.6;
    }
  }
}
</style>
