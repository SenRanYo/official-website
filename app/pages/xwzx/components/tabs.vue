<template>
  <nav class="tabs">
    <div class="tabs-container">
      <div v-for="item in list" :key="item.value" class="tabs-item" :class="{ active: modelValue === item.value }" @click="handleTabClick(item.value)">
        {{ item.title }}
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
/**
 * Tab 列表项数据接口
 * @property title - tab 显示的标题
 * @property value - tab 的唯一值标识
 */
interface TabItem {
  title: string
  value: string
}

/**
 * 组件props
 * @property list - tab 列表数据
 * @property modelValue - 当前激活的 tab 值（支持 v-model）
 */
interface Props {
  list: TabItem[]
  modelValue: string
}

/**
 * 组件emits
 * @event update:modelValue - 当用户点击tab时触发，用于 v-model 双向绑定
 */
interface Emits {
  change: [value: string]
  "update:modelValue": [value: string]
}

// 定义props和emits
defineProps<Props>()
const emit = defineEmits<Emits>()

/**
 * 处理tab点击事件
 * 触发 update:modelValue 事件，用于 v-model 双向绑定
 * @param value - 被点击的tab值
 */
const handleTabClick = (value: string) => {
  emit("update:modelValue", value)
  emit("change", value)
}
</script>

<style scoped lang="scss">
/* 标签导航栏样式 */
.tabs {
  top: 80px;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  position: sticky;
  padding: 0 250px;
  background-color: white;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;

  .tabs-container {
    gap: 60px;
    height: 60px;
    display: flex;
    align-items: center;
  }

  /* 标签项样式 */
  .tabs-item {
    height: 60px;
    cursor: pointer;
    font-size: 16px;
    color: #666;
    position: relative;
    transition: all 0.3s ease;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;

    &:hover {
      color: #0066ff;
    }

    /* 激活状态样式 */
    &.active {
      color: #0066ff;
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #0066ff, #00a8ff);
        border-radius: 2px 2px 0 0;
      }
    }
  }
}
</style>
