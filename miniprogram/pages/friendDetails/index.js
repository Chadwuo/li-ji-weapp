const dayjs = require('dayjs');
Page({
  data: {
    pageNo: 0,
    giftList: [],
    id: '',
    name: '',
    happyCount: '0',
    happyTotal: '0.00',
    sadCount: '0',
    sadTotal: '0.00',
  },
  formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  },
  // 计算统计往来记录
  computedGiftTotal() {
    const $ = db.command.aggregate
    db.collection('gift')
      .aggregate()
      .match({
        userId: app.globalData.user._id,
        friendId: this.data.id,
        type: '收'
      })
      .group({
        _id: null,
        total: $.sum('$money'),
        count: $.sum(1),
      })
      .end()
      .then(res => {
        this.setData({
          happyTotal: res.list[0].total.toFixed(2),
          happyCount: res.list[0].count
        });
      })

    db.collection('gift')
      .aggregate()
      .match({
        userId: app.globalData.user._id,
        friendId: this.data.id,
        type: '送'
      })
      .group({
        _id: null,
        total: $.sum('$money'),
        count: $.sum(1),
      })
      .end()
      .then(res => {
        this.setData({
          sadTotal: res.list[0].total.toFixed(2),
          sadCount: res.list[0].count
        });
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 亲友基本信息
    this.setData({
      id: options.friendId,
      name: options.friendName,
      pageNo: 0
    });

    this.computedGiftTotal();
    let that = this
    // 获取亲友来往记录
    this.getPage(this.data.pageNo, 10).then(res => {
      if (res.data.length === 0) {
        return
      }
      that.setData({
        giftList: res.data.map(i => {
          if (i.luckDay) {
            i.luckDay = that.formatDate(i.luckDay)
          }
          return i
        }),
        pageNo: that.data.pageNo + 1
      });
    })
  },
  // 编辑按钮
  onEditClick() {
    wx.navigateTo({
      url: `/pages/friendEdit/index?friendId=${this.data.id}`,
    });
  },
  // 分页获取数据
  getPage(page, limit) {
    return db.collection('gift')
      .where({
        userId: app.globalData.user._id,
        friendId: this.data.id
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
    this.computedGiftTotal();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getPage(this.data.pageNo, 10).then(res => {
      if (res.data.length > 0) {
        let datas = this.data.giftList.concat(res.data)
        this.data.pageNo + 1
        this.setData({
          giftList: datas.map(i => {
            if (i.luckDay) {
              i.luckDay = that.formatDate(i.luckDay)
            }
            return i
          }),
        });
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})