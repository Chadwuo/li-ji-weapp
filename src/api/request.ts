export function request<T>(options: WechatMiniprogram.RequestOption) {
  return new Promise<Api.Common.Response<T>>((resolve, reject) => {
    wx.request({
      ...requestInterceptor(options),
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data as Api.Common.Response<T>)
        }
        else {
          wx.showToast({
            icon: 'none',
            title: (res.data as Api.Common.Response<T>).errors || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        wx.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

function requestInterceptor(options: WechatMiniprogram.RequestOption) {
  // 非 http 开头需拼接地址
  if (!options.url.startsWith('http')) {
    options.url = `http://localhost:2240/api${options.url}`
  }

  const token = useAuthStore().accessToken
  options.header = {
    Authorization: token ? `Bearer ${token}` : null,
  }
  return options
}
