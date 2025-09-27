import { defineStore } from "pinia"
import { ref, computed, watch } from "vue"

export interface FixedNoticeState {
  isExpanded: boolean
  isMinimized: boolean
  isClosed: boolean
  activeTab: "all" | "factory" | "daily"
}

// localStorage 键名
const STORAGE_KEY = "fixed-notice-state"

// 从 localStorage 加载状态
function loadState(): Partial<FixedNoticeState> {
  if (typeof window === "undefined") return {}

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch (error) {
    console.warn("Failed to load FixedNotice state from localStorage:", error)
    return {}
  }
}

// 保存状态到 localStorage
function saveState(state: FixedNoticeState) {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn("Failed to save FixedNotice state to localStorage:", error)
  }
}

export const useFixedNoticeStore = defineStore("fixedNotice", () => {
  // 从 localStorage 恢复状态
  const savedState = loadState()

  // 状态（只恢复最小化和关闭状态，展开状态和标签状态保持默认值）
  const isExpanded = ref(true) // 展开状态不持久化，总是默认为 true
  const isMinimized = ref(savedState.isMinimized ?? false) // 恢复最小化状态
  const isClosed = ref(savedState.isClosed ?? false) // 恢复关闭状态
  const activeTab = ref<"all" | "factory" | "daily">("all") // 标签状态不持久化，总是默认为 "all"

  // 计算属性
  const shouldShow = computed(() => !isClosed.value)
  const isMinimizedState = computed(() => isMinimized.value)
  const isExpandedState = computed(() => isExpanded.value)

  // 监听状态变化并自动保存（只持久化最小化和关闭状态）
  watch(
    [isMinimized, isClosed],
    ([minimized, closed]) => {
      saveState({
        isExpanded: isExpanded.value, // 不持久化展开状态，但需要包含在保存的数据中
        isMinimized: minimized,
        isClosed: closed,
        activeTab: activeTab.value, // 不持久化标签状态，但需要包含在保存的数据中
      })
    },
    { deep: true },
  )

  // 方法
  const toggleExpand = () => {
    isExpanded.value = !isExpanded.value
  }

  const minimize = () => {
    isMinimized.value = true
  }

  const restore = () => {
    isMinimized.value = false
    isExpanded.value = true
  }

  const close = () => {
    isClosed.value = true
  }

  const switchTab = (tab: "all" | "factory" | "daily") => {
    activeTab.value = tab
  }

  const reset = () => {
    isExpanded.value = true
    isMinimized.value = false
    isClosed.value = false
    activeTab.value = "all"
  }

  // 手动保存状态（可选，用于调试）
  const save = () => {
    saveState({
      isExpanded: isExpanded.value,
      isMinimized: isMinimized.value,
      isClosed: isClosed.value,
      activeTab: activeTab.value,
    })
  }

  // 手动加载状态（可选，用于调试）
  const load = () => {
    const savedState = loadState()
    // 只恢复最小化和关闭状态
    if (savedState.isMinimized !== undefined) isMinimized.value = savedState.isMinimized
    if (savedState.isClosed !== undefined) isClosed.value = savedState.isClosed
    // 展开状态和标签状态不恢复，保持当前值
  }

  return {
    // 状态
    isExpanded,
    isMinimized,
    isClosed,
    activeTab,
    // 计算属性
    shouldShow,
    isMinimizedState,
    isExpandedState,
    // 方法
    toggleExpand,
    minimize,
    restore,
    close,
    switchTab,
    reset,
    save,
    load,
  }
})
