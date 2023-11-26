// pages/giftOut/edit/index.js
const giftOutService = require("@/services/giftOut");
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
    gift: {
      id: ``,
      date: {
        value: ``,
      },
      friendId: "",
      friendName: ``,
      title: ``,
      icon: "",
      money: ``,
      remarks: ``,
    },
    columns: [
      {
        name: "结婚",
        icon: "iconfont icon-jiehun",
      },
      {
        name: "宝宝",
        icon: "iconfont icon-qinzi",
      },
      {
        name: "周岁",
        icon: "iconfont icon-zhousui",
      },
      {
        name: "乔迁",
        icon: "iconfont icon-qiaoqian",
      },
      {
        name: "生日",
        icon: "iconfont icon-shengri",
      },
      {
        name: "升学",
        icon: "iconfont icon-jiaoyu",
      },
      {
        name: "大寿",
        icon: "iconfont icon-laoren",
      },
      {
        name: "探望",
        icon: "iconfont icon-yiyuan",
      },
      {
        name: "白事",
        icon: "iconfont icon-sangzang",
      },
      {
        name: "其他",
        icon: "cicon-moneybag-o",
      },
    ],
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
  iconChange(e) {
    let { selected } = e.currentTarget.dataset;

    this.setData({
      'gift.title': selected.name,
      'gift.icon': selected.icon,
    });
  },
  async onSave() {
    if (this.data.gift.id) {
      const [err, res] = await giftOutService.updateGiftOut(this.data.gift.id, this.data.gift);
      wx.$okNavBack(`修改成功`)
    } else {
      const [err, res] = await giftOutService.addGiftOut(this.data.gift);
      wx.$okNavBack(`添加成功`)
    }
  },
  async onDelete() {
    wx.showModal({
      title: "删除来往记录？",
      content: "此操作无法恢复，确定删除？",
      success: async (res) => {
        if (res.confirm) {
          const [err, result] = await giftOutService.deleteGiftOut(this.data.gift.id);
          wx.$okNavBack(`删除成功`)
        }
      },
    });
  },
  onOpenCalendar() {
    this.setData({
      showCalendar: true,
    });
    const calendar = this.selectComponent("#calendar").calendar;
    const { year, month, day } = this.data.gift.date || {};
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
    let { year, month, date, lunar } = e.detail;
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
    console.log("afterTapDate", selectedDate); // => { year: 2019, month: 12, date: 3, ...}
    this.setData({
      'gift.date': selectedDate,
    });
  },
  showFriendSelect() {
    wx.navigateTo({
      url: "/pages/friend/select/index",
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        dialogResult: (data) => {
          this.setData({
            'gift.friendId': data.id,
            'gift.friendName': data.name,
          });
        },
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      'gift.id': options.id,
    });
    wx.setNavigationBarTitle({
      title: "编辑记录",
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
      giftOutService.getGiftOut(this.data.gift.id).then(([, gift]) => {
        this.setData({
          gift
        })
      })
    }
  },
  inputListener(e){
    this.setData({
      [e.currentTarget.id]: e.detail.value
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
