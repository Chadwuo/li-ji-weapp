const dayjs = require('dayjs');
const bookService = require('../../alicloud/services/book')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookList: []
  },
  formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  },
  onSelectBook(e) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromBookPage', e.currentTarget.dataset.book);
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const res = bookService.getBookList()
    if (res.success) {
      this.setData({
        bookList: res.data.map(i => {
          if (i.luckDay) {
            i.luckDay = this.formatDate(i.luckDay)
          }
          return i
        }),
      });
    }
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