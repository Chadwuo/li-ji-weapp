const dayjs = require('dayjs');
const bookService = require('../../alicloud/services/book')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    luckDay: new Date().getTime(),
    luckDayFormat: dayjs().format('YYYY-MM-DD'),
    name: '',
    remarks: '',
    showCalendar: false,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
  },
  formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  },
  async saveBook() {
    app.globalData.refreshRequired.book = true
    if (this.data.id) {
      const res = await bookService.updateBook({
        data: {
          date: new Date(this.data.luckDay),
          title: this.data.name,
        }
      })
      if (res.success) {
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 500);
      }
    } else {
      const res = await bookService.addBook({
        data: {
          date: new Date(this.data.luckDay),
          title: this.data.name,
        }
      })
      if (res.success) {
        wx.showToast({
          title: '保存成功',
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 500);
      }
    }
  },
  delBook() {
    var that = this
    wx.showModal({
      title: '删除礼簿？',
      content: '该礼簿所有来往记录都将被删除，确定删除？',
      async success(res) {
        if (res.confirm) {
          const result = await bookService.deleteBook({
            _id: that.data.id
          })
          if (result.success) {
            wx.showToast({
              title: '删除成功',
            })
          }
        }
      }
    })
  },
  onDisplay() {
    this.setData({
      showCalendar: true
    });
  },
  onClose() {
    this.setData({
      showCalendar: false
    });
  },
  onConfirm(event) {
    console.log(event)
    this.setData({
      showCalendar: false,
      luckDay: event.detail,
      luckDayFormat: this.formatDate(event.detail),
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    var that = this
    if (options.bookId) {
      const res = await bookService.getBook({
        _id: options.bookId
      })
      if (res.success) {
        that.setData({
          id: res.data._id,
          luckDay: new Date(res.data.date).getTime(),
          luckDayFormat: that.formatDate(res.data.date),
          name: res.data.tile,
        });
        wx.setNavigationBarTitle({
          title: res.data.title
        })
      }
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