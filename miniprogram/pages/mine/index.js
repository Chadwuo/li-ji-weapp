const giftOutService = require('../../alicloud/services/giftOut')
const giftReceiveService = require('../../alicloud/services/giftReceive')
const jinrishici = require('../../utils/jinrishici.js')

Page({
    /**
     * 页面的初始数据
     */
    data: {
        scrollTop: 0,
        welcome: '',
        giveTotal: 0.00,
        receiveTotal: 0.00,
        menus: [{
                icon: "cicon-home-community",
                name: "我的家庭",
                color: "#9DCA06",
                path: "/pages/family/index"
            },
            {
                icon: "cicon-backup",
                name: "数据导出",
                color: "#FFB300",
                path: "/pages/export/index"
            },
            {
                icon: "cicon-demo",
                name: "统计分析",
                color: "#53bcf5",
                path: "/pages/chart/index"
            },
            {
                icon: "cicon-service-fill",
                name: "亲友关系",
                color: "#F37D7D",
                path: "/pages/chart/index"
            }
        ],
    },
    // 监听用户滑动页面事件。
    onPageScroll(e) {
        // 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
        // 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
        // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object
        this.setData({
            scrollTop: e.scrollTop
        })
    },
    jumpProfile() {
        wx.navigateTo({
            url: '/pages/profile/index',
        });
    },
    tapToUrl(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        })
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
        const {
            data: rTotal
        } = await giftReceiveService.computedTotalGiftReceive()
        this.setData({
            receiveTotal: rTotal || 0,
        });
        const {
            data: oTotal
        } = await giftOutService.computedTotalGiftOut()
        this.setData({
            giveTotal: oTotal || 0,
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
            imageUrl: '/static/img/share.jpg'
        }
    }
})