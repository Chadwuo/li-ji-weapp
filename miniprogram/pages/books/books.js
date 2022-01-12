// pages/books/books.js
const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    pageNo: 0,
    pageEnd: false,
    giftBooks: [],
    actionId: '',
    showBookAction: false,
    bookActions: [{
        name: '编辑',
      },
      {
        name: '删除',
        subname: '该礼簿所有来往记录都将被删除',
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
    wx.navigateTo({
      url: `/pages/bookEdit/index`,
    });
  },
  onBookClick(e) {
    wx.navigateTo({
      url: `/pages/bookDetails/index?bookId=${e.currentTarget.dataset.bookid}`,
    });
  },
  onBookLongPress(e) {
    this.setData({
      showBookAction: true,
      actionId: e.currentTarget.dataset.bookid
    });
  },
  onCloseBookAction() {
    this.setData({
      showBookAction: false
    });
  },
  onSelectBookAction(event) {
    var that = this
    switch (event.detail.name) {
      case '删除':
        wx.showModal({
          title: '删除礼簿？',
          content: '该礼簿所有来往记录都将被删除，确定删除？',
          success(res) {
            if (res.confirm) {
              db.collection('book').doc(that.data.actionId).remove({
                success: function (res) {
                  that.setData({
                    giftBooks: that.data.giftBooks.filter(item => item._id != that.data.actionId)
                  })
                  wx.showToast({
                    title: '删除成功',
                  })
                }
              })
            }
          }
        })
        break;
      case '编辑':
        wx.navigateTo({
          url: `/pages/bookEdit/index?bookId=${this.data.actionId}`,
        });
        break;
      default:
        break;
    }
  },

  computeTotal(datas) {
    let total = 0
    for (let item of datas) {
      if (item.type == '收') {
        total += Number(item.money)
      } else {
        total -= Number(item.money)
      }
    }
    return total
  },

  // 添加礼簿下记录总计和个数信息
  joinGifts(list) {
    let that = this
    return list.map(i => {
      db.collection('gift').where({
        userId: app.globalData.user._id,
        bookId: i._id
      }).get().then(res => {
        i.total = that.computeTotal(res.data)
        i.count = res.data.length
      })
    })
  },
  // 分页获取数据
  getPage(page, limit) {
    return db.collection('book')
      .where({
        userId: app.globalData.user._id
      })
      .orderBy('luckyDay', 'desc')
      .skip(page * limit)
      .limit(limit)
      .get()
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
    this.data.pageNo = 0
    this.getPage(this.data.pageNo, 10).then(res => {
      if (res.data.length === 0) {
        this.setData({
          pageEnd: true,
        });
      }
      this.setData({
        giftBooks: this.joinGifts(res.data),
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.pageEnd) {
      // this.setData({
      //   loading: true,
      // });
      this.getPage(this.data.pageNo, 10).then(res => {
        if (res.data.length > 0) {
          let datas = this.data.giftBooks.concat(res.data)
          this.data.pageNo + 1
          this.setData({
            giftBooks: this.joinGifts(datas)
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