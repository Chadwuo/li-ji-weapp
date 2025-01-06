export function request<T>(options: UniApp.RequestOptions) {
  return new Promise<Api.Response<T>>((resolve, reject) => {
    uni.request({
      ...requestInterceptor(options),
      success(res) {
        const accessToken = res.header['access-token']
        const refreshAccessToken = res.header['x-access-token']
        if (refreshAccessToken && accessToken && accessToken !== 'invalid_token') {
          const authStore = useAuthStore()
          authStore.accessToken = accessToken
          authStore.refreshToken = refreshAccessToken
        }

        if (res.statusCode === 200) {
          const result = res.data as Api.Response<T>
          if (!result.succeeded) {
            uni.showToast({
              icon: 'none',
              title: JSON.stringify(result.errors || 'Request Error.'),
            })
          }
          resolve(res.data as Api.Response<T>)
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
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

function requestInterceptor(options: UniApp.RequestOptions) {
  // 非 http 开头需拼接地址
  if (!options.url.startsWith('http')) {
    options.url = `${import.meta.env.VITE_SERVICE_API_URL}/${options.url}`
  }

  const token = useAuthStore().accessToken
  const refreshToken = useAuthStore().refreshToken
  options.header = {
    'Authorization': `Bearer ${token}`,
    'X-Authorization': `Bearer ${refreshToken}`,
  }
  return options
}
