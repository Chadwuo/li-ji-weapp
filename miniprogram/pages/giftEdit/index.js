const dayjs = require('dayjs');

Page({
    /**
     * 页面的初始数据
     */
    data: {
      id:'1',
      luckDay: dayjs().format('YYYY-MM-DD'),
      name:'',
      bookId:'',
      money:'',
      type:'',
      wishes:'',
      friendName:'',
      friendKinship:'',
      showCalendar: false
    },
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
    saveGift(){
      wx.showToast({
        title: '保存...马上写完，真的',
        icon: 'none',
      })
    },
    delGift(){
      wx.showModal({
        title: '删除记录？',
        content: '该人情记录删除后无法恢复，确定删除？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    },
    onDisplay() {
      this.setData({
        showCalendar: true
      });
    },
    onClose() {
      this.setData({
        showCalendar: false
      });
    },
    onConfirm(event) {
      this.setData({
        showCalendar: false,
        luckDay: this.formatDate(event.detail),
      });
    },
    onGiftTypeChange(event) {
      this.setData({
        type: event.detail.name
      });
    },
    onSelectFriends(){
      console.log('选择亲友')
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
  
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    }
  })