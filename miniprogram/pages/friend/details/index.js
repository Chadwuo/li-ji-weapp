// pages/friend/details/index.js
const friendService = require('../../../alicloud/services/friend');
import dayjs from 'dayjs';

const app = getApp();

Page({
  data: {
    friend: {},
    giftList: [],
    avatarUrl: '',
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
      avatarUrl:
        app.userInfo.avatarUrl ||
        'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    });

    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', async (data) => {
      this.setData({
        ...data,
      });
      const res = await friendService.getFriendGifts({
        _id: this.data.friend._id,
      });

      if (res.success) {
        const { giftOutList, giftReceiveList } = res.data;

        let inList = giftReceiveList.map((i) => {
          // 收礼金额总计
          this.data.happyTotal += i.money;
          return {
            id: i._id,
            title: i.bookInfo.title,
            money: i.money,
            date: i.bookInfo.date.value,
            self: false,
          };
        });
        let outList = giftOutList.map((i) => {
          // 送礼金额总计
          this.data.sadTotal += i.money;
          return {
            id: i._id,
            title: i.title,
            money: i.money,
            date: i.date.value,
            icon: i.icon,
            self: true,
          };
        });

        let gifts = inList.concat(outList);

        gifts.sort((a, b) => {
          return dayjs(b.date).unix() - dayjs(a.date).unix();
        });

        this.setData({
          sadCount: giftOutList.length, // 送礼次数
          sadTotal: this.data.sadTotal,
          happyCount: giftReceiveList.length, // 收礼次数
          happyTotal: this.data.happyTotal,
          giftList: gifts,
        });
      }
    });
  },
  // 编辑按钮
  onEditClick() {
    wx.navigateTo({
      url: `/pages/friend/edit/index?friendId=${this.data.friend._id}`,
      events: {
        refresh: () => {
          // TODO 当前页数据不会刷新
          const eventChannel = this.getOpenerEventChannel();
          eventChannel.emit('refresh');
        },
      },
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
