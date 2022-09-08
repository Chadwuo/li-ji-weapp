// pages/book/details/index.js
const giftReceiveService = require('../../../alicloud/services/giftReceive')

Page({
  data: {
    giftList: [],
    keyword: '',
    book: {},
    pageNo: 0,
  },
  onSearch() {
    wx.showToast({
      title: '搜索...马上写完，真的',
      icon: 'none',
    })
  },
  onAddGift() {
    let that = this
    wx.navigateTo({
      url: '/pages/giftReceive/edit/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        dialogResult: function (data) {
          that.loadData(1)
        },
      },
      success: function (res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          bookId: that.data.book._id,
          inBook: true
        })
      }
    });
  },
  onGiftClick(e) {
    let that = this
    wx.navigateTo({
      url: '/pages/giftReceive/edit/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        dialogResult: function (data) {
          that.loadData(1)
        },
      },
      success: function (res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          ...e.currentTarget.dataset.gift,
          friendName: e.currentTarget.dataset.gift.friendInfo.name,
          remarks: '',
          bookName: that.data.book.title,
          inBook: true
        })
      }
    });
  },
  async loadData(page) {
    const that = this
    const res = await giftReceiveService.getGiftReceivePage({
      page: page,
      limit: 10,
      bookId: this.data.book._id
    })
    if (res.success) {
      that.setData({
        giftList: this.data.giftList.concat(res.data),
        pageNo: page
      });
    }
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
      wx.setNavigationBarTitle({
        title: data.book.title
      })
      await this.loadData(1)
      wx.hideLoading()
    })
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
  async onPullDownRefresh() {
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
    this.loadData(this.data.pageNo)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})