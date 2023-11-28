// pages/friend/edit/index.js
const friendService = require("@/services/friend");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    skipAD: app.userInfo.skipAD,
    friend: {
      id: ``,
      name: "",
      firstLetter: "",
      relation: "",
      remarks: "",
    },
  },
  async onSave() {
    if (this.data.friend.id) {
      const [err, res] = await friendService.updateFriend(this.data.friend.id, this.data.friend);
      wx.$utils.msgBack(`修改成功`)
    } else {
      const [err, res] = await friendService.addFriend(this.data.friend);
      wx.$utils.msgBack(`添加成功`)
    }
  },
  async onDelete() {
    wx.showModal({
      title: "删除亲友？",
      content: "该亲友所有来往记录都将被删除，确定删除？",
      success: async (res) => {
        if (res.confirm) {
          const [err, res] = await friendService.deleteFriend(this.data.friend.id);
          wx.$utils.msgBack(`删除成功`, 2)
        }
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      'friend.id': options.id,
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
    if(this.data.friend.id) {
      const [err, friend] = await friendService.getFriend(this.data.friend.id);
      this.setData({
        friend
      });
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
