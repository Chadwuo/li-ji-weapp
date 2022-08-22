// pages/appreciate/index.js
const sponsorService = require('../../alicloud/services/sponsor')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    barrageList: [],
    isAdmin: false,
    showAddPopup: false,
    name: '',
    money: '',
    words: '',
  },
  barrageDone() {
    console.log('回调完成')
  },
  // 添加
  async onAdd() {

  },
  // 打开弹窗
  onShowPopup(e) {
    this.setData({
      showAddPopup: true,
    });
  },
  // 关闭弹窗
  onClosePopup() {
    this.setData({
      showAddPopup: false,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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