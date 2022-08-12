import pinyin from "wl-pinyin";
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
        name: '',
        firstLetter: '',
        remarks: '',
        kinship: '',
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
        onSave() {
            if (this.data._id) {
                const res = await friendService.updataFriend(this.data)
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
                const res = await friendService.addFriend(this.data)
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
    }
})