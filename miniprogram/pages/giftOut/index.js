// pages/giftOut/index.js
const giftOutService = require('../../alicloud/services/giftOut');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    skipAD: app.userInfo.skipAD,
    scrollTop: 0,
    pageNo: 0,
    giftList: [],
    total: '0.00',
  },
  // 监听用户滑动页面事件。
  onPageScroll(e) {
    // 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
    // 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
    // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object
    this.setData({
      scrollTop: e.scrollTop,
    });
  },
  onSearch(e) {
    const searchVal = e.detail
    if (!searchVal) {
      this.loadData(1);
      return;
    }
    this.setData({
      giftList: this.data.giftList.filter((i) =>
        i.friendInfo.name.includes(searchVal)
      ),
    });
  },
  onGiftClick(e) {
    wx.navigateTo({
      url: '/pages/giftOut/edit/index',
      events: {
        refresh: () => {
          this.loadData(1);
        },
      },
      success: function (res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          ...e.currentTarget.dataset.gift,
          friendName: e.currentTarget.dataset.gift.friendInfo.name,
        });
      },
    });
  },
  onAdd() {
    wx.navigateTo({
      url: '/pages/giftOut/edit/index',
      events: {
        refresh: () => {
          this.loadData(1);
        },
      },
    });
  },
  async loadData(page) {
    const res = await giftOutService.getGiftOutPage({
      page,
    });
    if (res.success) {
      this.setData({
        giftList: page === 1 ? res.data : [...this.data.giftList, ...res.data],
        pageNo: page,
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData(1);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      skipAD: app.userInfo.skipAD
    })
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData(this.data.pageNo + 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '可能是东半球最好用的人情记账工具',
      path: 'pages/start/index',
      imageUrl: '/static/img/share.png',
    };
  },
});