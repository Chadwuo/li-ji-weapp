// app.js
App({
  onLaunch: function () {
    this.globalData = {
      env: {
        app_user_key: 'app.user'
      },
      user: {},
      serviceStopped: false,
      // 是否需要刷新
      refreshRequired: {
        home: false,
        book: true,
        friend: true,
        profile: true
      }
    };

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
      wx.showModal({
        title: '微信版本过低',
        content: '抱歉，请更新你的微信版本，礼记支持 6.6.7 或以上版本微信使用。',
        showCancel: false,
        confirmText: '理解万岁'
      })
      this.globalData.serviceStopped = true
      return
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });

      const db = wx.cloud.database()
      // 获取远端数据库中用户信息
      wx.cloud.callFunction({
        name: 'lijiFunctions',
        data: {
          type: 'getUserInfo'
        }
      }).then(res => {
        if (res.errMsg != "cloud.callFunction:ok") {
          wx.showModal({
            title: '资源超限暂停通知',
            content: '抱歉，礼记的服务器资源已超限，系统将限制服务继续使用，服务会在明日恢复。',
            showCancel: false,
            confirmText: '理解万岁'
          })
          this.globalData.serviceStopped = true
          return
        }
        if (res.result.data.length != 0) {
          this.globalData.user = res.result.data[0]
        } else {
          // 注册一下
          db.collection('user').add({
            data: {
              familyId: "",
              createTime: db.serverDate(),
              vip: false,
              isAdmin: false,
              tips_hide_book: false
            }
          }).then(res => {
            this.globalData.user._id = res.result._id
          })
        }
      })
    }
  }
});