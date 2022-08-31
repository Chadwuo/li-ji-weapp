// pages/book/select/index.js
const bookService = require('../../../alicloud/services/book')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookSelectSource: [],
  },
  // 选中礼簿
  onSelectedBook(e) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('dialogResult', e.currentTarget.dataset.book);
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const res = bookService.getBookList()
    if (res.success) {
      this.setData({
        bookSelectSource: res.data,
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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

  }
})