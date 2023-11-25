const userService = require('@/alicloud/services/user');
const jinrishici = require('@/utils/jinrishici.js');
import { computedTotalGiftOut } from "@/alicloud/services/giftOut";
import { computedTotalGiftReceive } from "@/alicloud/services/giftReceive";
import {
  welcome
} from '@/utils/index.js';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    jinrishici: '',
    avatarUrl: '',
    nickName: '',
    avatarUrl_edit: '',
    nickName_edit: '',
    popupVisible: false,
    confirmLoading: false,
    welcome: welcome(),
    giftTotal: {},
    needAuthorization: false,
    privacyContractName: '',
    menus: [{
        icon: 'cicon-home-community',
        name: '我的家庭',
        color: 'text-mauve',
        path: '/pages/family/index',
      },
      {
        icon: 'cicon-event-list',
        name: '数据导出',
        color: 'text-orange',
        path: '/pages/backup/index',
      },
      {
        icon: 'cicon-demo',
        name: '统计分析',
        color: 'text-red',
        path: '/pages/analysis/index',
      },
      {
        icon: 'cicon-person-pin-circle-o',
        name: '亲戚计算器',
        color: 'text-green',
        path: '/pages/relationship/index',
      },
    ],
  },
  // 监听用户滑动页面事件。
  onPageScroll(e) {
    // 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
    // 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
    // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object
    this.setData({
      scrollTop: e.scrollTop,
    });
  },
  tapToUrl(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    jinrishici.load((result) => {
      this.setData({
        jinrishici: result.data.content,
      });
    });
    this.setData({
      avatarUrl: app.userInfo.avatarUrl,
      nickName: app.userInfo.nickName,
    });
  },
  // 选择头像
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail;
    const options = {
      filePath: avatarUrl,
    };
    wx.$api.get(`/todo/uploadFile`, options)
    this.setData({
      avatarUrl_edit: `res.fileUrl`,
    });
  },
  onShowPopup() {
    this.setData({
      popupVisible: true,
      avatarUrl_edit: this.data.avatarUrl,
      nickName_edit: this.data.nickName,
    });
    wx.getPrivacySetting({
      success: res => {
        console.log("是否需要授权：", res.needAuthorization, "隐私协议的名称为：", res.privacyContractName)
        this.setData({
          needAuthorization: res.needAuthorization,
          privacyContractName: res.privacyContractName
        })
      },
      fail: (err) => {
        onsole.log(err)
      },
      complete: () => {}
    })
  },
  onClosePopup() {
    this.setData({
      popupVisible: false,
    });
  },
  // 保存个人信息
  async onSaveProfile() {
    this.setData({
      confirmLoading: true,
    });

    const avatarUrl = this.data.avatarUrl_edit;
    const nickName = this.data.nickName_edit;

    const res = await userService.updateUserInfo({
      _id: app.userInfo._id,
      nickName: nickName,
      avatarUrl: avatarUrl,
    });

    setTimeout(() => {
      if (res.success) {
        wx.showToast({
          title: '更新成功',
        });

        this.setData({
          avatarUrl: avatarUrl,
          nickName: nickName,
          popupVisible: false,
          confirmLoading: false,
        });
        app.userInfo.nickName = nickName;
        app.userInfo.avatarUrl = avatarUrl;
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
        });
        this.setData({
          confirmLoading: false,
        });
      }
    }, 600);
  },
  openPrivacyContract() {
    wx.openPrivacyContract({
      success: res => {
        console.log('openPrivacyContract success')
      },
      fail: res => {
        console.error('openPrivacyContract fail', res)
      }
    })
  },
  handleAgree() {
    this.setData({
      needAuthorization: false,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    const { data: r } = await computedTotalGiftReceive();
    const { data: o } = await computedTotalGiftOut();
    app.giftTotal = {
      receive: r || 0,
      out: o || 0,
    };
    this.setData({
      giftTotal: app.giftTotal
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '可能是东半球最好用的人情记账工具',
      path: 'pages/start/index',
      imageUrl: '/static/img/share.png',
    };
  },
});