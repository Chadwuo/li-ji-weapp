// index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    pageNo: 0,
    pageEnd: false,
    giftList: [],
    year: '2021',
    // 年度选择
    showYearPicker: false,
    // 年度选择集合
    yearData: ['2021', ],
    receiveTotal: '0.00',
    giveTotal: '0.00',
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
  onShow: function () {
    this.computedGiftTotl();
    this.data.pageNo = 0
    let that = this
    wx.cloud.callFunction({
      name: 'lijiFunctions',
      data: {
        type: 'lookupGiftFriend',
        page: this.data.pageNo,
        limit: 10
      }
    }).then(res => {
      that.setData({
        giftList: res.result.list,
        pageNo: that.data.pageNo + 1
      });
    })
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
    this.computedGiftTotl();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this
    if (!this.data.pageEnd) {
      wx.cloud.callFunction({
        name: 'lijiFunctions',
        data: {
          type: 'lookupGiftFriend',
          page: this.data.pageNo,
          limit: 10
        }
      }).then(res => {
        if (res.result.list.length > 0) {
          let datas = this.data.giftList.concat(res.result.list)
          this.setData({
            giftList: datas,
            pageNo: that.data.pageNo + 1
          });
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})