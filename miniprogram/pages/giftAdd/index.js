import pinyin from "wl-pinyin";
const app = getApp()
const dayjs = require('dayjs');
const db = wx.cloud.database()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        minDate: new Date().setMonth((new Date().getMonth() - 6)),
        luckDay: '',
        luckDayFormat: dayjs().format('YYYY-MM-DD'),
        name: '',
        bookId: '',
        bookName: '',
        money: '',
        type: '收',
        wishes: '',
        friendId: '',
        friendName: '',
        showCalendar: false,
        tip: '',
        price: 0,
    },
    formatDate(date) {
        return dayjs(date).format('YYYY-MM-DD');
    },
    async saveGift() {
        let that = this
        if (!this.data.friendId) {
            // 先把联系人存起来
            await db.collection('friend').add({
                data: {
                    name: that.data.friendName,
                    userId: app.globalData.user._id,
                    firstLetter: pinyin.getFirstLetter(that.data.friendName.substr(0, 1))
                }
            }).then(res => {
                that.setData({
                    friendId: res._id,
                });
            })
        }

        db.collection('gift').add({
            data: {
                userId: app.globalData.user._id,
                luckDay: this.data.luckDay,
                name: this.data.name,
                bookId: this.data.bookId,
                money: Number(this.data.money),
                type: this.data.type,
                wishes: this.data.wishes,
                friendId: this.data.friendId,
            }
        }).then(res => {
            wx.showToast({
                title: '保存成功',
            })
            that.setData({
                name: '',
                bookId: '',
                bookName: '',
                money: '',
                wishes: '',
                friendName: '',
                friendId: '',
                showCalendar: false,
                tip: '',
                price: 0
            })
        })
    },
    onFriendBlur(e) {
        let that = this
        // 查询数据库中有无同名亲友
        db.collection('friend').where({
                userId: app.globalData.user._id,
                name: e.detail.value
            })
            .get()
            .then(res => {
                if (res.data.length != 0) {
                    // 有数据
                    that.setData({
                        friendId: res.data[0]._id,
                        tip: `已有同名联系人【${res.data[0].name}】，记录会添加在与该亲友的来往记录中`
                    });
                } else {
                    // 名字改了 数据库没有相关人信息，friendId 置空
                    that.setData({
                        friendId: '',
                    });
                }
            })
    },
    onMoneyBlur(e) {
        console.log(e)
        this.setData({
            price: Number(e.detail.value) * 100
        })
    },
    onDisplay() {
        this.setData({
            showCalendar: true
        });
    },
    onClose() {
        this.setData({
            showCalendar: false
        });
    },
    // 日历选择
    onConfirm(event) {
        this.setData({
            showCalendar: false,
            luckDayFormat: this.formatDate(event.detail),
            luckDay: event.detail,
        });
    },
    onGiftTypeChange(event) {
        this.setData({
            type: event.detail.name
        });
    },
    // 选择联系人
    onSelectFriends() {
        let that = this
        wx.navigateTo({
            url: '/pages/friendSelect/index',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                acceptDataFromFriendPage: function (data) {
                    that.setData({
                        friendName: data.name,
                        friendId: data._id,
                    })
                }
            }
        })
    },
    // 选择礼簿
    onSelectBooks() {
        let that = this
        wx.navigateTo({
            url: '/pages/bookSelect/index',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                acceptDataFromBookPage: function (data) {
                    that.setData({
                        bookName: data.name,
                        bookId: data._id,
                    })
                }
            }
        })
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
        // 这什么问题  在data里赋值不起作用？？？
        this.data.luckDay = new Date()
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

    }
})