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
        active: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        show(data) {
            console.log(data)
            this.setData({
                visible: true
            })
        },
        onCancel() {
            this.setData({
                visible: false
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
    }
})