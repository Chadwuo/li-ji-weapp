const dayjs = require('dayjs');
const db = wx.cloud.database()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    luckDay: dayjs().format('YYYY-MM-DD'),
    name: '',
    remarks: '',
    showCalendar: false
  },
  formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  },
  saveBook() {
    if (this.data.id) {
      db.collection('book').doc(this.data.id).update({
        data: {
          luckDay: this.data.luckDay,
          name: this.data.name,
          userId: app.globalData.user._id,
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
          luckDay: this.data.luckDay,
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
    wx.showModal({
      title: '删除礼簿？',
      content: '该礼簿所有来往记录都将被删除，确定删除？',
      success(res) {
        if (res.confirm) {
          db.collection('book').doc(this.data.id).remove({
            success: function(res) {
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