// pages/issues/index.js
// 引入 dayjs
const dayjs = require('dayjs');
const app = getApp()
const db = wx.cloud.database()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        issuesTitle: '',
        issuesContent: '',
        issuesId: '',
        replyContent: '',
        loading: false,
        issuesList: [],
        pageNo: 0,
        isAdmin: false,
        showAddPopup: false,
    },
    onTabsClick(event) {
        // 进入意见片墙
        if (event.detail.name === 'issues') {
            this.data.pageNo = 0
            this.getIssuesPage(this.data.pageNo, 10).then(res => {
                if (res.data.length === 0) {
                    return
                }
                let list = res.data.map((i) => {
                    i.createTime = dayjs(i.createTime).format('YYYY-MM-DD')
                    i.replyTime = dayjs(i.replyTime).format('YYYY-MM-DD')
                    return i
                })
                this.setData({
                    issuesList: list,
                    pageNo: this.data.pageNo + 1
                });
            })
        }
    },
    // 获取分页数据
    getIssuesPage(page, limit) {
        return db.collection('issues')
            .orderBy('createTime', 'desc')
            .skip(page * limit)
            .limit(limit)
            .get()
    },
    // 添加
    onAddIssues() {
        db.collection('issues').add({
            data: {
                title: this.data.issuesTitle,
                content: this.data.issuesContent,
                createTime: db.serverDate(),
            }
        }).then(res => {
            this.setData({
                issuesTitle: '',
                issuesContent: ''
            });
            wx.showToast({
                title: '提交成功，意见已记录，感谢你',
            })
        })
    },
    // 提交回复
    onReplyIssues() {
        db.collection('issues').doc(this.data.issuesId).update({
            data: {
                reply: this.data.replyContent,
                replyTime: db.serverDate()
            }
        }).then(res => {
            wx.showToast({
                title: '回复成功',
            })
        })
    },
    onDelIssues(e) {
        const issuesId = e.currentTarget.dataset.issuesid
        db.collection('issues').doc(issuesId).remove().then(res => {
            wx.showToast({
                title: '删除成功',
            })
        })
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
        this.setData({
            isAdmin: app.globalData.user.isAdmin,
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
        this.onTabsClick({
            detail: {
                name: 'issues'
            }
        })
        setTimeout(() => {
            wx.stopPullDownRefresh()
        }, 2000);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            loading: true,
        });
        this.getIssuesPage(this.data.pageNo, 10).then(res => {
            if (res.data.length > 0) {
                let issuesData = this.data.issuesList.concat(res.data)
                this.setData({
                    issuesList: issuesData,
                    pageNo: this.data.pageNo + 1
                });
            }
        }).finally(
            this.setData({
                loading: false,
            })
        );
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})