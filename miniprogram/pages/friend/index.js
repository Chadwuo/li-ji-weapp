// pages/friend/index.js
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
      title: '搜索...马上写完，真的',
      icon: 'none',
    })
  },
  onFriendClick(e) {
    wx.navigateTo({
      url: '/pages/friend/details/index',
      success: function (res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          friend: e.currentTarget.dataset.friend
        })
      }
    });
  },
  onAdd() {
    let that = this
    wx.navigateTo({
      url: '/pages/friend/edit/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        dialogResult: function (data) {
          that.friendEditDialog(data)
        },
      }
    });
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
  // 编辑回调
  friendEditDialog(detail) {
    console.log(detail)
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
    const res = await friendService.getFriendList()
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
    // 感觉延迟一下，会舒服点
    setTimeout(async () => {
      this.setData({
        friendsList: []
      })
      await this.loadData(1)
      wx.stopPullDownRefresh()
    }, 666);
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