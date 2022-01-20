// index.js
const app = getApp()
const dayjs = require('dayjs');
const db = wx.cloud.database()
Page({
  data: {
    pageNo: 0,
    giftList: [],
    year: '2021',
    // 年度选择
    showYearPicker: false,
    // 年度选择集合
    yearData: ['2021', ],
    receiveTotal: '0.00',
    giveTotal: '0.00',
    service_stopped: false
  },
  formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  },
  computedGiftTotl() {
    const $ = db.command.aggregate
    let that = this
    db.collection('gift')
      .aggregate()
      .match({
        userId: app.globalData.user._id,
        type: '收'
      })
      .group({
        _id: null,
        total: $.sum('$money')
      })
      .end()
      .then(res => {
        that.setData({
          receiveTotal: res.list[0].total.toFixed(2),
        });
      })

    db.collection('gift')
      .aggregate()
      .match({
        userId: app.globalData.user._id,
        type: '送'
      })
      .group({
        _id: null,
        total: $.sum('$money')
      })
      .end()
      .then(res => {
        that.setData({
          giveTotal: res.list[0].total.toFixed(2),
        });
      })
  },
  // 显示年度选择框
  yearPickerShow() {
    this.setData({
      showYearPicker: true
    })
  },
  // 年度选择框 改变
  yearPickerChange(event) {
    this.setData({
      year: event.detail.value
    });
  },
  // 关闭年度选择框
  yearPickerClose() {
    this.setData({
      showYearPicker: false
    });
    // todo 加载对应年度的账单
    // ...
  },
  onGiftClick(e) {
    wx.navigateTo({
      url: `/pages/giftEdit/index?giftId=${e.currentTarget.dataset.giftid}`,
    });
  },

  loadData(page) {
    // 如果服务已经停止
    if (app.globalData.serviceStopped) {
      this.setData({
        service_stopped: true,
        giftList: []
      })
      return
    }
    if (page == 0) {
      this.data.giftList = []
    }
    let that = this
    wx.cloud.callFunction({
      name: 'lijiFunctions',
      data: {
        type: 'lookupGiftFriend',
        page: page,
        limit: 10
      }
    }).then(res => {
      if (res.result.list.length === 0) {
        return
      }
      let datas = this.data.giftList.concat(res.result.list)
      datas.map(i => {
        if (i.luckDay) {
          i.luckDay = that.formatDate(i.luckDay)
        }
      })
      that.setData({
        giftList: datas,
        pageNo: that.data.pageNo + 1
      });
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.user._id) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      setTimeout(() => {
        if (app.globalData.user._id) {
          this.loadData(0)
          this.computedGiftTotl();
          wx.hideLoading()
        }
      }, 1500)
    }
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
    // 是否需要刷新
    if (app.globalData.refreshRequired.home) {
      this.loadData(0)
      this.computedGiftTotl();
      app.globalData.refreshRequired.home = false
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
    this.loadData(0)
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1500);
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