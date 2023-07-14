// pages/start/index.js
const app = getApp();
import { getUserInfo, getUserDataScope } from "../../alicloud/services/user";
import { computedTotalGiftOut } from "../../alicloud/services/giftOut";
import { computedTotalGiftReceive } from "../../alicloud/services/giftReceive";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    netError: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 刷新统计数据
    app.refreshTotal = async () => {
      const { data: r } = await computedTotalGiftReceive();
      const { data: o } = await computedTotalGiftOut();
      app.giftTotal = {
        receive: r || 0,
        out: o || 0,
      };
    };
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  /**
   * 初始化用户数据
   */
  async initUserInfo() {
    const res = await getUserInfo();
    if (res.success) {
      app.userInfo = res.data;
    } else {
      console.log(res);
      this.setData({
        netError: true,
      });
    }
  },
  /**
   * 初始化用户数据范围
   */
  async initUserDataScope() {
    app.userDataScope = await getUserDataScope();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    if (!app.userInfo || !app.userDataScope) {
      await this.initUserInfo();
      await this.initUserDataScope();
    }

    setTimeout(() => {
      if (!this.data.netError) {
        wx.switchTab({
          url: "/pages/index/index",
        });
        app.refreshTotal();
      }
    }, 1500);
  },
  onRetry() {
    this.setData({
        netError: true,
      });
    // 小程序重启
    wx.reLaunch({
      url: "/pages/start/index",
    });
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
