// pages/friend/index.js
const friendService = require('../../alicloud/services/friend')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    friendsList: [],
    keyword: ''
  },
  // 监听用户滑动页面事件。
  onPageScroll(e) {
    // 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
    // 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
    // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  onSearch() {
    if (!this.data.keyword) {
      this.loadData(1)
      return
    }
    for (let item of this.data.friendsList) {
      item.subItems = item.subItems.filter(x => x.name.includes(this.data.keyword))
    }

    this.setData({
      friendsList: this.data.friendsList
    })
  },
  onFriendClick(e) {
    wx.navigateTo({
      url: '/pages/friend/details/index',
      events: {
        refresh: () => {
          this.loadData()
        },
      },
      success: function (res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          friend: e.currentTarget.dataset.friend
        })
      }
    });
  },
  onAdd() {
    wx.navigateTo({
      url: '/pages/friend/edit/index',
      events: {
        refresh: () => {
          this.loadData()
        },
      },
    });
  },
  async loadData() {
    this.setData({
      friendsList: []
    })
    let listTemp = []
    for (let index = 0; index < 26; index++) {
      listTemp.push({
        alpha: String.fromCharCode((65 + index)),
        subItems: []
      })
    }
    let noletter = {
      alpha: '#',
      subItems: []
    }
    const res = await friendService.getFriendList()
    if (res.success) {
      for (const item of res.data) {
        const firstLetter = item.firstLetter
        if (!firstLetter) {
          noletter.subItems.push(item)
        } else {
          for (const f of listTemp) {
            if (firstLetter.toUpperCase() === f.alpha) {
              f.subItems.push(item)
              break
            }
          }
        }
      }
      listTemp.push(noletter)
      let list = listTemp.filter((i) => {
        return i.subItems.length != 0
      })
      this.setData({
        friendsList: list,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})