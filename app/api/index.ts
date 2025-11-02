import { Http } from "~/utils/http"

/**
 * 首页轮播图文章列表
 * @returns 轮播图数据列表
 */
export const rotatingBanner = (params?: any) => {
  return Http.Get<any>("/api/article/rotatingBanner", { params })
}

/**
 * 根据上级菜单别名查询子菜单列表
 * @returns 菜单列表
 */
export const headerMuneList = (params?: any) => {
  return Http.Get<any>("/api/article/headerMuneList", { params })
}

/**
 * 根据上级菜单id查询文章分页列表
 * @returns 文章分页列表
 */
export const headerArticlePageList = (params?: any) => {
  return Http.Get<any>("/api/article/headerArticlePageList", { params })
}
