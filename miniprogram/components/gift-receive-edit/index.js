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
    friendFirstLetter: '',
    bookId: '',
    title: '',
    date: '',
    money: '',
    remarks: '',
    friendSelectSource: [],
    bookSelectSource: [],
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
        const res = await giftReceiveService.updataGiftReceive(this.data)
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
        const res = await giftReceiveService.addGiftReceive(this.data)
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
    // 选择礼簿
    showBookSelect() {
      this.setData({
        active: 2
      })
      const res = bookService.getBookList()
      if (res.success) {
        this.setData({
          bookSelectSource: res.data,
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
    // 选中联系人
    onSelectedBook(e) {
      this.setData({
        bookId: e.currentTarget.dataset.book._id
      })
    },
  }
})