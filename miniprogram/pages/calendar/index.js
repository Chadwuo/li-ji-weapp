// pages/calendar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: ''
  },
  handleCalendarLoad({
    detail
  }) {
    console.log('calendar-load', detail)
    if (this.data.date) {
      this.calendar = this.selectComponent('#calendar')
      this.calendar.toDate(this.data.date);
    }
  },
  handleCalendarDateChange({
    detail
  }) {
    console.log('calendar-date-change', detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      date: options.date
    })
  },
})