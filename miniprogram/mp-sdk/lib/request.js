//发起请求
const request = (promise, loading = false, config) => {
    return new Promise( (resolve, reject) => {
        if (['produce','dev','host'].includes(config.env)) {
            if (loading) {
                wx.showLoading({
                    title:'请求中',
                    mask: true
                })
            }
            wx.request({
                url: config.api[config.env].url + promise.url,
                method: promise.method || 'GET',
                header: promise.header || config.api.header,
                data: promise.data,
                success: res => {
                    if (res.statusCode === 200) {
                        resolve(res.data);
                    } else {
                        wx.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 2000
                        });
                        reject(res.msg)
                    }
                },
                fail: err => {
                    wx.showToast({title: "网络异常",icon: 'none'});
                    reject(err)
                },
                complete() {
                    if (loading) {
                        wx.hideLoading()
                    }
                }
            });
        } else {
            wx.showToast({title: "环境异常",icon: 'none'});
            reject({msg: "环境异常"})
        }
    });
};

module.exports = {
    request: request
}
