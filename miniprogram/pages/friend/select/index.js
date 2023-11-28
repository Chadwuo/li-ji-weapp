// pages/friend/select/index.js
const friendService = require("@/alicloud/services/friend");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    friendsList: [],
  },
  onSearch(e) {
    const searchVal = e.detail
    this.loadData({
      searchValue: searchVal
    });
  },
  // 选中联系人
  onSelectedFriend(e) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit("dialogResult", e.currentTarget.dataset.friend);
    wx.navigateBack();
  },
  async loadData(parameter) {
    this.setData({
      friendsList: [],
    });
    let listTemp = [];
    for (let index = 0; index < 26; index++) {
      listTemp.push({
        alpha: String.fromCharCode(65 + index),
        subItems: [],
      });
    }
    let noletter = {
      alpha: "#",
      subItems: [],
    };
    const res = await friendService.getFriendList(parameter);
    if (res.success) {
      for (const item of res.data) {
        const firstLetter = item.firstLetter;
        if (!firstLetter) {
          noletter.subItems.push(item);
        } else {
          for (const f of listTemp) {
            if (firstLetter.toUpperCase() === f.alpha) {
              f.subItems.push(item);
              break;
            }
          }
        }
      }
      listTemp.push(noletter);
      let list = listTemp.filter((i) => {
        return i.subItems.length != 0;
      });
      this.setData({
        friendsList: list,
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.loadData();
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