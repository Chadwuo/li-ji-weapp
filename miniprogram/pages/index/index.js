// pages/index/index.js
const bookService = require('../../alicloud/services/book')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    pageNo: 0,
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
  bookEditDialog({
    detail
  }) {
    switch (detail.type) {
      case 'insert':
        this.data.giftBooks.unshift(detail.data)
        this.setData({
          giftBooks: this.data.giftBooks
        })
        break;
      case 'update':
        break;
      case 'delete':
        this.setData({
          giftBooks: this.data.giftBooks.filter(i => {
            return i._id != detail.data._id
          })
        })
        break;
      default:
        break;
    }
    console.log(this.data.giftBooks)
  },
  onAddGift() {
    const giftEdit = this.selectComponent('#gift-receive-edit')
    giftEdit.show()
  },
  onAddBook() {
    const bookEdit = this.selectComponent('#book-edit')
    bookEdit.show()
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
  // 长按选择礼簿
  onSelectBookAction(event) {
    const that = this
    switch (event.detail.name) {
      case '删除':
        wx.showModal({
          title: '删除礼簿？',
          content: '该礼簿所有来往记录都将被删除，确定删除？',
          async success(result) {
            if (result.confirm) {
              const res = await bookService.deleteBook({
                _id: that.data.actionId
              })
              if (res.success) {
                wx.showToast({
                  title: '删除成功',
                })
                that.setData({
                  giftBooks: that.data.giftBooks.filter(i => {
                    return i._id != that.data.actionId
                  })
                })
              }
            }
          }
        })
        break;
      case '编辑':
        const bookEdit = this.selectComponent('#book-edit')
        bookEdit.show(this.data.actionId)
        break;
      default:
        break;
    }
  },
  computeTotal(datas) {
    return datas.map(i => {
      i.giftCount = i.giftList.length || 0
      i.giftTotal = 0
      for (let item of i.giftList) {
        i.giftTotal += Number(item.money)
      }
      return i
    })
  },
  async loadData(page) {
    const that = this
    const res = await bookService.getBookPage({
      page: page,
      limit: 10
    })
    if (res.success) {
      const resList = that.computeTotal(res.data)
      that.setData({
        giftBooks: this.data.giftBooks.concat(resList),
        pageNo: page
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    await this.loadData(1)
    // 人为延迟一点，避免loading动画闪烁
    setTimeout(function () {
      wx.hideLoading()
    }, 666)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
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
  onReachBottom() {
    this.loadData(this.data.pageNo + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})