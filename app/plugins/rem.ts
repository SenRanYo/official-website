export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // 屏幕适应 - 基于1920*1080设计稿
    ;(function (win, doc) {
      if (!win.addEventListener) return
      function setFont() {
        const screenWidth = document.querySelector("html")!.offsetWidth
        // 基于1920px设计稿计算，1920px = 100px基准字体（使用更大的基准值）
        let fontSize = (screenWidth / 1920) * 100
        // 最小100px（基于1920px设计稿，不小于1920屏幕）
        fontSize = fontSize < 100 ? 100 : fontSize
        // 最大120px（超大屏幕限制）
        fontSize = fontSize > 120 ? 120 : fontSize
        document.querySelector("html")!.style.fontSize = `${fontSize}px`
      }
      setFont()
      setTimeout(() => {
        setFont()
      }, 300)
      doc.addEventListener("DOMContentLoaded", setFont, false)
      win.addEventListener("resize", setFont, false)
      win.addEventListener("load", setFont, false)
    })(window, document)
  }
})
