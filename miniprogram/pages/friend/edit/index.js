// pages/friend/edit/index.js
const friendService = require('../../../alicloud/services/friend')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    name: '',
    firstLetter: '',
    relation: '',
    remarks: '',
  },
  async onSave() {
    const eventChannel = this.getOpenerEventChannel()
    if (this.data._id) {
      const res = await friendService.updateFriend(this.data)
      if (res.success) {
        wx.showToast({
          title: '修改成功',
        })
        eventChannel.emit('refresh')
        setTimeout(() => {
          wx.navigateBack()
        }, 1000);
      }
    } else {
      const res = await friendService.addFriend(this.data)
      if (res.success) {
        wx.showToast({
          title: '添加成功',
        })
        eventChannel.emit('refresh')
        setTimeout(() => {
          this.data._id = res.data
          wx.navigateBack()
        }, 1000);
      }
    }
  },
  async onDelete() {
    let delData = this.data
    const eventChannel = this.getOpenerEventChannel()
    wx.showModal({
      title: '删除亲友？',
      content: '该亲友所有来往记录都将被删除，确定删除？',
      async success(res) {
        if (res.confirm) {
          const result = await friendService.deleteFriend(delData)
          if (result.success) {
            wx.showToast({
              title: '删除成功',
            })
            eventChannel.emit('refresh')
            setTimeout(() => {
              wx.navigateBack({
                delta: 2
              })
            }, 1000);
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    var id = options.friendId
    if (id) {
      const res = await friendService.getFriend({
        _id: id
      })
      if (res.success) {
        this.setData({
          ...res.data
        })
      }
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