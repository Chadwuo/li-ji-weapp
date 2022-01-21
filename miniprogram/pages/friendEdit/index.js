import pinyin from "wl-pinyin";
const app = getApp()
const db = wx.cloud.database()

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
  saveFriend() {
    app.globalData.refreshRequired.friend = true
    if (this.data.id) {
      db.collection('friend').doc(this.data.id).update({
        data: {
          name: this.data.name,
          kinship: this.data.kinship,
          remarks: this.data.remarks,
          firstLetter: pinyin.getFirstLetter(this.data.name.substr(0, 1))
        },
        success: function (res) {
          wx.showToast({
            title: '修改成功',
          })
        }
      })
    } else {
      db.collection('friend').add({
        data: {
          name: this.data.name,
          userId: app.globalData.user._id,
          kinship: this.data.kinship,
          remarks: this.data.remarks,
          firstLetter: pinyin.getFirstLetter(this.data.name.substr(0, 1))
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
  delFriend() {
    app.globalData.refreshRequired.home = true
    app.globalData.refreshRequired.book = true
    app.globalData.refreshRequired.friend = true
    app.globalData.refreshRequired.profile = true
    let that = this
    wx.showModal({
      title: '删除联系人？',
      content: '该联系人所有来往记录都将被删除，确定删除？',
      success(res) {
        if (res.confirm) {
          // 删除亲友下所有记录
          wx.cloud.callFunction({
            name: 'lijiFunctions',
            data: {
              type: 'deleteAllData',
              table: 'gift',
              where: {
                userId: app.globalData.user._id,
                friendId: that.data.id,
              }
            }
          }).then(res => {
            db.collection('friend').doc(that.data.id).remove({
              success: function (res) {
                wx.navigateBack({
                  delta: 2
                })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.friendId) {
      db.collection('friend').doc(options.friendId).get({
        success: function (res) {
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