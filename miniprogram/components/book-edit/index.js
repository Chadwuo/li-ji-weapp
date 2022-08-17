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
        _id: '',
        date: new Date().getTime(),
        title: '',
        remarks: '',
        dateFormat: dayjs().format('YYYY-MM-DD'),
        showCalendar: false,
        navBarTitle: '添加礼簿',
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
        async show(id) {
            this.setData({
                visible: true
            })
            if (id) {
                const res = await bookService.getBook({
                    _id: id
                })
                if (res.success) {
                    this.setData({
                        navBarTitle: '编辑礼簿',
                        ...res.data
                    })
                }
            }
        },
        onCancel() {
            this.setData({
                visible: false,
                _id: '',
                date: new Date().getTime(),
                title: '',
                remarks: '',
                showCalendar: false,
                navBarTitle: '添加礼簿',
            })
        },
        async onSave() {
            if (this.data._id) {
                const res = await bookService.updateBook(this.data)
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
                const res = await bookService.addBook(this.data)
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
            wx.showModal({
                title: '删除礼簿？',
                content: '该礼簿所有来往记录都将被删除，确定删除？',
                async success(res) {
                    if (res.confirm) {
                        const result = await bookService.deleteBook(this.data)
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