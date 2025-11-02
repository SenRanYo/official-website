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

/**
 * 文章详情接口
 * @returns 文章详情接口
 */
export const articleDetail = (id: string) => {
  return Http.Get<any>(`/api/article/${id}`)
}

/**
 * 首页区块内容
 * @returns 首页区块内容
 */
export const blockItem = (params?: any) => {
  return Http.Get<any>("/api/block-item", { params })
}

/**
 * 首页底部链接列表
 * @returns 首页底部链接列表
 */
export const articlePageListByAlias = (params?: any) => {
  return Http.Get<any>("/api/article/articlePageListByAlias", { params })
}

/**
 * 文章搜索
 * @returns 文章搜索
 */
export const articleSearch = (params?: any) => {
  return Http.Get<any>("/api/article/es", { params })
}
