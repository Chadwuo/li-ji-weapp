// 提取状态码常量，提高代码可读性
const HTTP_STATUS_OK = 200
const HTTP_STATUS_UNAUTHORIZED = 401

export function request<T>(options: UniApp.RequestOptions) {
  return new Promise<Api.Response<T>>((resolve, reject) => {
    // 统一处理请求拦截器
    const processedOptions = requestInterceptor(options)

    uni.request({
      ...processedOptions,
      success: (res) => {
        // 处理 token 刷新逻辑
        handleTokenRefresh(res.header)

        if (res.statusCode === HTTP_STATUS_OK) {
          const result = res.data as Api.Response<T>
          if (!result.succeeded) {
            uni.showToast({
              icon: 'none',
              title: JSON.stringify(result.errors || 'Request Error.'),
            })
          }
          resolve(result)
        }
        else if (res.statusCode === HTTP_STATUS_UNAUTHORIZED) {
          useAuthStore().logout()
        }
        else {
          uni.showToast({
            icon: 'none',
            title: res.errMsg || '网络错误',
          })
          console.error(res)
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({
          icon: 'none',
          title: '网络错误，请稍后再试！',
        })
        reject(err)
      },
    })
  })
}

// 提取 token 刷新逻辑
function handleTokenRefresh(headers: Record<string, string | string[] | undefined>) {
  const accessToken = headers['access-token']
  const refreshAccessToken = headers['x-access-token']
  if (refreshAccessToken && accessToken && accessToken !== 'invalid_token') {
    const authStore = useAuthStore()
    authStore.accessToken = accessToken as string
    authStore.refreshToken = refreshAccessToken as string
  }
}

function requestInterceptor(options: UniApp.RequestOptions) {
  // #ifdef MP-WEIXIN
  options.enableHttpDNS = true
  options.httpDNSServiceId = 'wxa410372c837a5f26' as any // https://github.com/dcloudio/uni-app/issues/5479 等待修复
  // #endif

  // 非 http 开头需拼接地址
  if (!options.url.startsWith('http')) {
    const appStore = useAppStore()
    options.url = `${appStore.baseApiUrl}/${options.url}`
  }

  const token = useAuthStore().accessToken
  const refreshToken = useAuthStore().refreshToken
  options.header = {
    'Authorization': `Bearer ${token}`,
    'X-Authorization': `Bearer ${refreshToken}`,
  }
  return options
}
