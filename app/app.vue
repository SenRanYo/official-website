<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="var(--color-brand)" :height="2" />
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
// const initRemAdapter = (): void => {
//   const DESIGN_WIDTH = 375 // 设计稿宽度（px）
//   const MIN = 12 // 根字体大小下限（px）
//   const MAX = 20 // 根字体大小上限（px）
//   const BASE = 100 // 基准值，与 postcss rootValue 对齐

//   /**
//    * 设置根字体大小
//    * 根据当前屏幕宽度与设计稿宽度的比例计算rem基准值
//    */
//   const setRem = (): void => {
//     const w = Math.max(document.documentElement.clientWidth, 320)
//     // 在设计宽度时，html.fontSize = BASE px；随宽度线性缩放
//     let fs = (w / DESIGN_WIDTH) * BASE
//     fs = Math.max(MIN, Math.min(MAX, fs)) // 限制在上下限范围内
//     document.documentElement.style.fontSize = fs + "px"
//   }

//   let tid: number | undefined

//   /**
//    * 窗口大小改变事件处理函数
//    * 使用防抖优化性能
//    */
//   const onResize = (): void => {
//     clearTimeout(tid)
//     tid = window.setTimeout(setRem, 100) // 简易防抖
//   }

//   // 初始化设置
//   setRem()

//   // 绑定事件监听器
//   window.addEventListener("resize", onResize)
//   window.addEventListener("pageshow", setRem)
// }
// initRemAdapter()
</script>

<style lang="scss" scoped>
:global(body) {
  background-color: $background-color;
  color: $text-color;
  font-family: $font-family-base;

  @include mobile {
    font-size: $font-size-sm;
  }
}
</style>
