const app = getApp()
const db = wx.cloud.database()
Page({
    data: {
        giftList: [],
        bookId: '',
        pageNo: 0,
        pageEnd: false,
    },
    // 分页获取数据
    getPage(page, limit) {
        return db.collection('gift')
            .where({
                userId: app.globalData.user._id,
                bookId: this.data.bookId
            })
            .orderBy('luckyDay', 'desc')
            .skip(page * limit)
            .limit(limit)
            .get()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        that.setData({
            bookId: options.bookId,
        });
        this.data.pageNo = 0
        this.getPage(this.data.pageNo, 10).then(res => {
            if (res.data.length === 0) {
                this.setData({
                    pageEnd: true,
                });
            }
            this.setData({
                giftList: res.data,
                pageNo: this.data.pageNo + 1
            });
        })
        wx.setNavigationBarTitle({
            title: ''
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
        let that = this
        if (!this.data.pageEnd) {
            // this.setData({
            //   loading: true,
            // });
            this.getPage(this.data.pageNo, 10).then(res => {
                if (res.data.length > 0) {
                    let datas = that.data.giftList.concat(res.data)
                    this.data.pageNo + 1
                    this.setData({
                        giftList: datas
                    });
                }
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})