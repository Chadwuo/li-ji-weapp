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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 分页获取数据
  getPage(page, limit) {
    return db.collection('gift')
      .where({
        userId: app.globalData.user._id
      })
      .orderBy('luckyDay', 'desc')
      .skip(page * limit)
      .limit(limit)
      .get()
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
    this.data.pageNo = 0
    this.getPage(this.data.pageNo, 10).then(res => {
      if (res.data.length === 0) {
        this.setData({
          pageEnd: true,
        });
      }
      this.setData({
        giftList: res.data,
        pageNo: this.data.pageNo + 1
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
    if (!this.data.pageEnd) {
      // this.setData({
      //   loading: true,
      // });
      this.getPage(this.data.pageNo, 10).then(res => {
        if (res.data.length > 0) {
          let datas = this.data.giftList.concat(res.data)
          this.data.pageNo + 1
          this.setData({
            giftList: datas
          });
        }
      })
    }
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