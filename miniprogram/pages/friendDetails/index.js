const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    giftList: [],
    id: '',
    name: '',
    happyCount: '',
    happyTotal: '',
    sadCount: '',
    sadTotal: '',
    happyOrSad: ''
  },
  // 计算统计往来记录
  computedGift(arr) {
    // 收到的人情
    let happy = arr.filter(i => i.type == '收')
    let happyTotal = 0
    for (let item of happy) {
      happyTotal = happyTotal + item.money
    }
    // 送出去的人情
    let sad = arr.filter(i => i.type == '送')
    let sadTotal = 0
    for (let item of sad) {
      sadTotal = sadTotal + item.money
    }
    this.setData({
      happyCount: happy.length,
      happyTotal: happyTotal,
      sadCount: sad.length,
      sadTotal: sadTotal,
      happyOrSad: happyTotal - sadTotal
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 亲友基本信息
    that.setData({
      id: options.friendId,
      name: options.friendName,
    });
    // 获取亲友来往记录
    wx.cloud.callFunction({
      name: 'lijiFunctions',
      data: {
        type: 'getAllData',
        table: 'gift',
        where: {
          userId: app.globalData.user._id,
          friendId: options.friendId
        }
      }
    }).then(res => {
      that.setData({
        giftList: res.result.data
      });
      that.computedGift(res.result.data)
    })
  },
  // 编辑按钮
  onEditClick() {
    wx.navigateTo({
      url: `/pages/friendEdit/index?friendId=${this.data.id}`,
    });
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