<template>
  <div class="index-topic-wrapper">
    <div class="index-topic">
      <div class="index-topic__top">
        <div class="index-topic__top--left">
          <div class="index-topic__title-section">
            <p class="index-topic__title-en">In Focus</p>
            <h2 class="index-topic__title-cn">专题聚焦</h2>
          </div>
        </div>
        <div class="index-topic__top--right"></div>
      </div>
      <div class="index-topic__bottom">
        <div class="index-topic__entry-item">
          <img :src="entry1" alt="entry-item-image" />
        </div>
        <div class="index-topic__entry-item">
          <img :src="entry2" alt="entry-item-image" />
        </div>
        <div class="index-topic__entry-item">
          <img :src="entry3" alt="entry-item-image" />
        </div>
        <div class="index-topic__entry-item">
          <img :src="entry4" alt="entry-item-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import entry1 from "~/assets/images/entry/j-1.png"
import entry2 from "~/assets/images/entry/j-2.png"
import entry3 from "~/assets/images/entry/j-3.png"
import entry4 from "~/assets/images/entry/j-4.png"
</script>

<style scoped lang="scss">
// 最外层容器
.index-topic-wrapper {
  width: 100%;
  display: flex;
}

// 块容器 - 主容器
.index-topic {
  gap: 15px;
  width: 100%;
  padding: 60px;
  display: flex;
  overflow: hidden;
  flex-direction: column;

  // 顶部区域
  .index-topic__top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    // 顶部左侧 - 标题部分
    .index-topic__top--left {
      .index-topic__title-section {
        display: flex;
        flex-direction: column;

        // 英文标题 - 短规则
        .index-topic__title-en {
          color: #e5e5e5;
          font-size: 20px;
          line-height: 0;
          margin-bottom: 10px;
        }

        // 中文标题 - 短规则
        .index-topic__title-cn {
          color: #1f2937;
          font-size: 24px;
          line-height: 0;
          font-weight: bold;
        }
      }
    }
  }

  // 底部区域 - 中等规则
  .index-topic__bottom {
    gap: 30px;
    display: grid;
    position: relative;
    grid-template-columns: repeat(2, 1fr);

    // 条目项 - 中等规则
    .index-topic__entry-item {
      height: 250px;
      overflow: hidden;
      cursor: pointer;

      // 图片元素 - 短规则
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
