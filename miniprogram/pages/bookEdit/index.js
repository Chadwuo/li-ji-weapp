const dayjs = require('dayjs');
const db = wx.cloud.database()
const app = getApp()
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
  saveBook() {
    app.globalData.refreshRequired.book = true
    if (this.data.id) {
      db.collection('book').doc(this.data.id).update({
        data: {
          luckDay: new Date(this.data.luckDay),
          name: this.data.name,
          type: '',
        },
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '修改成功',
          })
        }
      })
    } else {
      db.collection('book').add({
        data: {
          luckDay: new Date(this.data.luckDay),
          name: this.data.name,
          userId: app.globalData.user._id,
          type: '',
        }
      }).then(res => {
        this.setData({
          id: res._id
        });
        wx.showToast({
          title: '保存成功',
        })
      })
    }
  },
  delBook() {
    app.globalData.refreshRequired.home = true
    app.globalData.refreshRequired.book = true
    var that = this
    wx.showModal({
      title: '删除礼簿？',
      content: '该礼簿所有来往记录都将被删除，确定删除？',
      success(res) {
        if (res.confirm) {
          // 删除礼簿下所有记录
          wx.cloud.callFunction({
            name: 'lijiFunctions',
            data: {
              type: 'deleteAllData',
              table: 'gift',
              where: {
                userId: app.globalData.user._id,
                bookId: that.data.id,
              }
            }
          }).then(res => {
            // 删除礼簿
            db.collection('book').doc(that.data.id).remove({
              success: function (res) {
                wx.navigateBack()
                wx.showToast({
                  title: '删除成功',
                })
              }
            })
          })
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
  onLoad: function (options) {
    var that = this
    if (options.bookId) {
      db.collection('book').doc(options.bookId).get({
        success: function (res) {
          that.setData({
            id: res.data._id,
            luckDay: new Date(res.data.luckDay).getTime(),
            luckDayFormat: that.formatDate(res.data.luckDay),
            name: res.data.name,
          });
          wx.setNavigationBarTitle({
            title: res.data.name
          })
        }
      })
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