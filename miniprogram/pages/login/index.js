// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  login(){
    wx.getUserProfile({
      desc: '使用户得到更好的体验',
      success: (res) => {
        let user = res.userInfo
        wx.setStorageSync('user', user)
        wx.showToast({
            icon:"success",
            title: '登录成功',
          })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          });
        },2000)
      },
      fail: res => {
          wx.showToast({
            title: '登录失败',
          })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})