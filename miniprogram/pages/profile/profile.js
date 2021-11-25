// pages/profile/profile.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    MyMenus: [{
        page: "dev",
        icon: "shop-o",
        name: "我的家庭"
      },
      {
        page: "dev",
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
    if (e.currentTarget.dataset.page === 'dev') {
      wx.showToast({
        title: '开发中...理解万岁',
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
  onShow: function () {},

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