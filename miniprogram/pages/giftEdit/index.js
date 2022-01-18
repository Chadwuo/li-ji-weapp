const app = getApp();
const dayjs = require('dayjs');
const db = wx.cloud.database();
import pinyin from "wl-pinyin";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    luckDay: new Date().getTime(),
    luckDayFormat: dayjs().format('YYYY-MM-DD'),
    name: '',
    bookId: '',
    money: '',
    type: '收',
    wishes: '',
    friendName: '',
    showCalendar: false,
    tip: '',
    price: 0,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
  },
  formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  },
  async saveGift() {
    let that = this
    if (!this.data.friendId) {
      // 先把联系人存起来
      await db.collection('friend').add({
        data: {
          name: that.data.friendName,
          userId: app.globalData.user._id,
          firstLetter: pinyin.getFirstLetter(that.data.friendName.substr(0, 1))
        }
      }).then(res => {
        that.setData({
          friendId: res._id,
        });
      })
    }
    db.collection('gift').doc(this.data.id).update({
      data: {
        userId: app.globalData.user._id,
        luckDay: new Date(this.data.luckDay),
        name: this.data.name,
        bookId: this.data.bookId,
        money: Number(this.data.money),
        type: this.data.type,
        wishes: this.data.wishes,
        friendId: this.data.friendId,
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '修改成功',
        })
      }
    })
  },
  delGift() {
    var that = this
    wx.showModal({
      title: '删除记录？',
      content: '该人情记录删除后无法恢复，确定删除？',
      success(res) {
        if (res.confirm) {
          db.collection('gift').doc(that.data.id).remove({
            success: function (res) {
              wx.showToast({
                title: '删除成功',
              })
            }
          })
        }
      }
    })
  },
  // 亲友名称修改
  onFriendBlur(e) {
    let that = this
    db.collection('friend').where({
        userId: app.globalData.user._id,
        name: e.detail.value
      })
      .get()
      .then(res => {
        if (res.data.length != 0) {
          // 有数据
          that.setData({
            friendId: res.data[0]._id,
            tip: `已有同名联系人【${res.data[0].name}】，记录会添加在与该亲友的来往记录中`
          });
        } else {
          // 名字改了 数据库没有相关人信息，friendId 置空
          that.setData({
            friendId: '',
          });
        }
      })
  },
  onMoneyBlur(e) {
    this.setData({
      price: Number(e.detail.value) * 100
    })
  },
  onDisplay() {
    this.setData({
      showCalendar: true
    });
  },
  onClose() {
    this.setData({
      showCalendar: false
    });
  },
  onConfirm(event) {
    this.setData({
      showCalendar: false,
      luckDay: event.detail,
      luckDayFormat: this.formatDate(event.detail),
    });
  },
  onGiftTypeChange(event) {
    this.setData({
      type: event.detail.name
    });
  },
  // 选择联系人
  onSelectFriends() {
    let that = this
    wx.navigateTo({
      url: '/pages/friendSelect/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromFriendPage: function (data) {
          that.setData({
            friendName: data.name,
            friendId: data._id,
          })
        }
      }
    })
  },
  // 选择礼簿
  onSelectBooks() {
    let that = this
    wx.navigateTo({
      url: '/pages/bookSelect/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromBookPage: function (data) {
          that.setData({
            bookName: data.name,
            bookId: data._id,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('gift').doc(options.giftId).get().then(res => {
      that.setData({
        id: res.data._id,
        luckDay: new Date(res.data.luckDay).getTime(),
        luckDayFormat: this.formatDate(res.data.luckDay),
        name: res.data.name,
        bookId: res.data.bookId,
        money: res.data.money,
        type: res.data.type,
        wishes: res.data.wishes,
        friendId: res.data.friendId,
        // friendName: that.getFriendName(res.data.friendId),
        // bookName: that.getBookName(res.data.bookId)
      });
      if (res.data.friendId) {
        that.getFriendName(res.data.friendId)
      }
      if (res.data.bookId) {
        that.getBookName(res.data.bookId)
      }
    })
  },
  getFriendName(id) {
    let that = this
    db.collection('friend').doc(id).get().then(res => {
      that.setData({
        friendName: res.data.name
      });
    })
  },
  getBookName(id) {
    let that = this
    db.collection('book').doc(id).get().then(res => {
      that.setData({
        bookName: res.data.name
      });
    })
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