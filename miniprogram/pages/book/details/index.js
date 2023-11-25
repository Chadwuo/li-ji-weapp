// pages/book/details/index.js
const giftReceiveService = require('@/services/giftReceive');
const bookService = require("@/services/book");
const app = getApp();
Page({
  data: {
    skipAD: app.userInfo.skipAD,
    giftList: [],
    book: {},
    pageNo: 0,
  },
  async onSearch(e) {
    const searchVal = e.detail
    if (!searchVal) {
      this.loadData(1);
      return;
    }
    const res = await giftReceiveService.getGiftReceivePage({
      bookId: this.data.book.id,
      friendName_like: searchVal,
    });
    this.setData({
      giftList: res.results,
    });
  },
  onAddGift() {
    wx.navigateTo({
      url: `/pages/giftReceive/edit/index?bookId=${this.data.book.id}`,
    });
  },
  onGiftClick(e) {
    wx.navigateTo({
      url: `/pages/giftReceive/edit/index?bookId=${this.data.book.id}&id=${e.currentTarget.dataset.gift.id}`,
    });
  },
  onEditClick() {
    wx.navigateTo({
      url: `/pages/book/edit/index?id=${this.data.book.id}`,
    });
  },
  async loadData(page) {
    const res = await giftReceiveService.getGiftReceivePage({
      bookId: this.data.book.id,
      page,
    });
    this.setData({
      giftList: page === 1 ? res.results : [...this.data.giftList, ...res.results],
      pageNo: page,
    });
    this.setData({
      skipAD: app.userInfo.skipAD
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      'book.id': options.id,
      skipAD: app.userInfo.skipAD,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow () {
    const res = await bookService.getBook(this.data.book.id)
    this.setData({
      book: res,
    })
    this.loadData(1)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData(this.data.pageNo + 1);
  },
});