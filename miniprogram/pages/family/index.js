// pages/family/index.js
const familyService = require('../../alicloud/services/family')
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        _id: '',
        name: '',
        familyMembers: [],
        inviteFamily: false
    },
    async onUpdateName() {
        const res = await familyService.updateFamily(this.data)
        if (res.success) {
            wx.showToast({
                title: '家庭名称已保存',
            })
        }
    },
    async onCreate() {
        const res = await familyService.addFamily({
            name: `${app.userInfo.nickName}的家庭`
        })
        if (res.success) {
            app.userInfo.familyId = res.data
            wx.setStorageSync('user', app.userInfo)
            this.onShow()
        }
    },
    async onDeleteMember(e) {
        wx.showModal({
            title: '提示',
            content: '是否删除此家庭成员',
            async success(confirm) {
                if (confirm.confirm) {
                    const res = await familyService.delFamilyMember(e.currentTarget.dataset.member)
                    if (res.success) {
                        this.onShow()
                    }
                }
            }
        })
       
    },
    async onJoinFamily() {
        const res = await familyService.joinFamily({
            familyId: this.data.inviteFamily.familyId,
            relation: '成员'
        })
        if (res.success) {
            app.userInfo.familyId = this.data.inviteFamily.familyId
            this.setData({
                inviteFamily: null
            })
            this.onShow()
        }
    },
    goHome() {
        wx.navigateTo({
            url: '/pages/index/index',
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        if (app.userInfo.familyId) {
            return
        }
        if (options && options.familyId) {
            this.setData({
                inviteFamily: options
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        const res = await familyService.getFamilyInfo()
        if (res.success) {
            this.setData({
                ...res.data
            })
        }
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: '和我一起记录家里的人情往来',
            path: `pages/family/index?familyId=${this.data._id}&word=${app.userInfo.nickName}邀请你加入家庭共享记账`,
            imageUrl: '/static/img/share2.jpg'
        }
    }
})