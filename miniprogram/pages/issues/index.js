// pages/issues/index.js
const app = getApp()
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        message: '',
        loading: false,
        issuesData: [],
        pageNo: 0,
        pageEnd: false
    },
    onTabsClick(event) {
        // 进入意见片墙
        if (event.detail.name === 'issues') {
            this.data.pageNo = 0
            this.getIssuesPage(this.data.pageNo, 10).then(res => {
                if (res.data.length === 0) {
                    this.setData({
                        pageEnd: true,
                    });
                }
                this.setData({
                    issuesData: res.data,
                    pageNo: this.data.pageNo + 1
                });
            })
        }
    },
    getIssuesPage(page, limit) {
        return db.collection('issues')
            .orderBy('createTime', 'desc')
            .skip(page * limit)
            .limit(limit)
            .get()
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
        if (!this.data.pageEnd) {
            this.setData({
                loading: true,
            });
            this.getIssuesPage(this.data.pageNo, 10).then(res => {
                if (res.data.length > 0) {
                    let issuesData = this.data.issuesData.concat(res.data)
                    this.setData({
                        issuesData,
                        pageNo: this.data.pageNo + 1
                    });
                }
            }).finally(
                this.setData({
                    loading: false,
                })
            );
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})