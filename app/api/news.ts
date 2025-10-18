import { Http } from "~/utils/http"

interface NewsItem {
  date: string
  day: string
  title: string
  description: string
}

/**
 * 获取所有新闻数据
 */
export const getAllNews = () => {
  return Http.Get<NewsItem[]>("/api/news/all")
}

/**
 * 获取指定分类的新闻列表
 */
export const getNewsList = (params: { category: number }) => {
  return Http.Get<NewsItem[]>("/api/news/list", { params })
}

export type { NewsItem }
