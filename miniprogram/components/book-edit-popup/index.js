// components/book-edit-popup/index.js
const bookService = require('../../alicloud/services/book')
const dayjs = require('dayjs');

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
        id: '',
        date: new Date().getTime(),
        dateFormat: dayjs().format('YYYY-MM-DD'),
        name: '',
        remarks: '',
        showCalendar: false,
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            }
            if (type === 'month') {
                return `${value}月`;
            }
            if (type === 'day') {
                return `${value}日`;
            }
            return value;
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        formatDate(date) {
            return dayjs(date).format('YYYY-MM-DD');
        },
        async show(bookId) {
            this.setData({
                visible: true
            })

            if (bookId) {
                const res = await bookService.getBook({
                    _id: data._id
                })
                if (res.success) {
                    this.setData({
                        id: res.data._id,
                        luckDay: new Date(res.data.date).getTime(),
                        luckDayFormat: this.formatDate(res.data.date),
                        name: res.data.tile,
                    });
                }
            }
        },
        onCancel() {
            this.setData({
                visible: false
            })
        },
        async onSave() {
            if (this.data.id) {
                const res = await bookService.updateBook({
                    data: {
                        date: new Date(this.data.luckDay),
                        title: this.data.name,
                    }
                })
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
                const res = await bookService.addBook({
                    date: new Date(this.data.date),
                    title: this.data.name,
                })
                if (res.success) {
                    wx.showToast({
                        title: '保存成功',
                    })
                    setTimeout(() => {
                        this.setData({
                            visible: false
                        })
                    }, 500);
                }
            }
        },
        async delBook() {
            var that = this
            wx.showModal({
                title: '删除礼簿？',
                content: '该礼簿所有来往记录都将被删除，确定删除？',
                async success(res) {
                    if (res.confirm) {
                        const result = await bookService.deleteBook({
                            _id: that.data.id
                        })
                        if (result.success) {
                            wx.showToast({
                                title: '删除成功',
                            })
                        }
                    }
                }
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
        onConfirm(event) {
            console.log(event)
            this.setData({
                showCalendar: false,
                luckDay: event.detail,
                luckDayFormat: this.formatDate(event.detail),
            });
        },
    }
})