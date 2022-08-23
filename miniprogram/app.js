// app.js
const {
  mpserverless
} = require('./alicloud/index.js')

App({
  mpserverless,
  welcome: '',
  userInfo: null,
  async onLaunch() {
    //await this.initcloud() // 微信云开发环境初始化（因为费用负担不起，所以转战阿里云了）
    mpserverless.init(); // 阿里云服务初始化

    // 查询缓存中用户信息
    this.userInfo = wx.getStorageSync('user')
    // 如果缓存中没有，去数据库中 查询
    if (!this.userInfo) {
      const res = await this.getUserInfo()
      if (res.success) {
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

  /**
   * 封装的云函数调用方法
   * （已弃用）
   * @param {*} obj 传入对象
   */
  async call(obj) {
    try {
      const cloud = await this.cloud()
      obj.userInfo = wx.getStorageSync('user')
      const res = await cloud.callFunction({ // 调用云函数
        name: 'liji-functions', // 云函数名称 应用唯一的服务函数
        data: obj
      })
      console.log('【云函数调用成功】', res)
      if (res.result !== false) { // 如果返回值不为false，则证明正常访问
        return res.result
      } else { // 否则
        wx.hideLoading()
        wx.showModal({ // 提示一下
          content: '函数服务没有支持该操作！',
          showCancel: false
        })
      }
    } catch (e) { // 网络问题出现
      let flag = e.toString()
      flag = flag.indexOf('FunctionName') == -1 ? flag : '请在cloudfunctions文件夹中liji-functions上右键，创建部署云端安装依赖，然后再次体验'
      console.error('【云函数调用失败】', flag)
      wx.hideLoading()
      wx.showModal({
        content: flag, // 此提示可以在正式时改为 "网络服务异常，请确认网络重新尝试！"
        showCancel: false
      })
      throw flag
    }
  },
  /**
   * 初始化云开发环境（支持环境共享和正常两种模式）
   * （已弃用）
   */
  async initcloud() {
    const shareinfo = wx.getExtConfigSync() // 检查 ext 配置文件
    const normalinfo = require('./envList.js').envList || [] // 读取 envlist 文件
    if (shareinfo.envid != null) { // 如果 ext 配置文件存在，环境共享模式
      this.c1 = new wx.cloud.Cloud({ // 声明 cloud 实例
        resourceAppid: shareinfo.appid,
        resourceEnv: shareinfo.envid
      })
      // 装载云函数操作对象返回方法
      this.cloud = async function () {
        if (this.flag !== true) { // 如果第一次使用返回方法，还没初始化
          await this.c1.init() // 初始化一下
          this.flag = true // 设置为已经初始化
        }
        return this.c1 // 返回 cloud 对象
      }
    } else { // 如果 ext 配置文件存在，正常云开发模式
      if (normalinfo.length !== 0 && normalinfo[0].envId != null) { // 如果文件中 envlist 存在
        wx.cloud.init({ // 初始化云开发环境
          traceUser: true,
          env: normalinfo[0].envId
        })
        // 装载云函数操作对象返回方法
        this.cloud = () => {
          return wx.cloud // 直接返回 wx.cloud
        }
      } else { // 如果文件中 envlist 存在，提示要配置环境
        this.cloud = () => {
          throw new Error('当前小程序没有配置云开发环境，请在 envList.js 中配置你的云开发环境')
        }
      }
    }
  },
});