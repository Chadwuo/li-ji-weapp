// pages/issues/index.js
// 引入 dayjs
const dayjs = require('dayjs');
const issueService = require('../../alicloud/services/issue')
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    title: '',
    content: '',
    reply: '',
    replyTime: '',
    issuesList: [],
    loading: false,
    pageNo: 1,
    isAdmin: app.userInfo.isAdmin,
    showAddPopup: false,
  },
  // 获取分页数据
  async loadData(page) {
    const res = await issueService.getIssuePage({
      page: page,
      limit: 10
    })
    if (res.success) {
      let list = res.data.map((i) => {
        i.createTime = dayjs(i.createTime).format('YYYY-MM-DD')
        i.replyTime = dayjs(i.replyTime).format('YYYY-MM-DD')
        return i
      })
      this.setData({
        loading: false,
        issuesList: this.data.issuesList.concat(list),
        pageNo: page
      });
    }
  },
  // 添加
  async onAddIssues() {
    const res = await issueService.addIssue(this.data)
    if (res.success) {
      // this.setData({
      //   issuesList: this.issuesList.unshift(res.data)
      // });
      wx.showToast({
        title: '提交成功，意见已记录，感谢你',
      })
    }
  },
  // 提交回复
  async onReplyIssues() {
    const res = await issueService.updateIssue(this.data)
    if (res.success) {
      wx.showToast({
        title: '回复成功',
      })
    }
  },
  async onDelIssues(e) {
    const _id = e.currentTarget.dataset.issuesid
    const res = await issueService.deleteIssue({
      _id
    })
    if (res.success) {
      wx.showToast({
        title: '删除成功',
      })
    }
  },
  // 打开回复弹窗
  onShowPopup(e) {
    let info = e.currentTarget.dataset.info
    this.setData({
      showAddPopup: true,
      replyContent: info.reply,
      issuesId: info._id,
    });
  },
  // 关闭回复弹窗
  onClosePopup() {
    this.setData({
      showAddPopup: false,
      replyContent: '',
      issuesId: ''
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData(1)
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
    this.setData({
      issuesList: []
    })
    this.loadData(1)
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 2000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData(this.data.pageNo + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})