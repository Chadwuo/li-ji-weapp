// pages/about/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  Chadwuo() {
    const arr = [
      "你拍了拍作者头顶\r\n却没摸到秀发",
      "要不要来一把LOL",
      "花生，你发现了彩蛋",
    ];
    const index = Math.floor(Math.random() * arr.length);
    wx.showToast({
      title: arr[index],
      icon: "none",
      duration: 2500,
    });
  },
  tapCopy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.value,
      success() {
        wx.showToast({
          title: "复制成功！",
          icon: "none",
        });
      },
      fail() {
        wx.showToast({
          title: "复制失败！",
          icon: "none",
        });
      },
    });
  },
  openComment() {
    var plugin = requirePlugin("wxacommentplugin");
    plugin.openComment({
      // wx_pay_id: '4200001729202306024807578', // 交易评价类账号选填
      success: (res) => {
        console.log("plugin.openComment success", res);
      },
      fail: (res) => {
        console.log("plugin.openComment fail", res);
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "可能是东半球最好用的人情记账工具",
      path: "pages/start/index",
      imageUrl: "/static/img/share.png",
    };
  },
  onShareTimeline: function () {
    return {
      title: "可能是东半球最好用的人情记账工具",
    };
  },
});
