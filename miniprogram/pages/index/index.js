// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: '',
        pageNo: 0,
        giftBooks: [],
        actionId: '',
        showBookAction: false,
        bookActions: [{
                name: '编辑',
            },
            {
                name: '删除',
                subname: '该礼簿所有来往记录都将被删除',
            },
        ],
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
    onBookClick(e) {
        wx.navigateTo({
            url: `/pages/bookDetails/index?bookId=${e.currentTarget.dataset.bookid}`,
        });
    },
    onBookLongPress(e) {
        this.setData({
            showBookAction: true,
            actionId: e.currentTarget.dataset.bookid
        });
    },
    onCloseBookAction() {
        this.setData({
            showBookAction: false
        });
    },
    // 长按选择礼簿
    onSelectBookAction(event) {
        var that = this
        switch (event.detail.name) {
            case '删除':
                app.globalData.refreshRequired.home = true
                wx.showModal({
                    title: '删除礼簿？',
                    content: '该礼簿所有来往记录都将被删除，确定删除？',
                    success(res) {
                        if (res.confirm) {
                            // 删除礼簿下所有记录
                            wx.cloud.callFunction({
                                name: 'lijiFunctions',
                                data: {
                                    type: 'deleteAllData',
                                    table: 'gift',
                                    where: {
                                        userId: app.globalData.user._id,
                                        bookId: that.data.actionId,
                                    }
                                }
                            }).then(res => {
                                // 删除礼簿
                                db.collection('book').doc(that.data.actionId).remove({
                                    success: function (res) {
                                        that.setData({
                                            giftBooks: that.data.giftBooks.filter(item => item._id != that.data.actionId)
                                        })
                                        wx.showToast({
                                            title: '删除成功',
                                        })
                                    }
                                })
                            })
                        }
                    }
                })
                break;
            case '编辑':
                wx.navigateTo({
                    url: `/pages/bookEdit/index?bookId=${this.data.actionId}`,
                });
                break;
            default:
                break;
        }
    },
    computeTotal(datas) {
        return datas.map(i => {
            i.giftCount = i.giftList.length
            i.giftTotal = 0
            for (let item of i.giftList) {
                if (item.type == '收') {
                    i.giftTotal += Number(item.money)
                } else {
                    i.giftTotal -= Number(item.money)
                }
            }
            return i
        })
    },
    async loadData(page) {
        if (page == 0) {
            this.setData({
                pageNo: 0,
                giftBooks: []
            })
        }
        const that = this
        const res = await app.call({
            // 传给云函数的参数
            data: {
                type: 'getBookPage',
                page: page,
                limit: 10
            }
        })

        if (res.result.list.length === 0) {
            return
        }

        const resList = that.computeTotal(this.data.giftBooks.concat(res.result.list))
        that.setData({
            giftBooks: resList,
            pageNo: that.data.pageNo + 1
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
        this.loadData(0)
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
        // this.loadData()
        setTimeout(() => {
            wx.stopPullDownRefresh()
        }, 2000);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.loadData(this.data.pageNo)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})