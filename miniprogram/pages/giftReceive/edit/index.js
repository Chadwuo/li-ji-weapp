// pages/giftReceive/edit/index.js
const giftReceiveService = require("../../../alicloud/services/giftReceive");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gift: {
      id: "",
      friendId: "",
      friendName: "",
      money: "",
      remarks: "",
      bookId: "",
    },
    keepNote: false,
  },
  async onSave() {
    if (this.data.gift.id) {
      const res = await giftReceiveService.updateGiftReceive(this.data.gift.id, this.data.gift);
      wx.showToast({
        title: "修改成功",
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    } else {
      const res = await giftReceiveService.addGiftReceive(this.data.gift);
      wx.showToast({
        title: "添加成功",
      });
      if (this.data.keepNote) {
        this.setData({
          gift: {
            bookId: this.data.gift.bookId,
          }
        });
        return;
      }
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    }
  },
  async onDelete() {
    wx.showModal({
      title: "删除来往记录？",
      content: "此操作无法恢复，确定删除？",
      success: async (res) => {
        if (res.confirm) {
          const result = await giftReceiveService.deleteGiftReceive(this.data.gift.id);
          wx.showToast({
            title: "删除成功",
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1000);
        }
      },
    });
  },
  showFriendSelect() {
    let that = this;
    wx.navigateTo({
      url: "/pages/friend/select/index",
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        dialogResult: function (data) {
          that.setData({
            friendId: data.id,
            friendName: data.name,
          });
        },
      },
    });
  },
  showCalendar() {
    let that = this;
    wx.navigateTo({
      url: `/pages/calendar/index?date=${this.data.date.value}`,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        handleCalendarDateChange: function (data) {
          that.setData({
            date: data,
          });
        },
      },
    });
  },
  inputListener(e) {
    this.setData({
      [e.currentTarget.id]: e.detail.value
    })
  },
  onKeepNoteChange(e) {
    this.setData({
      keepNote: e.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      'gift.id': options.id,
      'gift.bookId': options.bookId,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    if(this.data.gift.id) {
      const res = await giftReceiveService.getGiftOut(this.data.gift.id)
      this.setData({
        gift: res,
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
});
