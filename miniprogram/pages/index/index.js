// pages/index/index.js
const bookService = require('../../alicloud/services/book')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollTop: 0,
        keyword: '',
        pageNo: 0,
        giftBooks: [],
        showBookAction: false,
        bookActions: [{
                name: '编辑',
            },
            {
                name: '删除',
                subname: '该礼簿所有来往记录都将被删除',
            },
        ],
        bookActionDetail: {}
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
    onSearch() {
        wx.showToast({
            title: '搜索...马上写完，真的',
            icon: 'none',
        })
    },
    // 添加收礼
    onAddGift() {
        wx.navigateTo({
            url: '/pages/giftReceive/edit/index',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                refresh: () => {
                    this.loadData(1)
                },
            }
        });
    },
    // 添加礼簿
    onAddBook() {
        wx.navigateTo({
            url: '/pages/book/edit/index',
            events: {
                refresh: () => {
                    this.loadData(1)
                },
            }
        });
    },
    // 点击礼簿
    onBookClick(e) {
        wx.navigateTo({
            url: '/pages/book/details/index',
            events: {
                refresh: () => {
                    this.loadData(1)
                },
            },
            success: function (res) {
                // 通过 eventChannel 向被打开页面传送数据
                res.eventChannel.emit('acceptDataFromOpenerPage', {
                    book: e.currentTarget.dataset.book
                })
            }
        });
    },
    // 长按礼簿
    onBookLongPress(e) {
        this.setData({
            showBookAction: true,
            bookActionDetail: e.currentTarget.dataset.book
        });
    },
    // 长按礼簿-关闭
    onCloseBookAction() {
        this.setData({
            showBookAction: false
        });
    },
    // 长按礼簿-动作
    onSelectBookAction(event) {
        const that = this
        switch (event.detail.name) {
            case '删除':
                wx.showModal({
                    title: '删除礼簿？',
                    content: '该礼簿所有来往记录都将被删除，确定删除？',
                    async success(result) {
                        if (result.confirm) {
                            const res = await bookService.deleteBook({
                                _id: that.data.bookActionDetail._id
                            })
                            if (res.success) {
                                that.loadData(1)
                                wx.showToast({
                                    title: '删除成功',
                                })
                            }
                        }
                    }
                })
                break;
            case '编辑':
                console.log(that.data.actionId)
                wx.navigateTo({
                    url: `/pages/book/edit/index`,
                    success: function (res) {
                        // 通过 eventChannel 向被打开页面传送数据
                        res.eventChannel.emit('acceptDataFromOpenerPage', that.data.bookActionDetail)
                    },
                    events: {
                        refresh: () => {
                            this.loadData(1)
                        },
                    }
                });
                break;
            default:
                break;
        }
    },
    // 计算礼簿收礼金额
    computeTotal(datas) {
        return datas.map(i => {
            i.giftCount = i.giftList.length || 0
            i.giftTotal = 0
            for (let item of i.giftList) {
                i.giftTotal += Number(item.money)
            }
            return i
        })
    },
    // 加载数据
    async loadData(page) {
        if (page == 1) {
            this.setData({
                giftBooks: []
            })
        }
        const that = this
        const res = await bookService.getBookPage({
            page: page,
            limit: 10
        })
        if (res.success) {
            const resList = that.computeTotal(res.data)
            that.setData({
                giftBooks: this.data.giftBooks.concat(resList),
                pageNo: page
            });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        // 人为延迟一点，避免loading动画闪烁
        setTimeout(async () => {
            // TODO 定时器，用以临时解决 app.onLaunch与page.onLoad异步问题
            await this.loadData(1)
            wx.hideLoading()
        }, 888)
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
        // 感觉延迟一下，会舒服点
        setTimeout(async () => {
            await this.loadData(1)
            wx.stopPullDownRefresh()
        }, 666);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.loadData(this.data.pageNo + 1)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})