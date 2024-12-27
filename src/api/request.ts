export function request<T>(options: UniApp.RequestOptions) {
	return new Promise<Api.Response<T>>((resolve, reject) => {
		uni.request({
			...requestInterceptor(options),
			success(res) {
				if (res.statusCode === 200) {
					resolve(res.data as Api.Response<T>)
				}
				else {
					uni.showToast({
						icon: 'none',
						title: String((res.data as Api.Response<T>).errors) || '请求错误',
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
	options.header = {
		Authorization: token ? `Bearer ${token}` : null,
	}
	return options
}
