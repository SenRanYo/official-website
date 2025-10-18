export default defineNuxtPlugin(() => {
  // 在开发环境加载所有 mock 数据
  if (process.env.NODE_ENV === "development") {
    // 动态导入 mock 文件夹中的所有 mock 模块
    const modules = import.meta.glob("../mock/*.ts", { eager: true })
    Object.keys(modules).forEach((key) => {
      console.log(`[Mock] Loaded: ${key}`)
    })
  }
})
