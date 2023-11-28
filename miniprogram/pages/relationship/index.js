// pages/relationship/index.js
var relationship = require('@/utils/relationship.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    screenData: '我',
    result: '',
    inputData: ['我'],
    names: [
      {
        key: '夫',
        val: '丈夫',
      },
      {
        key: '妻',
        val: '妻子',
      },
      {
        key: '父',
        val: '爸爸',
      },
      {
        key: '母',
        val: '妈妈',
      },
      {
        key: '兄',
        val: '哥哥',
      },
      {
        key: '弟',
        val: '弟弟',
      },
      {
        key: '姐',
        val: '姐姐',
      },
      {
        key: '妹',
        val: '妹妹',
      },
      {
        key: '子',
        val: '儿子',
      },
      {
        key: '女',
        val: '女儿',
      },
      {
        key: '←',
        val: 'backspace',
      },
    ],
  },
  input(event) {
    //获取点击的id
    var val = event.target.id;
    if (val == 'backspace') {
      this.data.inputData.pop();
    } else {
      this.data.inputData.push(val);
    }

    let _screenData = this.data.inputData.join('的');

    var result = relationship({
      text: _screenData,
      reverse: false,
      type: 'default',
    });

    if (!result[0]) {
      result = '关系有点远，年长就叫老祖宗，同龄人就叫帅哥美女吧~';
    }

    this.setData({
      screenData: _screenData,
      result,
    });
  },

  clear() {
    this.setData({
      screenData: '我',
      inputData: ['我'],
      result: '',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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
  onShareAppMessage() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '亲戚关系计算器',
      path: 'pages/relationship/index',
    };
  },
  onShareTimeline: function () {
    return {
      title: '亲戚关系计算器',
    };
  },
});
