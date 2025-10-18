export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV === "development") {
    import("../api/news.mock.ts")
  }
})
