// pages/book/edit/index.js
const bookService = require("@/alicloud/services/book");
const app = getApp();

import solarLunar from "@/components/calendar/plugins/solarLunar/index";
import holidays from "@/components/calendar/plugins/holidays/index";
import plugin from "@/components/calendar/plugins/index";
plugin.use(solarLunar).use(holidays);

Page({
  /**
   * 页面的初始数据
   */
  data: {
    skipAD: app.userInfo.skipAD,
    book: {
      id: "",
      date: {},
      title: "",
      remarks: "",
    },
    tips: "",
    showCalendar: false,
    calendarConfig: {
      //multi: true, // 是否开启多选,
      //weekMode: true, // 周视图模式
      theme: "default", // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题色在参考 /theme 文件夹
      showLunar: true, // 是否显示农历，此配置会导致 setTodoLabels 中 showLabelAlways 配置失效
      //inverse: true, // 单选模式下是否支持取消选中,
      markToday: "今", // 当天日期展示不使用默认数字，用特殊文字标记
      //hideHeader: true, // 隐藏日历头部操作栏
      //takeoverTap: true, // 是否完全接管日期点击事件（日期不会选中)
      emphasisWeek: true, // 是否高亮显示周末日期
      //chooseAreaMode: true, // 开启日期范围选择模式，该模式下只可选择时间段
      showHolidays: true, // 显示法定节假日班/休情况，需引入holidays插件
      showFestival: true, // 显示节日信息（如教师节等），需引入holidays插件
      highlightToday: true, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
      //defaultDate: '2018-3-6', // 默认选中指定某天，如需选中需配置 autoChoosedWhenJump: true
      //preventSwipe: true, // 是否禁用日历滑动切换月份
      //firstDayOfWeek: 'Mon', // 每周第一天为周一还是周日，默认按周日开始
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      autoChoosedWhenJump: true, // 设置默认日期及跳转到指定日期后是否需要自动选中
    },
  },
  async onSave() {
    if (this.data.book.id) {
      const res = await bookService.updateBook(this.data.book.id, this.data.book);
      wx.showToast({
        title: "修改成功",
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 2,
        });
      }, 1000);
    } else {
      const res = await bookService.addBook(this.data.book);
      wx.showToast({
        title: "保存成功",
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 2,
        });
      }, 1000);
    }
  },
  async onDelete() {
    wx.showModal({
      title: "删除礼簿？",
      content: "该礼簿所有来往记录都将被删除，确定删除？",
      success: async (res) => {
        if (res.confirm) {
          const result = await bookService.deleteBook(this.data.book.id);
          if (result.success) {
            wx.showToast({
              title: "删除成功",
            });
            setTimeout(() => {
              wx.navigateBack({
                delta: 2,
              });
            }, 1000);
          }
        }
      },
    });
  },
  inputListener(e){
    this.setData({
      [e.currentTarget.id]: e.detail.value
    })
  },
  onOpenCalendar() {
    this.setData({
      showCalendar: true,
    });
    const calendar = this.selectComponent("#calendar").calendar;
    const {
      year,
      month,
      day
    } = this.data.book.date || {};
    if (year && month && day) {
      calendar.jump({
        year,
        month,
        date: day,
      });
    }
  },
  onClosePopup() {
    this.setData({
      showCalendar: false,
    });
  },
  /**
   * 选择日期后执行的事件
   */
  afterTapDate(e) {
    let {
      year,
      month,
      date,
      lunar
    } = e.detail;
    let selectedDate = {
      year,
      month,
      day: date,
      value: `${year}-${month}-${date}`,
      lunar_day: lunar.IDayCn,
      lunar_month: lunar.IMonthCn,
      lunar_year: `${lunar.gzYear}${lunar.Animal}年`,
      lunar_term: lunar.Term,
    };
    this.setData({
      'book.date': selectedDate
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      'book.id': options.id,
      skipAD: app.userInfo.skipAD,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    const arr = [
      "一场宴席活动中，用来登记所有来客贺礼的名册，称为礼簿。",
      "长按礼簿，进入编辑页",
    ];
    const index = Math.floor(Math.random() * arr.length);
    this.setData({
      tips: arr[index],
    });
    const res = await bookService.getBook(this.data.book.id)
    this.setData({
      book: res,
    })
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