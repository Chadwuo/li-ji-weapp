// app.js
App({
  onLaunch: function () {
    this.globalData = {
      env: {
        app_user_key: 'app.user'
      },
      user: {}
    };

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
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
      let user = {}
      // 获取远端数据库中用户信息
      wx.cloud.callFunction({
        name: 'lijiFunctions',
        data: {
          type: 'getUserInfo'
        }
      }).then(res => {
        if (res.result.data.length === 0) {
          // 注册一下
          db.collection('user').add({
            data: {
              familyId: "",
              createTime: db.serverDate(),
              vip: false,
              isAdmin: false
            }
          }).then(res => {
            user._id = res.result._id
            this.globalData.user = user
          })
        } else {
          user = res.result.data[0]
          this.globalData.user = user
        }
      })
    }
  }
});