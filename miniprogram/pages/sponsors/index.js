// pages/appreciate/index.js
const app = getApp()
const db = wx.cloud.database()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        barrageList: [],
        isAdmin: false,
        showAddPopup: false,
        name: '',
        money: '',
        words: '',
    },
    barrageDone() {
        console.log('回调完成')
    },
    previewImage() {
        wx.previewImage({
            urls: ['cloud://liji-1gzjub9o9bdf6d00.6c69-liji-1gzjub9o9bdf6d00-1308229258/appreciate_code.jpg'] // 需要预览的图片http链接列表
        })
    },
    // 添加
    onAdd() {
        db.collection('appreciate').add({
            data: {
                name: this.data.name,
                money: this.data.money,
                words: this.data.words,
            }
        }).then(res => {
            wx.showToast({
                title: '添加成功',
            })
        })
    },
    // 打开弹窗
    onShowPopup(e) {
        this.setData({
            showAddPopup: true,
        });
    },
    // 关闭弹窗
    onClosePopup() {
        this.setData({
            showAddPopup: false,
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.callFunction({
            name: 'lijiFunctions',
            data: {
                type: 'getAllData',
                table: 'appreciate',
                where: {}
            }
        }).then(res => {
            console.log(res)
            this.setData({
                barrageList: res.result.data,
            });
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