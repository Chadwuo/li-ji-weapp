// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MyMenus: [
      { url: "/pages/ucenter/footprint/footprint", icon: "shop-o", name: "我的家庭" },
      { url: "/pages/groupon/myGroupon/myGroupon", icon: "peer-pay", name: "数据导出" },
      { url: "/pages/ucenter/collect/collect", icon:"fire-o",name:"版本功能"},
      { url: "/pages/ucenter/collect/collect", icon:"good-job-o",name:"赞助"},
      { url: "/pages/ucenter/collect/collect", icon:"smile-comment-o",name:"意见反馈"},
      { url: "/pages/ucenter/address/address", icon: "info-o", name: "关于" }
      ]
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