const app = getApp()
const dayjs = require('dayjs');
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
    console.log(e.currentTarget.dataset.book)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromBookPage', e.currentTarget.dataset.book);
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'lijiFunctions',
      data: {
        type: 'getAllData',
        table: 'book',
        where: {
          userId: app.globalData.user._id,
        }
      }
    }).then(res => {
      this.setData({
        bookList: res.result.data.map(i => {
          if (i.luckDay) {
            i.luckDay = this.formatDate(i.luckDay)
          }
          return i
        }),
      });
    })
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