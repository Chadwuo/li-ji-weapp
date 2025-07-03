import type { uniappRequestAdapter } from '@alova/adapter-uniapp'
import type VueHook from 'alova/vue'
import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import { createServerTokenAuthentication } from 'alova/client'

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<typeof VueHook, typeof uniappRequestAdapter>({
  refreshTokenOnSuccess: {
    isExpired: (response) => {
      return response.statusCode === 401
    },
    handler: async () => {
      try {
        // #ifdef MP-WEIXIN
        const { code, errMsg } = await uni.login()
        if (!code)
          throw new Error(errMsg)
        await apiWxOpenLoginPost(code)
        // #endif
        // #ifdef H5
        await apiWxOpenLoginPost('github.com/Chadwuo')
        // #endif
      }
      catch (error) {
        // 提取错误信息
        let errorMessage = '未知错误'
        if (error instanceof Error) {
          errorMessage = error.message
        }
        else {
          errorMessage = JSON.stringify(error)
        }

        // token刷新失败，跳转回错误页
        await uni.reLaunch({ url: `/pages/exception/500?error=${encodeURIComponent(errorMessage)}` })
        // 并抛出错误
        throw error
      }
    },
  },
  assignToken(method) {
    const { accessToken, refreshToken } = useAuthStore()
    method.config.headers = {
      'Authorization': `Bearer ${accessToken}`,
      'X-Authorization': `Bearer ${refreshToken}`,
    }
  },
  login(response) {
    const {
      data: rawData,
    } = response as UniNamespace.RequestSuccessCallbackResult
    const authStore = useAuthStore()
    const { data } = rawData as Api.Response<Api.LoginToken>
    authStore.accessToken = data?.accessToken
    authStore.refreshToken = data?.refreshToken
  },
})

export const request = createAlova({
  baseURL: `${import.meta.env.VITE_SERVICE_URL}/api`,
  ...AdapterUniapp(),
  beforeRequest: onAuthRequired((method) => {
    method.config.enableHttpDNS = true
    method.config.httpDNSServiceId = 'wxa410372c837a5f26' as any // https://github.com/dcloudio/uni-app/issues/5479 等待修复

    const { envVersion } = useAppStore()
    method.baseURL += envVersion === 'release' ? '/release' : ''
  }),
  responded: onResponseRefreshToken((response, method) => {
    const { config } = method
    const { requestType } = config

    if (requestType === 'download' || requestType === 'upload') {
      return response
    }
    const {
      statusCode: rawCode,
      data: rawData,
      errMsg,
      header,
    } = response as UniNamespace.RequestSuccessCallbackResult

    const accessToken = header['access-token']
    const refreshAccessToken = header['x-access-token']
    if (refreshAccessToken && accessToken && accessToken !== 'invalid_token') {
      const authStore = useAuthStore()
      authStore.accessToken = accessToken
      authStore.refreshToken = refreshAccessToken
    }
    // 处理 HTTP 状态码错误
    if (rawCode !== 200) {
      const errorMessage = ShowMessage(rawCode) || `HTTP请求错误[${rawCode}]`
      uni.showToast({
        icon: 'none',
        title: errorMessage,
      })
      throw new Error(`${errorMessage}：${errMsg}`)
    }
    const { succeeded, statusCode, errors, data } = rawData as Api.Response
    const errorMessage = JSON.stringify(errors || 'Server Error.')
    if (!succeeded) {
      uni.showToast({
        icon: 'none',
        title: errorMessage,
      })
      throw new Error(`[${statusCode}]：${errorMessage}`)
    }
    return data
  }),
})

export enum ResultEnum {
  Success = 0, // 成功
  Error = 400, // 错误
  Unauthorized = 401, // 未授权
  Forbidden = 403, // 禁止访问（原为forbidden）
  NotFound = 404, // 未找到（原为notFound）
  MethodNotAllowed = 405, // 方法不允许（原为methodNotAllowed）
  RequestTimeout = 408, // 请求超时（原为requestTimeout）
  InternalServerError = 500, // 服务器错误（原为internalServerError）
  NotImplemented = 501, // 未实现（原为notImplemented）
  BadGateway = 502, // 网关错误（原为badGateway）
  ServiceUnavailable = 503, // 服务不可用（原为serviceUnavailable）
  GatewayTimeout = 504, // 网关超时（原为gatewayTimeout）
  HttpVersionNotSupported = 505, // HTTP版本不支持（原为httpVersionNotSupported）
}
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
/**
 * 根据状态码，生成对应的错误信息
 * @param {number|string} status 状态码
 * @returns {string} 错误信息
 */
export function ShowMessage(status: number | string): string {
  let message: string
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return message
}
