import config from "@/config/index.js";

const Http = (config) => {
  config = {
    baseURL: ``,
    ...config,
  }
  return [
    `options`,
    `get`,
    `head`,
    `post`,
    `put`,
    `delete`,
    `trace`,
    `connect`,
  ].reduce((acc, method) => {
    acc[method] = (url, data, options) => new Promise((resolve) => {
      wx.request({
        method,
        url: url.match(`://`) ? url : `${config.baseURL}${url}`.replace(/([^:]\/)\/+/g, `$1`),
        data,
        header: {
          'content-type': 'application/json',
        },
        success (res) {
          resolve([undefined, res.data.data])
        },
        fail (err) {
          resolve([err])
        },
        ...options,
      })
    })
    return acc
  }, {})
}

const http =  Http({
  baseURL: config.baseURL,
})

export default http
