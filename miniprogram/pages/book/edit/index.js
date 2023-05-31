// pages/book/edit/index.js
const bookService = require('../../../alicloud/services/book');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    date: {},
    title: '',
    remarks: '',
  },
  async onSave() {
    const eventChannel = this.getOpenerEventChannel();
    if (this.data._id) {
      const res = await bookService.updateBook(this.data);
      if (res.success) {
        wx.showToast({
          title: '修改成功',
        });
        eventChannel.emit('refresh');
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      }
    } else {
      const res = await bookService.addBook(this.data);
      if (res.success) {
        wx.showToast({
          title: '保存成功',
        });
        eventChannel.emit('refresh');
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      }
    }
  },
  async onDelete() {
    let delData = this.data;
    const eventChannel = this.getOpenerEventChannel();
    wx.showModal({
      title: '删除礼簿？',
      content: '该礼簿所有来往记录都将被删除，确定删除？',
      async success(res) {
        if (res.confirm) {
          const result = await bookService.deleteBook(delData);
          if (result.success) {
            wx.showToast({
              title: '删除成功',
            });
            app.needRefreshTotal = true;
            eventChannel.emit('refresh');
            setTimeout(() => {
              wx.navigateBack();
            }, 1000);
          }
        }
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
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      this.setData({
        ...data,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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
