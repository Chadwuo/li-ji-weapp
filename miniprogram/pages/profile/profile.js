// pages/profile/profile.js
const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    giveTotal: 0.00,
    receiveTotal: 0.00,
    MyMenus: [{
        page: "family",
        icon: "shop-o",
        name: "我的家庭"
      },
      {
        page: "export",
        icon: "peer-pay",
        name: "数据导出"
      },
      {
        page: "appreciate",
        icon: "good-job-o",
        name: "赞赏"
      },
      {
        page: "issues",
        icon: "smile-comment-o",
        name: "意见反馈"
      },
      {
        page: "share",
        icon: "share-o",
        name: "推荐给好友"
      },
      {
        page: "about",
        icon: "info-o",
        name: "关于"
      }
    ]
  },
  jumpPage(e) {
    if (e.currentTarget.dataset.page === 'family') {
      wx.showToast({
        title: '家庭共享记账，即将上线...',
        icon: 'none',
      })
      return
    }
    if (e.currentTarget.dataset.page === 'export') {
      wx.showToast({
        title: '数据导出，收支明细汇总打印，即将上线...',
        icon: 'none',
      })
      return
    }
    if (e.currentTarget.dataset.page === 'share') {
      wx.previewImage({
        urls: ['cloud://liji-1gzjub9o9bdf6d00.6c69-liji-1gzjub9o9bdf6d00-1308229258/code.png'] // 需要预览的图片http链接列表
      })
      return
    }

    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const $ = db.command.aggregate
    db.collection('gift')
      .aggregate()
      .match({
        userId: app.globalData.user._id,
        type: '收'
      })
      .group({
        _id: null,
        total: $.sum('$money')
      })
      .end()
      .then(res => {
        this.setData({
          receiveTotal: res.list[0].total.toFixed(2),
        });
      })

    db.collection('gift')
      .aggregate()
      .match({
        userId: app.globalData.user._id,
        type: '送'
      })
      .group({
        _id: null,
        total: $.sum('$money')
      })
      .end()
      .then(res => {
        this.setData({
          giveTotal: res.list[0].total.toFixed(2),
        });
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})