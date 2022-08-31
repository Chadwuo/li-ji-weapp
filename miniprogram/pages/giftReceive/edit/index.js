// pages/giftReceive/edit/index.js
const giftReceiveService = require('../../../alicloud/services/giftReceive')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    friendId: '',
    friendName: '',
    bookId: '',
    bookName: '',
    title: '',
    date: {},
    money: '',
    remarks: '',
  },
  async onSave() {
    if (this.data._id) {
      const res = await giftReceiveService.updataGiftReceive(this.data)
      if (res.success) {
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(() => {
          eventChannel.emit('dialogResult', {
            type: 'update',
            data: this.data
          });
          wx.navigateBack()
        }, 1000);
      }
    } else {
      const res = await giftReceiveService.addGiftReceive(this.data)
      if (res.success) {
        wx.showToast({
          title: '添加成功',
        })
        setTimeout(() => {
          this.data._id = res.data
          eventChannel.emit('dialogResult', {
            type: 'insert',
            data: this.data
          });
          wx.navigateBack()
        }, 1000);
      }
    }
  },
  async onDelete() {
    let delData = this.data
    const eventChannel = this.getOpenerEventChannel()
    wx.showModal({
      title: '删除来往记录？',
      content: '此操作无法恢复，确定删除？',
      async success(res) {
        if (res.confirm) {
          const result = await giftReceiveService.deleteGiftReceive(delData)
          if (result.success) {
            wx.showToast({
              title: '删除成功',
            })
            setTimeout(() => {
              eventChannel.emit('dialogResult', {
                type: 'delete',
                data: delData
              });
              wx.navigateBack()
            }, 1000);
          }
        }
      }
    })
  },
  showFriendSelect() {
    let that = this
    wx.navigateTo({
      url: '/pages/friend/select/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        dialogResult: function (data) {
          that.setData({
            friendId: data._id,
            friendName: data.name,
          })
        },
      }
    });
  },
  // 选择礼簿
  showBookSelect() {
    let that = this
    wx.navigateTo({
      url: '/pages/book/select/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        dialogResult: function (data) {
          that.setData({
            bookId: data._id,
            bookName: data.name,
          })
        },
      }
    });
  },
  showCalendar() {
    let that = this
    wx.navigateTo({
      url: `/pages/calendar/index?date=${this.data.date.value}`,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        handleCalendarDateChange: function (data) {
          that.setData({
            date: data
          })
        },
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      this.setData({
        ...data
      })
      wx.setNavigationBarTitle({
        title: '编辑记录'
      })
    })
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