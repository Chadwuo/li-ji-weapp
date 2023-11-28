// pages/friend/select/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  onFriendClick(e) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit("dialogResult", e.detail);
    wx.navigateBack();
  },
  onSearch(e) {
    const searchVal = e.detail
    this.loadData({
      searchValue: searchVal
    });
  },
  async loadData(parameter) {
    const child = this.selectComponent('#index-bar');
    child.loadData(parameter)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.loadData();
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