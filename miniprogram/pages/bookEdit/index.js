// pages/bookEdit/index.js
const bookService = require('../../alicloud/services/book')
const dayjs = require('dayjs');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    _id: '',
    date: new Date().getTime(),
    title: '',
    remarks: '',
    dateFormat: dayjs().format('YYYY-MM-DD'),
    showCalendar: false,
    navBarTitle: '添加礼簿',
    active: 0,
    // 此处为日历自定义配置字段
    calendarConfig: {
      showLunar: true, // 是否显示农历，此配置会导致 setTodoLabels 中 showLabelAlways 配置失效
      markToday: '今', // 当天日期展示不使用默认数字，用特殊文字标记
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})