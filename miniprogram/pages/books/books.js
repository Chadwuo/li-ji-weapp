// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    giftBooks: [{
        id: 1,
        name: "婚礼",
        count: 30,
        total: 556,
      },
      {
        id: 2,
        name: "弄璋之喜",
        count: 24,
        total: 666,
      },
      {
        id: 3,
        name: "弄瓦之喜",
        count: 24,
        total: 866,
      },
    ],
    showBookAction: false,
    bookActions: [{
        name: '编辑',
      },
      {
        name: '删除',
        subname: '该礼簿所有来往都将被删除',
      },
    ],
  },
  onSearch() {
    wx.showToast({
      title: '搜索...马上写完，真的',
      icon: 'none',
    })
  },
  onAdd() {
    wx.showToast({
      title: '添加...马上写完，真的',
      icon: 'none',
    })
  },
  onBookClick(e) {
    console.log(e.currentTarget.dataset.bookid)
    wx.showToast({
      title: '查看...马上写完，真的',
      icon: 'none',
    })
    // wx.navigateTo({
    //   url: `/pages/bookDetails/index`,
    // });
  },
  onBookLongPress() {
    this.setData({
      showBookAction: true
    });
  },
  onCloseBookAction() {
    this.setData({
      showBookAction: false
    });
  },
  onSelectBookAction(event) {
    wx.showToast({
      title: event.detail.name + '...马上写完，真的',
      icon: 'none',
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