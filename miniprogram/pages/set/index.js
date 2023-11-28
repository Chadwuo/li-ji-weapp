const app = getApp();
const {
  toggleADSet
} = require('@/alicloud/services/user');
// pages/set/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    skipAD: ''
  },
  async tapSetAdChange() {
    const res = await toggleADSet()
    if (res.success) {
      wx.showToast({
        title: app.userInfo.skipAD ? '没关系，下次一定' : '页面广告已开启，礼记因你更美好！',
        icon: 'none',
        duration: 3000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      skipAD: app.userInfo.skipAD
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
});