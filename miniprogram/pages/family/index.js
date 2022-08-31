// pages/family/index.js
const familyService = require('../../alicloud/services/family')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    name: '',
    familyMembers: [],
  },
  async onCreate() {
    const res = familyService.addFamily({
      name: `${app.userInfo.nickName}的家庭`
    })
    if (res.success) {
      app.userInfo.familyId = res.data
      wx.setStorageSync('user', app.userInfo)
      this.onShow()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    const res = await familyService.getFamilyInfo()
    if (res.success) {
      this.setData({
        ...res.data
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '和我一起记录家里的人情往来',
      path: "pages/index/index",
      imageUrl: '../../images/poster.png'
    }
  }
})