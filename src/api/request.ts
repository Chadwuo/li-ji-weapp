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
      // #ifdef MP-WEIXIN
      try {
        const { code } = await uni.login()
        await apiWxOpenLoginPost(code)
      }
      catch (error) {
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error) || '未知错误'
        uni.reLaunch({ url: `/pages/exception/500?error=${encodeURIComponent(errorMessage)}` })
        throw error
      }
      // #endif

      // #ifdef H5
      uni.reLaunch({ url: `/pages/login/index` })
      throw new Error('H5环境下去登录页')
      // #endif
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

function resolveApiEndpoint() {
  const base = `${import.meta.env.VITE_SERVICE_URL}/api`
  let env: string = import.meta.env.MODE

  if (env === 'development' || env === 'mock') {
    return base
  }

  // #ifdef MP-WEIXIN
  uni.getAccountInfoSync().miniProgram.envVersion === 'release' && (env = 'release')
  // #endif

  return `${base}/${env}`
}

const request = createAlova({
  baseURL: resolveApiEndpoint(),
  ...AdapterUniapp(),
  beforeRequest: onAuthRequired((method) => {
    method.config.enableHttpDNS = true
    method.config.httpDNSServiceId = 'wxa410372c837a5f26'
  }),
  responded: onResponseRefreshToken((response, method) => {
    const { config: { requestType } } = method
    if (requestType === 'download' || requestType === 'upload') {
      return response
    }
    const {
      statusCode: rawCode,
      data: rawData,
      errMsg,
      header,
    } = response as UniNamespace.RequestSuccessCallbackResult

    // 处理 HTTP 状态码错误
    if (rawCode !== 200) {
      const errorMessage = ShowMessage(rawCode) || `HTTP请求错误[${rawCode}]`
      uni.reLaunch({ url: `/pages/exception/500?error=${errorMessage}` })
      throw new Error(`${errorMessage}：${errMsg}`)
    }

    const { succeeded, errors, data } = rawData as Api.Response
    const errorMessage = JSON.stringify(errors || 'Server Error.')
    // 处理业务错误
    if (!succeeded) {
      uni.showToast({
        icon: 'none',
        title: errorMessage,
      })
      throw new Error(errorMessage)
    }

    // 服务端自动刷新token
    const accessToken = header['access-token']
    const refreshAccessToken = header['x-access-token']
    if (refreshAccessToken && accessToken && accessToken !== 'invalid_token') {
      const authStore = useAuthStore()
      authStore.accessToken = accessToken
      authStore.refreshToken = refreshAccessToken
    }
    return data
  }),
})

/**
 * 根据状态码，生成对应的错误信息
 * @param {number|string} status 状态码
 * @returns {string} 错误信息
 */
function ShowMessage(status: number | string): string {
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

export default request
