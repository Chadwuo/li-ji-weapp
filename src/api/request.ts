export function request<T>(options: UniApp.RequestOptions) {
  return new Promise<Api.Response<T>>((resolve, reject) => {
    uni.request({
      ...requestInterceptor(options),
      success(res) {
        if (res.header.Authorization) {
          const authStore = useAuthStore()
          authStore.accessToken = res.header.Authorization
          authStore.refreshToken = res.header['X-Authorization']
        }
        if (res.statusCode === 200) {
          const result = res.data as Api.Response<T>
          if (!result.succeeded) {
            uni.showToast({
              icon: 'none',
              title: result.errors || '系统错误',
            })
          }
          resolve(res.data as Api.Response<T>)
        }
        else {
          uni.showToast({
            icon: 'none',
            title: res.errMsg || '网络错误',
          })
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
    options.url = `${import.meta.env.VITE_SERVICE_BASE_URL}/${options.url}`
  }

  const token = useAuthStore().accessToken
  const refreshToken = useAuthStore().refreshToken
  options.header = {
    'Authorization': `Bearer ${token}`,
    'X-Authorization': `Bearer ${refreshToken}`,
  }
  return options
}
