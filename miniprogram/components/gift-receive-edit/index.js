const giftReceiveService = require('../../alicloud/services/giftReceive')
const bookService = require('../../alicloud/services/book')
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
    bookId: '',
    title: '',
    date: '',
    money: '',
    remarks: '',
    friendSelectSource: [],
    bookSelectSource: [],
    active: 0,
    navBarTitle: '添加收礼',
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
          navBarTitle: '编辑收礼',
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
        bookId: '',
        bookName: '',
        title: '',
        date: '',
        money: '',
        remarks: '',
        friendSelectSource: [],
        bookSelectSource: [],
        active: 0,
        navBarTitle: '添加收礼',
      })
    },
    async onSave() {
      if (this.data._id) {
        const res = await giftReceiveService.updataGiftReceive(this.data)
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
        const res = await giftReceiveService.addGiftReceive(this.data)
        if (res.success) {
          wx.showToast({
            title: '添加成功',
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
    // 选择联系人
    async showFriendSelect() {
      this.setData({
        active: 1
      })
      if (this.data.friendSelectSource.length == 0) {
        const res = await friendService.getFriendList()
        if (res.success) {
          this.setData({
            friendSelectSource: res.data,
          });
        }
      }
    },
    // 选择礼簿
    showBookSelect() {
      this.setData({
        active: 2
      })
      if (this.data.bookSelectSource.length == 0) {
        const res = bookService.getBookList()
        if (res.success) {
          this.setData({
            bookSelectSource: res.data,
          });
        }
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
        active: 0,
        friendId: e.currentTarget.dataset.friend._id,
        friendName: e.currentTarget.dataset.friend.name
      })
    },
    // 选中联系人
    onSelectedBook(e) {
      this.setData({
        active: 0,
        bookId: e.currentTarget.dataset.book._id,
        bookName: e.currentTarget.dataset.book.name
      })
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
    hide: function () {
      // 页面被隐藏
      this.onCancel()
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  }
})