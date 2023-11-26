// pages/friend/details/index.js
const friendService = require("@/services/friend");
import dayjs from "dayjs";

const app = getApp();

Page({
  data: {
    friend: {},
    giftList: [],
    avatarUrl: "",
    //统计
    count: {
      in: 0,
      inTotal: 0,
      out: 0,
      outTotal: 0,
    },
    happyCount: 0,
    happyTotal: 0,
    sadCount: 0,
    sadTotal: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      'friend.id': options.id,
    });
  },
  // 编辑按钮
  onEditClick() {
    wx.navigateTo({
      url: `/pages/friend/edit/index?id=${this.data.friend.id}`,
    });
  },
  onGiftClick(e) {
    return;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    friendService.getFriend(this.data.friend.id).then(([, friend]) => {
      this.setData({
        friend
      })
    })
    const [err, res] = await friendService.getFriendGifts(this.data.friend.id);

    if (!err) {
      const { giftOutList, giftReceiveList } = res;

      let inList = giftReceiveList.map((i) => {
        // 收礼金额总计
        this.data.happyTotal += i.money;
        return {
          id: i.id,
          title: i.bookInfo.title,
          money: i.money,
          date: i.bookInfo.date,
          year: i.bookInfo.date.year,
          self: false,
        };
      });
      let outList = giftOutList.map((i) => {
        // 送礼金额总计
        this.data.sadTotal += i.money;
        return {
          id: i.id,
          title: i.title,
          money: i.money,
          date: i.date,
          year: i.date.year,
          icon: i.icon,
          self: true,
          remarks: i.remarks,
        };
      });

      let allGifts = [...inList, ...outList];
      const sortedGifts = allGifts.sort(
        (a, b) => dayjs(b.date.value).unix() - dayjs(a.date.value).unix()
      );

      const groupedGifts = sortedGifts.reduce((acc, curr) => {
        acc[curr.year] = acc[curr.year] ? [...acc[curr.year], curr] : [curr];
        return acc;
      }, {});

      const sortedGroupedGifts = Object.entries(groupedGifts)
        .map(([year, list]) => ({
          year,
          list,
        }))
        .sort((a, b) => b.year - a.year);

      this.setData({
        sadCount: giftOutList.length, // 送礼次数
        sadTotal: this.data.sadTotal,
        happyCount: giftReceiveList.length, // 收礼次数
        happyTotal: this.data.happyTotal,
        giftList: sortedGroupedGifts,
      });
    }
  },

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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
});
