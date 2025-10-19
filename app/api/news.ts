import { Http } from "~/utils/http"

/**
 * 获取所有新闻数据
 */
export const getAllNews = () => {
  return Http.Get<any[]>("/api/news/all")
}

/**
 * 获取指定分类的新闻列表
 */
export const getNewsList = (params: any) => {
  return Http.Get<any[]>("/api/news/list", { params })
}

/**
 * 获取指定年份的发展历程数据
 */
export const getHistoryList = (params: any) => {
  return Http.Get<any[]>("/api/history/list", { params })
}
