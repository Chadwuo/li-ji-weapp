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
  giftEditDialog({
    detail
  }) {
    switch (detail.type) {
      case 'insert':
        this.setData({
          giftList: [detail.data, ...this.data.giftList]
        })
        break;
      case 'update':
        let updateIndex = this.data.giftList.findIndex(i => {
          return i._id == detail.data._id
        })
        this.setData({
          giftList: this.data.giftList.splice(updateIndex, 1, detail.data)
        })
        break;
      case 'delete':
        let delIndex = this.data.giftList.findIndex(i => {
          return i._id == detail.data._id
        })
        this.setData({
          giftList: this.data.giftList.splice(delIndex, 1)
        })
        break;
      default:
        break;
    }
  },
  onAddGift() {
    const giftEdit = this.selectComponent('#gift-out-edit')
    giftEdit.show()
  },
  async loadData(page) {
    const that = this
    const res = await giftOutService.getGiftOutPage({
      page: page,
      limit: 10
    })
    if (res.success) {
      that.setData({
        giftBooks: this.data.giftList.concat(res.data),
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
        giftBooks: []
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