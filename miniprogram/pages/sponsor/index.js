// pages/sponsor/index.js
const sponsorService = require('../../alicloud/services/sponsor');

let rewardedVideoAd = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //pageNo: 0,
    //sponsors: [],
    //mineSupport: ''
  },
  goSetPage(){
    wx.navigateTo({
      url: "/pages/set/index",
    });
  },
  onSupport() {
    rewardedVideoAd.show()
      .catch(() => {
        rewardedVideoAd.load()
          .then(() => rewardedVideoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
            wx.showToast({
              title: '广告显示失败',
              icon: 'error',
              duration: 3000
            })
          })
      })
  },
  // 加载数据
  async loadData(page) {
    const res = await sponsorService.page({
      page,
    });
    if (res.success) {
      this.setData({
        sponsors: page === 1 ? res.data : [...this.data.sponsors, ...res.data],
        pageNo: page,
      });
      console.log(this.data.sponsors)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    //this.loadData(1);
    // const res = await sponsorService.get()
    // if (res.success) {
    //   this.setData({
    //     mineSupport: res.data,
    //   });
    // }

    // 创建广告
    if (wx.createRewardedVideoAd) {
      rewardedVideoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-3095dee4fe741a53'
      })
      rewardedVideoAd.onLoad(() => {
        console.log('激励视频 广告加载成功')
      })
      rewardedVideoAd.onError((err) => {
        console.log('onError event emit', err)
      })
      rewardedVideoAd.onClose((res) => {
        // 用户点击了【关闭广告】按钮
        if (res && res.isEnded) {
          // 正常播放结束，可以下发游戏奖励
          this.rewardedSuccess()
        } else {
          // 播放中途退出，不下发游戏奖励
          wx.showToast({
            title: '没关系，下次一定',
            icon: 'none',
            duration: 3000
          })
        }
      })
    }
  },
  async rewardedSuccess() {
    wx.showToast({
      title: '充电成功，感谢有你',
      icon: 'none',
      duration: 3000
    })
    // if (!this.data.mineSupport) {
    //   this.data.mineSupport = {
    //     count: 1
    //   }
    //   const res = await sponsorService.add(this.data.mineSupport);
    //   if (res.success) {
    //     this.data.mineSupport._id = res.data
    //   }
    // } else {
    //   this.data.mineSupport.count++
    //   await sponsorService.update(this.data.mineSupport);
    // }
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
    //this.loadData(this.data.pageNo + 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})