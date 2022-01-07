Page({
    /**
     * 页面的初始数据
     */
    data: {
      id:'1',
      name:'',
      remarks:'',
      friendKinship:'',
    },
    saveFriend(){
      wx.showToast({
        title: '保存...马上写完，真的',
        icon: 'none',
      })
    },
    delFriend(){
      wx.showModal({
        title: '删除联系人？',
        content: '该联系人所有来往记录都将被删除，确定删除？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
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