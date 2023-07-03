// pages/calendar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    darkMode: wx.getSystemInfoSync().theme == 'dark'
  },
  handleCalendarLoad({
    detail
  }) {
    console.log('calendar-load', detail)
    if (this.data.date) {
      this.calendar = this.selectComponent('#calendar')
      this.calendar.toDate(this.data.date);
    }
    this.calendarDateChange(detail)
  },
  handleCalendarDateChange({
    detail
  }) {
    console.log('calendar-date-change', detail)
    this.calendarDateChange(detail)
  },
  calendarDateChange(detail) {
    let selectedDate = {
      year: detail.date.year,
      month: detail.date.month,
      day: detail.date.day,
      value: `${detail.date.year}-${detail.date.month}-${detail.date.day}`,
      lunar_day: detail.date.lunar.lunar_date,
      lunar_month: detail.date.lunar.lunar_month,
      lunar_year: detail.date.lunar.lunar_year,
      lunar_term: detail.date.lunar.lunar_day,
    }
    console.log('selectedDate', selectedDate)
    const eventChannel = this.getOpenerEventChannel()
		eventChannel.emit('handleCalendarDateChange', selectedDate);
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