// pages/family/index.js
const familyService = require("../../alicloud/services/family");
const { getUserInfo } = require("../../alicloud/services/user");

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    _id: "",
    name: "",
    familyMembers: [],
    inviteFamily: false,
    memberAction: {
      show: false,
    },
    loading: true,
  },
  // 更新家庭名称
  async onUpdateName() {
    const res = await familyService.updateFamily(this.data);
    if (res.success) {
      wx.showToast({
        title: "更新成功",
      });
    }
  },
  // 创建家庭
  async onCreate() {
    const res = await familyService.addFamily({
      name: `${app.userInfo.nickName}的家庭`,
    });
    if (res.success) {
      this.getFamilyInfo();
    }
  },
  // 加入家庭
  async onJoinFamily() {
    const res = await familyService.joinFamily({
      familyId: this.data.inviteFamily.familyId,
      relation: "成员",
    });
    if (res.success) {
      this.setData({
        inviteFamily: null,
      });
      this.getFamilyInfo();
    }
  },
  // 长按家庭成员-打开动作面板
  onMemberLongPress(e) {
    const member = e.currentTarget.dataset.member;
    const actions = [];
    if (member.relation == "管理员") {
      actions.push({
        name: "解散",
        subname: "移除全部家庭成员并解散家庭",
      });
    } else {
      actions.push({
        name: "删除",
        subname: "从你的家庭中移除此成员",
      });
    }

    this.setData({
      memberAction: {
        show: true,
        selected: member,
        actions: actions,
      },
    });
  },
  // 关闭动作面板
  onCloseMemberAction() {
    this.setData({
      memberAction: {
        show: false,
      },
    });
  },
  // 长按家庭成员-动作
  onSelectMenberAction(event) {
    const that = this;
    const selected = that.data.memberAction.selected;
    switch (event.detail.name) {
      case "删除":
        wx.showModal({
          title: "删除成员？",
          content: "确定删除改家庭成员吗？",
          async success(result) {
            if (result.confirm) {
              const res = await familyService.delFamilyMember(selected);
              if (res.success) {
                that.getFamilyInfo();
              }
            }
          },
        });
        break;
      case "解散":
        wx.showModal({
          title: "解散家庭？",
          content: "所有成员会被删除，家庭数据无法继续共享！",
          async success(result) {
            if (result.confirm) {
              const res = await familyService.deleteFamily({
                _id: that.data._id,
              });
              if (res.success) {
                that.setData({
                  _id: "",
                });
              }
            }
          },
        });
        break;
      default:
        break;
    }
  },
  goHome() {
    wx.redirectTo({
      url: "/pages/start/index",
    });
  },
  async getFamilyInfo() {
    const res = await familyService.getFamilyInfo();
    if (res.success) {
      this.setData({
        ...res.data,
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 有邀请信息
    if (options && options.familyId) {
      // 获取用户信息
      const res = await getUserInfo();
      app.userInfo = res;
      wx.$app.userInfo = res;

      // 获取用户的家庭信息
      const { data: isExist } = await familyService.isExistFamily();
      // 不存在家庭数据
      if (!isExist) {
        this.setData({
          inviteFamily: options,
        });
      } else {
        await this.getFamilyInfo();
      }
    } else {
      await this.getFamilyInfo();
    }
    this.setData({
      loading: "auto",
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {},

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
  onShareAppMessage() {
    return {
      title: "和我一起记录家里的人情往来",
      path: `pages/family/index?familyId=${this.data._id}&word=${app.userInfo.nickName}邀请你加入家庭共享记账`,
      imageUrl: "/static/img/share2.png",
    };
  },
});
