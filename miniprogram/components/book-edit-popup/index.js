// components/book-edit-popup/index.js
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
        visible: false
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
        onClose() {
            this.setData({
                visible: false
            })
        },
        onSave() {
            // TODO
            wx.showToast({
                title: '点击了保存',
            })
        }
    }
})