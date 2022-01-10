const app = getApp()
const dayjs = require('dayjs');
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    luckDay: dayjs().format('YYYY-MM-DD'),
    name: '',
    bookId: '',
    money: '',
    type: '收',
    wishes: '',
    friendName: '',
    showCalendar: false
  },
  formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  },
  saveGift() {
    if (this.data.id) {
      db.collection('gift').doc(this.data.id).update({
        data: {
          userId: app.globalData.user._id,
          luckDay: this.data.luckDay,
          name: this.data.name,
          bookId: this.data.bookId,
          money: Number(this.data.money),
          type: this.data.type,
          wishes: this.data.wishes,
          friendId: this.data.friendName,
        },
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '修改成功',
          })
        }
      })
    } else {
      db.collection('gift').add({
        data: {
          userId: app.globalData.user._id,
          luckDay: this.data.luckDay,
          name: this.data.name,
          bookId: this.data.bookId,
          money: Number(this.data.money),
          type: this.data.type,
          wishes: this.data.wishes,
          friendName: this.data.friendName,
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
  delGift() {
    var that = this
    wx.showModal({
      title: '删除记录？',
      content: '该人情记录删除后无法恢复，确定删除？',
      success(res) {
        if (res.confirm) {
          db.collection('gift').doc(that.data.id).remove({
            success: function (res) {
              wx.showToast({
                title: '删除成功',
              })
            }
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
    this.setData({
      showCalendar: false,
      luckDay: this.formatDate(event.detail),
    });
  },
  onGiftTypeChange(event) {
    this.setData({
      type: event.detail.name
    });
  },
  onSelectFriends() {
    wx.showToast({
      title: '选择亲友...马上写完，真的',
      icon: 'none',
    })
  },
  onSelectBooks() {
    wx.showToast({
      title: '选择礼簿...马上写完，真的',
      icon: 'none',
    })
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