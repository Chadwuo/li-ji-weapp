import pinyin from "wl-pinyin";
const friendService = require('../../alicloud/services/friend')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    remarks: '',
    kinship: '',
  },
  async saveFriend() {
    app.globalData.refreshRequired.friend = true
    if (this.data.id) {
      const res = await friendService.updateFriend({
        _id: this.data.id,
        name: this.data.name,
        kinship: this.data.kinship,
        remarks: this.data.remarks,
        firstLetter: pinyin.getFirstLetter(this.data.name.substr(0, 1))
      })
      if (res.success) {
        wx.showToast({
          title: '修改成功',
        })
      }
    } else {
      const res = await app.call({
        type: 'addFriend',
        data: {
          name: this.data.name,
          kinship: this.data.kinship,
          remarks: this.data.remarks,
          firstLetter: pinyin.getFirstLetter(this.data.name.substr(0, 1))
        }
      })
      if (res.success) {
        wx.showToast({
          title: '保存成功',
        })
      }
    }
  },
  delFriend() {
    let that = this
    wx.showModal({
      title: '删除联系人？',
      content: '该联系人所有来往记录都将被删除，确定删除？',
      success(result) {
        if (result.confirm) {
          // 删除亲友下所有记录
          const res = friendService.deleteFriend({
            _id: that.data.id
          })
          if (res.success) {
            wx.navigateBack({
              delta: 2
            })
            wx.showToast({
              title: '删除成功',
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.friendId) {
      const res = friendService.getFriend({
        _id: options.friendId
      })
      if (res.success) {
        that.setData({
          id: res.data._id,
          remarks: res.data.remarks,
          name: res.data.name,
          kinship: res.data.kinship,
        });
        wx.setNavigationBarTitle({
          title: '编辑联系人'
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