const giftOutService = require('../../alicloud/services/giftOut')
const friendService = require('../../alicloud/services/friend')

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        visible: false,
        _id: '',
        friendId: '',
        friendName: '',
        friendFirstLetter: '',
        title: '',
        date: '',
        money: '',
        remarks: '',
        friendSelectSource: [],
        active: 0,
        navBarTitle: '添加送礼',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        show(data) {
            this.setData({
                visible: true
            })
            if (data) {
                this.setData({
                    navBarTitle: '编辑送礼',
                    ...data
                })
            }
        },
        onCancel() {
            this.setData({
                visible: false,
                _id: '',
                friendId: '',
                friendName: '',
                friendFirstLetter: '',
                title: '',
                date: '',
                money: '',
                remarks: '',
                friendSelectSource: [],
                active: 0,
                navBarTitle: '添加送礼',
            })
        },
        async onSave() {
            if (this.data._id) {
                const res = await giftOutService.updataGiftOut(this.data)
                if (res.success) {
                    wx.showToast({
                        title: '修改成功',
                    })
                    setTimeout(() => {
                        this.setData({
                            visible: false
                        })
                    }, 500);
                }
            } else {
                const res = await giftOutService.addGiftOut(this.data)
                if (res.success) {
                    wx.showToast({
                        title: '添加成功',
                    })
                    setTimeout(() => {
                        this.setData({
                            visible: false
                        })
                    }, 500);
                }
            }
        },
        // 选择联系人
        showFriendSelect() {
            this.setData({
                active: 1
            })
            const res = friendService.getFriendList()
            if (res.success) {
                this.setData({
                    friendSelectSource: res.data,
                });
            }
        },
        // 返回
        onNavBack() {
            this.setData({
                active: 0
            })
        },
        // 选中联系人
        onSelectedFriend(e) {
            this.setData({
                friendId: e.currentTarget.dataset.friend._id
            })
        },
    },
    pageLifetimes: {
        show: function () {
            // 页面被展示
        },
        hide: function () {
            // 页面被隐藏
            this.setData({
                active: 0,
                visible: false
            })
        },
        resize: function (size) {
            // 页面尺寸变化
        }
    }
})