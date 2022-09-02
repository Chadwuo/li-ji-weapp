// pages/giftOut/index.js
const giftOutService = require('../../alicloud/services/giftOut')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 0,
    giftList: [],
    total: '0.00',
  },
  onSearch() {
    wx.showToast({
      title: '搜索...马上写完，真的',
      icon: 'none',
    })
  },
  giftEditDialog(detail) {
    switch (detail.type) {
      case 'insert':
        this.data.giftList.unshift({
          ...detail.data,
          friendInfo: {
            name: detail.data.friendName
          }
        })
        this.setData({
          giftList: this.data.giftList
        })
        break;
      case 'update':
        let updateIndex = this.data.giftList.findIndex(i => {
          return i._id == detail.data._id
        })
        this.data.giftList[updateIndex].title = detail.data.title
        this.setData({
          giftList: this.data.giftList
        })
        break;
      case 'delete':
        let delIndex = this.data.giftList.findIndex(i => {
          return i._id == detail.data._id
        })
        this.data.giftList.splice(delIndex, 1)
        this.setData({
          giftList: this.data.giftList
        })
        break;
      default:
        break;
    }
  },
  onAddGift() {
    let that = this
    wx.navigateTo({
      url: '/pages/giftOut/edit/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        dialogResult: function (data) {
          that.giftEditDialog(data)
        },
      }
    });
  },
  async loadData(page) {
    const res = await giftOutService.getGiftOutPage({
      page: page,
      limit: 10
    })
    if (res.success) {
      this.setData({
        giftList: this.data.giftList.concat(res.data),
        pageNo: page
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData(1)
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
    // 感觉延迟一下，会舒服点
    setTimeout(async () => {
      this.setData({
        giftList: []
      })
      await this.loadData(1)
      wx.stopPullDownRefresh()
    }, 666);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData(this.data.pageNo + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})