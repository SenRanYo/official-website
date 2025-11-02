import { Http } from "~/utils/http"

/**
 * 轮播图数据接口类型定义
 */
interface RotatingBannerItem {
  id: string
  title: string
  topText: string
  bottomText: string
  imageUrl: string
}

/**
 * 首页轮播图文章列表
 * @returns 轮播图数据列表
 */
export const rotatingBanner = (params?: any) => {
  return Http.Get<RotatingBannerItem[]>("/article/rotatingBanner", { params })
}
