const {
    getUserInfo
} = require('./alicloud/services/user');

import {
    colorUI
} from './config/ColorUI'
import {
    colorUISdk
} from './config/mp-sdk'


App({
    colorUI, //挂载到app上
    colorUISdk,
    userInfo: null,
    async onLaunch() {
        console.log("软件版本", colorUISdk.version)
        // 查询缓存中用户信息
        this.userInfo = wx.getStorageSync('user')
        if (!this.userInfo) {
            // 如果缓存中没有，去数据库中 查询
            const res = await getUserInfo()
            if (res.success) {
                //TODO 这里有问题 此处为 app.onLaunch与page.onLoad异步问题 导致 index page的onLoad方法 无法拿到userInfo
                this.userInfo = res.data
                wx.setStorageSync('user', res.data)
            }

            // wx.navigateTo({
            //   url: '/pages/login/index',
            // })
        }
    },
});