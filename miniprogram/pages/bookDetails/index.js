const app = getApp()
const dayjs = require('dayjs');
const db = wx.cloud.database()
Page({
    data: {
        giftList: [],
        keyword: '',
        bookId: '',
        pageNo: 0,
    },
    formatDate(date) {
        return dayjs(date).format('YYYY-MM-DD');
    },
    onSearch() {
        wx.showToast({
            title: '搜索...马上写完，真的',
            icon: 'none',
        })
    },
    onAdd() {
        wx.navigateTo({
            url: `/pages/bookEdit/index`,
        });
    },
    loadData(page) {
        // 如果服务已经停止
        if (app.globalData.serviceStopped) {
            this.setData({
                service_stopped: true,
                giftList: []
            })
            return
        }
        if (page == 0) {
            this.data.giftList = []
            this.data.pageNo = 0
        }
        let that = this
        wx.cloud.callFunction({
            name: 'lijiFunctions',
            data: {
                type: 'lookupGiftFriend',
                page: page,
                limit: 10,
                where: {
                    userId: app.globalData.user._id,
                    bookId: this.data.bookId
                }
            }
        }).then(res => {
            if (res.result.list.length === 0) {
                return
            }
            let datas = this.data.giftList.concat(res.result.list)
            datas.map(i => {
                if (i.luckDay) {
                    i.luckDay = that.formatDate(i.luckDay)
                }
            })
            that.setData({
                giftList: datas,
                pageNo: that.data.pageNo + 1
            });
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.bookId = options.bookId
        this.loadData(0)
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
        this.loadData(this.data.pageNo)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})