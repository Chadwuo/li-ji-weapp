// index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    pageNo: 0,
    pageEnd: false,
    giftList: [],
    year: '2021',
    // 年度选择
    showYearPicker: false,
    // 年度选择集合
    yearData: ['2021', ],
    receiveTotal: '0.00',
    giveTotal: '0.00',
  },
  computedGiftTotl() {
    const $ = db.command.aggregate
    let that = this
    db.collection('gift')
      .aggregate()
      .match({
        userId: app.globalData.user._id,
        type: '收'
      })
      .group({
        _id: null,
        total: $.sum('$money')
      })
      .end()
      .then(res => {
        that.setData({
          receiveTotal: res.list[0].total.toFixed(2),
        });
      })

    db.collection('gift')
      .aggregate()
      .match({
        userId: app.globalData.user._id,
        type: '送'
      })
      .group({
        _id: null,
        total: $.sum('$money')
      })
      .end()
      .then(res => {
        that.setData({
          giveTotal: res.list[0].total.toFixed(2),
        });
      })
  },
  // 显示年度选择框
  yearPickerShow() {
    this.setData({
      showYearPicker: true
    })
  },
  // 年度选择框 改变
  yearPickerChange(event) {
    this.setData({
      year: event.detail.value
    });
  },
  // 关闭年度选择框
  yearPickerClose() {
    this.setData({
      showYearPicker: false
    });
    // todo 加载对应年度的账单
    // ...
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 联表查询亲友信息
  joinFriend(arr) {

    for (item of arr) {
      db.collection('friend').doc(item.friendId).then(res => {
        console.log(res)
      })

    }

    // let results = await Promise.all(arr.map((item) => {
    //   db.collection('friend').doc(item.friendId)
    // }))
    // results.then(res => {
    //   console.log(res)
    // })

    // // 承载所有读操作的 promise 的数组
    // const tasks = []
    // list.map(i => {
    //   const promise = db.collection('friend').doc(i.friendId)
    //   tasks.push(promise)
    // })
    // // 等待所有
    // return (await Promise.all(tasks)).reduce((acc, cur) => {
    //   return {
    //     data: acc.data.concat(cur.data),
    //     errMsg: acc.errMsg,
    //   }
    // })

    // let res = await Promise.all(list.map(async (i) => {
    //   db.collection('friend').doc(i.friendId).then(res => {
    //     console.log(res)
    //   })
    //   return await asyncWorker(i)
    //   //i.friendInfo = db.collection('friend').doc(i.friendId)
    // }))
  },

  // 分页获取数据
  getPage(page, limit) {
    return db.collection('gift')
      .where({
        userId: app.globalData.user._id
      })
      .orderBy('luckyDay', 'desc')
      .skip(page * limit)
      .limit(limit)
      .get()

    // 联表查询 不支持在小程序端使用 穷人使用不起云函数
    // var $ = db.command.aggregate
    // return db.collection('gift').aggregate()
    //   .match({
    //     userId: app.globalData.user._id,
    //   })
    //   .skip(page * limit)
    //   .limit(limit)
    //   .lookup({
    //     from: "friend",
    //     localField: "friendId",
    //     foreignField: "_id",
    //     as: "friendList"
    //   })
    //   // 并将 friend 匹配到的数组结果直接 merge 到 gift 记录中
    //   .addFields({
    //     friendInfo: $.mergeObjects([$.arrayElemAt(['$friendList', 0]), '$$ROOT'])
    //   })
    //   .project({
    //     friendList: 0
    //   })
    //   .end()
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
    this.computedGiftTotl();
    this.data.pageNo = 0
    let that = this
    this.getPage(this.data.pageNo, 10).then(res => {
      if (res.data.length === 0) {
        this.setData({
          pageEnd: true,
        });
      }
      that.setData({
        giftList: res.data,
        pageNo: that.data.pageNo + 1
      });
      console.log(that.data.giftList)
    })
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
  onPullDownRefresh: function () {
    this.computedGiftTotl();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.pageEnd) {
      // this.setData({
      //   loading: true,
      // });
      this.getPage(this.data.pageNo, 10).then(res => {
        if (res.data.length > 0) {
          let datas = this.data.giftList.concat(res.data)
          this.data.pageNo + 1
          this.setData({
            giftList: datas
          });
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})