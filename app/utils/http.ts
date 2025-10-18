import type { VueHookType } from "alova/vue"
import statesHook from "alova/vue"
import { createAlova } from "alova"
import { axiosRequestAdapter } from "@alova/adapter-axios"
import { createServerTokenAuthentication } from "alova/client"

const { onResponseRefreshToken } = createServerTokenAuthentication<VueHookType, typeof axiosRequestAdapter>({
  assignToken: (method) => {
    method.config.headers.Authorization = "666"
  },
  refreshTokenOnError: {
    isExpired: () => {
      return false
    },
    handler: async () => {},
  },
  refreshTokenOnSuccess: {
    isExpired: () => {
      return false
    },
    handler: async () => {},
  },
})

const Http = createAlova({
  baseURL: import.meta.env.VITE_API_PREFIX ?? import.meta.env.VITE_API_BASE_URL,
  timeout: 30 * 1000,
  statesHook,
  requestAdapter: axiosRequestAdapter(),
  responded: onResponseRefreshToken({
    onSuccess: async (response) => {
      if (response.status === 200) {
        const result: any = response.data

        if (result.code === 0) {
          return result.data
        }

        // ElMessage.error(result.message)
        return Promise.reject(result)
      } else {
        const status = {
          400: `${response.status} 请求出现语法错误`,
          401: `${response.status} 用户未授权`,
          403: `${response.status} 服务器拒绝访问`,
          404: `${response.status} 请求的资源不存在`,
          405: `${response.status} 请求方法未允许`,
          408: `${response.status} 网络请求超时`,
          500: `${response.status} 服务器内部错误`,
          501: `${response.status} 服务器未实现请求功能`,
          502: `${response.status} 错误网关`,
          503: `${response.status} 服务不可用`,
          504: `${response.status} 网关超时`,
          505: `${response.status} http版本不支持该请求`,
          default: `${response.status} 请求错误`,
        } as any
        // ElMessage.error(status[response.status] || status.default)
        throw new Error(status[response.status] || status.default)
      }
    },
    onError: (error, method) => {
      const message = `[${method.type}] - [${method.url}] - ${error.message}`
      // ElMessage.error(message)
      throw new Error(message)
    },
  }),
})

export { Http }
