const giftOutService = require('../../alicloud/services/giftOut')
const giftReceiveService = require('../../alicloud/services/giftReceive')
const jinrishici = require('../../utils/jinrishici.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    welcome: '',
    giveTotal: 0.00,
    receiveTotal: 0.00,
    menus: [{
        page: "family",
        icon: "shop-o",
        name: "我的家庭"
      },
      {
        page: "export",
        icon: "peer-pay",
        name: "数据导出"
      },
      {
        page: "chart",
        icon: "chart-trending-o",
        name: "统计分析"
      },
      // {
      //   page: "sponsor",
      //   icon: "good-job-o",
      //   name: "赞赏"
      // },
      {
        page: "question",
        icon: "question-o",
        name: "常见问题"
      },
      {
        page: "issue",
        icon: "smile-comment-o",
        name: "意见反馈"
      },
      {
        page: "share",
        icon: "share-o",
        open_type: 'share',
        name: "分享"
      },
      {
        page: "about",
        icon: "info-o",
        name: "关于"
      }
    ]
  },
  jumpPage(e) {
    if (e.currentTarget.dataset.page === 'chart') {
      wx.showToast({
        title: '统计分析，马上写完，真的...',
        icon: 'none',
      })
      return
    }
    if (e.currentTarget.dataset.page === 'export') {
      wx.showToast({
        title: '数据导出，马上写完，真的...',
        icon: 'none',
      })
      return
    }

    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    jinrishici.load(result => {
      this.setData({
        welcome: result.data.content
      })
    })
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    const res = await giftReceiveService.computedTotalGiftReceive()
    this.setData({
      receiveTotal: res.data,
    });
    const res1 = await giftOutService.computedTotalGiftOut()
    this.setData({
      giveTotal: res1.data,
    });
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
    return {
      title: '可能是东半球最好用的人情记账工具',
      path: "pages/index/index",
      imageUrl: '../../images/poster.png'
    }
  }
})