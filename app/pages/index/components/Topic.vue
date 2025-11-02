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
        <div v-for="item in topicList" :key="item.id" class="index-topic__entry-item">
          <img :src="item.image" :alt="item.name || 'topic-item'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { blockItem } from "~/api"

const topicList = ref<any[]>([])
const isLoading = ref(false)

const fetchTopicData = async () => {
  isLoading.value = true

  try {
    const response = await blockItem({ alias: "zhuantijujiao" })
    topicList.value = response || []
  } catch (error) {
    console.error("Failed to fetch topic data:", error)
    topicList.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTopicData()
})
</script>

<style scoped lang="scss">
// 最外层容器
.index-topic-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
}

// 块容器 - 主容器
.index-topic {
  gap: 15px;
  width: 100%;
  padding: 80px 160px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;

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
          font-size: 27px;
          line-height: 0;
          font-weight: bold;
          margin-bottom: 13px;
        }

        // 中文标题 - 短规则
        .index-topic__title-cn {
          color: #1f2937;
          font-size: 32px;
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
      height: 300px;
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
