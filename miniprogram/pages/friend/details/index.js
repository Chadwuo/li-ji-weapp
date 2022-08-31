// pages/friend/details/index.js
const dayjs = require('dayjs');
const friendService = require('../../../alicloud/services/friend')

Page({
  data: {
    _id: '',
    name: '',
    fristLetter: '',
    relation: '',
    giftList: [],
    happyCount: '0',
    happyTotal: '0.00',
    sadCount: '0',
    sadTotal: '0.00',
  },
  formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const res = await friendService.getFriendGifts({
      _id: options.friendId
    })

    const {
      name,
      fristLetter,
      relation,
      giftOutList,
      giftReceiveList
    } = res.data

    if (res.success) {
      this.setData({
        name,
        fristLetter,
        relation,
        giftList: '',
        sadCount: giftOutList.length, // 送礼次数
        sadTotal: giftOutList.map(i => { // 送礼金额总计
          return this.data.sadTotal += i.money
        }),
        happyCount: giftReceiveList.length, // 收礼次数
        happyTotal: giftReceiveList.map(i => { // 收礼金额总计
          return this.data.happyTotal += i.money
        }),
        giftList: giftOutList.concat(giftReceiveList),
      });
    }
  },
  // 编辑按钮
  onEditClick() {
    const friendEdit = this.selectComponent('#friend-edit')
    friendEdit.show(this.data._id)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})