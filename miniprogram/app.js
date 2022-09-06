// app.js
const {
  mpserverless
} = require('./alicloud/index.js')

App({
  mpserverless,
  userInfo: null,
  async onLaunch() {
    //await this.initcloud() // 微信云开发环境初始化（因为费用负担不起，所以转战阿里云了）
    mpserverless.init(); // 阿里云服务初始化
    // 查询缓存中用户信息
    this.userInfo = wx.getStorageSync('user')
    if (!this.userInfo) {
      // 如果缓存中没有，去数据库中 查询
      const res = await this.getUserInfo()
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

  /**
   * 获取用户信息
   * 如果没有会自动创建用户
   *
   * @author chadwuo
   */
  async getUserInfo() {
    const res = await this.mpserverless.user.getInfo()
    if (res.success) {
      const userId = res.result.user.userId // Serverless平台生成的用户ID
      let {
        result: user
      } = await this.mpserverless.db.collection('user').findOne({
        _id: userId
      })
      if (!user) {
        // 创建用户
        user = {
          _id: userId,
          nickName: '微信用户',
          avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
          familyId: '',
          isVip: false
        }
        await this.mpserverless.db.collection('user').insertOne(user)
      }

      return {
        success: true,
        data: user
      }
    }
    return {
      success: false,
      message: '操作失败'
    }
  },
});