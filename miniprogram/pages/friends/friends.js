// pages/friends/friends.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    friendsList: [],
    keyword: ''
  },
  onSearch() {
    wx.showToast({
      title: '搜索:' + this.data.keyword + '...马上写完，真的',
      icon: 'none',
    })
  },
  onFriendClick(e) {
    wx.navigateTo({
      url: `/pages/friendDetails/index?friendId=${e.currentTarget.dataset.friend._id}&friendName=${e.currentTarget.dataset.friend.name}`,
    });
  },
  onAdd() {
    wx.navigateTo({
      url: `/pages/friendEdit/index`,
    });
  },
  onDelete() {
    wx.showModal({
      title: '提示',
      content: '该联系人得所有人情往来记录都将被删除，确定删除？',
      confirmColor: '#F76664',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  loadData() {
    let listTemp = []
    for (let index = 0; index < 26; index++) {
      listTemp.push({
        alpha: String.fromCharCode((65 + index)),
        subItems: []
      })
    }
    wx.cloud.callFunction({
      name: 'lijiFunctions',
      data: {
        type: 'getAllData',
        table: 'friend',
      }
    }).then(res => {
      for (const item of res.result.data) {
        const firstLetter = item.firstLetter
        for (const f of listTemp) {
          if (firstLetter === f.alpha) {
            f.subItems.push(item)
            break
          }
        }
      }
      let list = listTemp.filter((i) => {
        return i.subItems.length != 0
      })
      this.setData({
        friendsList: list,
      });
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
    if (app.globalData.refreshRequired.friend) {
      this.loadData()
      app.globalData.refreshRequired.friend = false
    }
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