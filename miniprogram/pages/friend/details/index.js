// pages/friend/details/index.js
const friendService = require('../../../alicloud/services/friend')

Page({
  data: {
    friend: {},
    giftList: [],
    happyCount: '0',
    happyTotal: '0.00',
    sadCount: '0',
    sadTotal: '0.00',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.showLoading({
      title: '加载中'
    })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', async (data) => {
      this.setData({
        ...data,
      })
      const res = await friendService.getFriendGifts({
        _id: this.data.friend._id
      })
      if (res.success) {
        const {
          giftOutList,
          giftReceiveList
        } = res.data
        this.setData({
          sadCount: giftOutList.length, // 送礼次数
          sadTotal: giftOutList.map(i => { // 送礼金额总计
            return this.data.sadTotal += i.money
          }),
          happyCount: giftReceiveList.length, // 收礼次数
          happyTotal: giftReceiveList.map(i => { // 收礼金额总计
            return this.data.happyTotal += i.money
          }),
          giftList: giftOutList.concat(giftReceiveList),
        });
      }
      wx.hideLoading()
    })
  },
  // 编辑按钮
  onEditClick() {
    let that = this
    wx.navigateTo({
      url: `/pages/friend/edit/index?friendId=${this.data.friend._id}`,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        dialogResult: function (data) {
          that.setData({
            ...data
          })
        },
      }
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
  onPullDownRefresh: function () {},

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