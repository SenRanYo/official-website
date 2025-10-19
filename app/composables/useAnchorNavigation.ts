/**
 * 锚点导航 Composable
 * 用于管理页面锚点导航，实现以下功能：
 * 1. 点击tab自动滚动到对应区块
 * 2. 滚动时自动激活对应的tab
 * 3. 处理hash路由（#锚点）
 */
import { ref, nextTick, onMounted, onUnmounted } from "vue"

export function useAnchorNavigation() {
  // 当前激活的锚点id
  const activeAnchor = ref<string>("")

  // 所有锚点区块的元素引用集合
  const sectionRefs = ref<Map<string, HTMLElement>>(new Map())

  // 滚动监听的防抖计时器
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null

  /**
   * 注册锚点区块的DOM引用
   * @param id - 区块的唯一标识符
   * @param el - DOM元素
   */
  const registerSection = (id: string, el: HTMLElement | null) => {
    if (el) {
      sectionRefs.value.set(id, el)
    } else {
      sectionRefs.value.delete(id)
    }
  }

  /**
   * 滚动到指定的锚点区块
   * @param anchorId - 要滚动到的锚点id
   */
  const scrollToAnchor = (anchorId: string) => {
    const element = sectionRefs.value.get(anchorId)
    if (element) {
      // 使用平滑滚动效果
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      // 更新URL中的hash
      window.history.pushState(null, "", `#${anchorId}`)
      // 立即更新激活状态
      activeAnchor.value = anchorId
    }
  }

  /**
   * 监听滚动事件，自动激活对应的锚点tab
   */
  const handleScroll = () => {
    // 清除之前的计时器，实现防抖
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    scrollTimeout = setTimeout(() => {
      // 获取视口顶部距离页面顶部的距离
      const viewportTop = window.scrollY + 100 // 100px的偏移量用于提前激活

      let closestAnchor = ""
      let closestDistance = Infinity

      // 遍历所有锚点区块，找到最接近视口的区块
      sectionRefs.value.forEach((element, id) => {
        const elementTop = element.getBoundingClientRect().top + window.scrollY
        const distance = Math.abs(viewportTop - elementTop)

        // 只考虑在视口上方或刚进入视口的区块
        if (elementTop <= viewportTop && distance < closestDistance) {
          closestDistance = distance
          closestAnchor = id
        }
      })

      // 更新激活的锚点
      if (closestAnchor && closestAnchor !== activeAnchor.value) {
        activeAnchor.value = closestAnchor
      }
    }, 50) // 50ms防抖延迟
  }

  /**
   * 初始化锚点导航
   * 在组件挂载时调用
   */
  const initAnchorNavigation = () => {
    // 添加全局滚动事件监听
    window.addEventListener("scroll", handleScroll)

    // 检查URL中是否有hash，如果有则滚动到对应位置
    const hash = window.location.hash.slice(1)
    if (hash) {
      // 延迟执行以确保DOM已完全挂载
      nextTick(() => {
        scrollToAnchor(hash)
      })
    }
  }

  /**
   * 清理锚点导航
   * 在组件卸载时调用
   */
  const cleanup = () => {
    // 移除滚动事件监听
    window.removeEventListener("scroll", handleScroll)
    // 清除滚动防抖计时器
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
  }

  // 组件挂载时初始化
  onMounted(() => {
    initAnchorNavigation()
  })

  // 组件卸载时清理
  onUnmounted(() => {
    cleanup()
  })

  return {
    // 当前激活的锚点
    activeAnchor,
    // 注册区块的ref
    registerSection,
    // 滚动到指定锚点
    scrollToAnchor,
  }
}
