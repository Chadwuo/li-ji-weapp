//扩展方法函数配置
import ColorUISdk from '../mp-sdk/index'
export const colorUISdk = new ColorUISdk({
    //当前环境，produce，dev，host
    env: 'dev',
    //实际项目版本
    version: '2.2.3',
    api: {
        //生产环境
        produce: {
            url: '请求域名'
        },
        //开发环境
        dev: {
            url: '请求域名'
        },
        //本地环境
        host: {
            url: '请求域名'
        },
        header: {
            "Content-Type": "application/json"
        },
    },
})
