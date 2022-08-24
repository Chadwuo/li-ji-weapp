const dayjs = require('dayjs');
const giftReceiveService = require('../../alicloud/services/giftReceive')

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
    onAddGift() {
        const giftEdit = this.selectComponent('#gift-receive-edit')
        giftEdit.show()
    },
    loadData(page) {
        const that = this
        const res = await giftReceiveService.getGiftReceivePage({
            page: page,
            limit: 10,
            bookId: this.data.bookId
        })
        if (res.success) {
            that.setData({
                giftList: this.data.giftList.concat(res.data),
                pageNo: page
            });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.data.bookId = options.bookId
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        await this.loadData(1)
        // 人为延迟一点，避免loading动画闪烁
        setTimeout(function () {
            wx.hideLoading()
        }, 666)
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
    async onPullDownRefresh() {
        // 感觉延迟一下，会舒服点
        setTimeout(async () => {
            this.setData({
                giftList: []
            })
            await this.loadData(1)
            wx.stopPullDownRefresh()
        }, 666);
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