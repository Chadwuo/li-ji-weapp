// pages/book/details/index.js
const giftReceiveService = require('../../../alicloud/services/giftReceive');

Page({
  data: {
    giftList: [],
    book: {},
    pageNo: 0,
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
  onAddGift() {
    let that = this;
    wx.navigateTo({
      url: '/pages/giftReceive/edit/index',
      events: {
        refresh: () => {
          this.loadData(1);
          const eventChannel = this.getOpenerEventChannel();
          eventChannel.emit('refresh');
        },
      },
      success: function (res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          bookId: that.data.book._id,
          bookName: that.data.book.title,
        });
      },
    });
  },
  onGiftClick(e) {
    let that = this;
    wx.navigateTo({
      url: '/pages/giftReceive/edit/index',
      events: {
        refresh: () => {
          this.loadData(1);
          const eventChannel = this.getOpenerEventChannel();
          eventChannel.emit('refresh');
        },
      },
      success: function (res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          ...e.currentTarget.dataset.gift,
          friendName: e.currentTarget.dataset.gift.friendInfo.name,
          bookName: that.data.book.title,
          inBook: true,
        });
      },
    });
  },
  onEditClick() {
    wx.navigateTo({
      url: `/pages/book/edit/index`,
      success: (res) => {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit(
          'acceptDataFromOpenerPage',
          this.data.book
        );
      },
      events: {
        refresh: () => {
          const eventChannel = this.getOpenerEventChannel();
          eventChannel.emit("refresh");
          setTimeout(() => {
            wx.navigateBack();
          }, 1100);
        },
      },
    });
  },
  async loadData(page) {
    const res = await giftReceiveService.getGiftReceivePage({
      bookId: this.data.book._id,
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
  async onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', async (data) => {
      this.setData({
        ...data,
      });
      await this.loadData(1);
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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