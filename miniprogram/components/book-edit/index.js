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
        active: 0,
        // 此处为日历自定义配置字段
        calendarConfig: {
            showLunar: true, // 是否显示农历，此配置会导致 setTodoLabels 中 showLabelAlways 配置失效
            markToday: '今', // 当天日期展示不使用默认数字，用特殊文字标记
        }
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
                active: 0,
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
                        this.onCancel()
                        this.triggerEvent('dialogResult', {
                            type: 'update',
                            data: this.data
                        })
                    }, 1000);
                }
            } else {
                const res = await bookService.addBook(this.data)
                if (res.success) {
                    wx.showToast({
                        title: '保存成功',
                    })
                    setTimeout(() => {
                        this.onCancel()
                        this.data._id = res.data
                        this.triggerEvent('dialogResult', {
                            type: 'insert',
                            data: this.data
                        })
                    }, 1000);
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
        showCalendar() {
            this.setData({
                active: 1
            });
        },
        // 返回
        onNavBack() {
            this.setData({
                active: 0
            })
        },
        confirmCalendar(event) {
            console.log(event)
            this.setData({

            });
        },
    }
})