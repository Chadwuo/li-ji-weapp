// pages/friends/index.js
const friendService = require('../../alicloud/services/friend')

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
      url: `/pages/friendDetails/index?friendId=${e.currentTarget.dataset.friend._id}`,
    });
  },
  onAdd() {
    const friendEdit = this.selectComponent('#friend-edit')
    friendEdit.show()
  },
  onDelete(e) {
    let that = this
    const friendId = e.currentTarget.dataset.friendid
    wx.showModal({
      title: '提示',
      content: '该联系人得所有人情往来记录都将被删除，确定删除？',
      confirmColor: '#F76664',
      async success(result) {
        if (result.confirm) {
          // 删除亲友下所有记录
          const res = friendService.deleteFriend({
            _id: friendId
          })
          if (res.success) {
            that.loadData()
            wx.showToast({
              title: '删除成功',
            })
          }
        }
      }
    })
  },
  async loadData() {
    let listTemp = []
    for (let index = 0; index < 26; index++) {
      listTemp.push({
        alpha: String.fromCharCode((65 + index)),
        subItems: []
      })
    }
    let noletter = {
      alpha: '#',
      subItems: []
    }
    const res = friendService.getFriendList()

    if (res.success) {
      for (const item of res.data) {
        const firstLetter = item.firstLetter
        if (!isNaN(firstLetter)) {
          noletter.subItems.push(item)
        } else {
          for (const f of listTemp) {
            if (firstLetter.toUpperCase() === f.alpha) {
              f.subItems.push(item)
              break
            }
          }
        }
      }
      listTemp.push(noletter)
      let list = listTemp.filter((i) => {
        return i.subItems.length != 0
      })
      this.setData({
        friendsList: list,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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