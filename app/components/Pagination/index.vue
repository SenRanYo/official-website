<template>
  <div class="pagination-container">
    <div class="pagination-wrapper">
      <!-- 首页 -->
      <button class="pagination-btn" :disabled="props.page === 1" @click="handlePageChange(1)">首页</button>

      <!-- 上一页 -->
      <button class="pagination-btn" :disabled="props.page === 1" @click="handlePageChange(props.page - 1)">上一页</button>

      <!-- 页码按钮 -->
      <template v-for="index in displayPages" :key="index">
        <button v-if="index !== '...'" class="pagination-btn page-number" :class="{ active: index === props.page }" @click="handlePageChange(page as number)">
          {{ page }}
        </button>
        <span v-else class="pagination-ellipsis">...</span>
      </template>

      <!-- 下一页 -->
      <button class="pagination-btn" :disabled="props.page === props.total" @click="handlePageChange(props.page + 1)">下一页</button>

      <!-- 尾页 -->
      <button class="pagination-btn" :disabled="props.page === props.total" @click="handlePageChange(props.total)">尾页</button>

      <!-- 跳转功能 -->
      <div class="jump-to">
        <span>跳至</span>
        <input v-model="jumpPage" class="jump-input" type="number" :min="1" :max="props.total" @keyup.enter="handleJump" />
        <button class="pagination-btn confirm-btn" @click="handleJump">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  page?: number
  total?: number
}

interface Emits {
  (e: "change", page: number): void
}

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  total: 1,
})

const emit = defineEmits<Emits>()

const jumpPage = ref<string>("")

// 计算显示的页码
const displayPages = computed(() => {
  const pages: (number | string)[] = []
  const total = props.total
  const current = props.page

  if (total <= 7) {
    // 总页数小于等于7，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 总页数大于7，需要省略号
    if (current <= 4) {
      // 当前页在前部
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push("...")
      pages.push(total)
    } else if (current >= total - 3) {
      // 当前页在后部
      pages.push(1)
      pages.push("...")
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // 当前页在中部
      pages.push(1)
      pages.push("...")
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push("...")
      pages.push(total)
    }
  }

  return pages
})

// 处理页码变化
const handlePageChange = (page: number) => {
  if (page >= 1 && page <= props.total && page !== props.page) {
    emit("change", page)
  }
}

// 处理跳转
const handleJump = () => {
  const page = Number(jumpPage.value)
  if (page >= 1 && page <= props.total) {
    handlePageChange(page)
    jumpPage.value = ""
  }
}
</script>

<style scoped lang="scss">
.pagination-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.pagination-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  background-color: #f9fafb;
  color: #374151;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  user-select: none;

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
    border-color: #9ca3af;
  }

  &:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
    border-color: #e5e7eb;
  }
}

.page-number {
  min-width: 40px;

  &.active {
    background-color: #3b82f6;
    border-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
      border-color: #2563eb;
    }
  }
}

.pagination-ellipsis {
  padding: 8px 4px;
  color: #9ca3af;
  font-size: 14px;
  user-select: none;
}

.jump-to {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;

  span {
    color: #374151;
    font-size: 14px;
  }
}

.jump-input {
  width: 60px;
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
}

.confirm-btn {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;

  &:hover:not(:disabled) {
    background-color: #2563eb;
    border-color: #2563eb;
  }
}
</style>
