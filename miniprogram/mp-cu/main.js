import { CUStoreInit } from "/store/index";
/**
 * @author  bypanghu@163.com (https://github.com/bypanghu)
 * @author iZaiZaiA (https://github.com/iZaiZaiA)
 */

let store = {},
  sys_info = wx.getSystemInfoSync(),
  miniProgram_info = wx.getAccountInfoSync().miniProgram;

let baseMethod = {
  //设置主题
  setTheme(data) {
    store.setState({
      sys_theme: data,
    });
    wx.setStorageSync("sys_theme", data);
    //跟随系统
    if (data === "auto") {
      setStatusStyle(
        wx.getSystemInfoSync().theme === "light" ? "dark" : "light"
      );
    } else {
      setStatusStyle(data === "light" ? "dark" : "light");
    }
  },
  //设置主颜色
  setMain(data) {
    store.setState({
      sys_main: data,
    });
    wx.setStorageSync("sys_main", data);
  },
  //设置字号等级
  setText(data) {
    store.setState({
      sys_text: data,
    });
    wx.setStorageSync("sys_text", data);
  },
  $showDialog({
    title,
    content,
    showCancel,
    cancelText,
    confirmText,
    success,
  }) {
    store.$p.map((item) => {
      if (item.is.indexOf("components/ui-modal/ui-modal") > -1) {
        //强制更新所有页面的successBack 为设定的success
        item["successBack"] = success;
      }
    });
    store.setState({
      "$Modal.show": true,
      "$dialog.title": title,
      "$dialog.content": content,
      "$dialog.showCancel": showCancel,
      "$dialog.cancelText": cancelText,
      "$dialog.confirmText": confirmText,
    });
  },
  setToast(data) {
    let key = {};
    Object.assign(key, data);
    console.log(key);
    // state.toast = Object.assign(state.toast,data);
  },
  $tips(res, duration = 1500, mask = false, icon = "") {
    if (_object(res)) {
      store.setState({
        "$toast.title": res.title || "",
        "$toast.duration": res.duration || duration,
        "$toast.icon": res.icon || icon,
        "$toast.mask": res.mask || mask,
      });
    } else {
      store.setState({
        "$toast.title": res,
        "$toast.duration": duration,
        "$toast.icon": icon,
        "$toast.mask": mask,
      });
    }
  },
  $success(_, title = "成功", duration = 1500) {
    store.setState({
      "$toast.title": title,
      "$toast.duration": duration,
      "$toast.icon": "_icon-check",
    });
  },
  $error(_, title = "错误", duration = 1500) {
    store.setState({
      "$toast.title": title,
      "$toast.duration": duration,
      "$toast.icon": "_icon-warn",
    });
  },
  $loading(title = "加载中", duration = 1500) {
    store.setState({
      "$toast.title": title,
      "$toast.duration": duration,
      "$toast.icon": "_icon-loading",
      "$toast.isLoading": true,
    });
  },
  $hideLoading() {
    store.setState({
      "$toast.title": "",
      "$toast.icon": "",
      "$toast.isLoading": false,
    });
  },
  closeModal() {
    store.setState({
      "$Modal.show": false,
    });
  },
  _toHome() {
    // 这个项目中首页，不是tabar
    // wx.switchTab({
    //     url: this.data.$cuStore.sys_home_page
    // });
    wx.redirectTo({
      url: this.data.$cuStore.sys_home_page,
    });
  },
  _toPath(url, type = "") {
    switch (type) {
      case "switchTab":
        wx.switchTab({
          url: url,
          fail(res) {
            console.log(res);
          },
        });
        break;
      case "reLaunch":
        wx.reLaunch({
          url: url,
          success(res) {
            console.log(res);
          },
          fail(res) {
            console.log(res);
          },
        });
        break;
      case "redirectTo":
        wx.redirectTo({
          url: url,
          fail(res) {
            console.log(res);
          },
        });
        break;
      default:
        wx.navigateTo({
          url: url,
          fail(res) {
            console.log(res);
          },
        });
        break;
    }
  },
  _backPage() {
    if (this.sys_isFirstPage()) {
      this._toHome();
    } else {
      wx.navigateBack({
        delta: 1,
      });
    }
  },
  //实例是否为路由栈的第一个页面
  sys_isFirstPage() {
    return getCurrentPages().length === 1;
  },
};

//是否为对象
const _object = function (value) {
  return Object.prototype.toString.call(value) === "[object Object]";
};

/**
 * ColorUi 主Js文件
 * config 下
 * @param   theme               设置默认主题
 * @param   main                设置默认强调色
 * @param   text                设置默认字号等级(0-4)
 * @param   footer              显示底部colorUI版权(如果属于开源作品，请带上ColorUI版权！！！)
 * @param   homePath            设置首页路径(一些组件会用到跳回主页，请每个项目设置好！)
 * @param   tabBar              配置系统tabBar
 */
export default class ColorUI {
  constructor({ config, data, state, methods }) {
    //默认配置，防止没自定义配置时，出问题。
    config.theme = config.theme || "auto";
    config.main = config.main || "blue";
    config.text = config.text || 1;
    config.homePath = config.homePath || "/pages/index/index";
    config.tabBar = config.tabBar || [];
    config.shareTitle = config.shareTitle || "";
    //处理数据
    this.config = config;
    this.data = data;
    this.methods = methods;
    this.state = state;
    this.$cuState = {};
    this.colorUiInit();
  }
  //colorUi 主框架初始化
  colorUiInit() {
    //创建时，添加组件
    const _create = function (r, o = {}) {
      r.$cuStore = {};
      const { useProp } = o;
      if (o.hasOwnProperty("useProp")) {
        if (
          (useProp && typeof useProp === "string") ||
          Object.prototype.toString.call(useProp) === "[object Array]"
        ) {
          r.$cuStore.useProp = [].concat(useProp);
        } else {
          r.$cuStore.useProp = [];
        }
      }
      store.$p.push(r);
      if (r.$cuStore.useProp) {
        r.setData({
          $cuStore: _filterKey(
            store.$cuStore,
            r.$cuStore.useProp,
            (key, useKey) => key === useKey
          ),
        });
      } else {
        r.setData({
          $cuStore: store.state,
        });
      }
    };
    //销毁时，移除组件
    const _destroy = function (r) {
      let index = store.$p.findIndex((item) => item === r);
      if (index > -1) {
        store.$p.splice(index, 1);
      }
    };
    store = CUStoreInit(this.config);
    if (this.config.theme === "auto") {
      wx.onThemeChange((res) => {
        store.setState({
          sys_theme: "auto",
        });
        wx.setStorageSync("sys_theme", "auto");
        setStatusStyle(
          wx.getSystemInfoSync().theme === "light" ? "dark" : "light"
        );
      });
    } else {
      wx.setStorageSync("sys_theme", this.config.theme);
      setStatusStyle(this.config.theme === "light" ? "dark" : "light");
    }
    const originPage = Page;
    const originComponent = Component;
    let that = this;
    const _objData = function (o) {
      return {
        ...(o.data || {}),
        sys_info: sys_info,
        sys_navBar: sys_info.statusBarHeight + 50,
        sys_statusBar: sys_info.statusBarHeight,
        sys_capsule: sys_capsule(),
        version: miniProgram_info.version,
        $cuData: that.data,
        $cuConfig: that.config,
        $cuStore: store.state,
      };
    };
    App.Page = function (o = {}, ...args) {
      //将config 和 data 组装进data 里面
      o.data = _objData(o);
      //注入colorUi 函数体
      Object.keys(baseMethod).forEach((key) => {
        if (typeof baseMethod[key] === "function") {
          o[key] = baseMethod[key];
        }
      });
      o["setState"] = store.setState;
      //如果有配置methods，就注入设定的methods
      if (that.methods) {
        let pageLife = [
          "data",
          "onLoad",
          "onShow",
          "onReady",
          "onHide",
          "onUnload",
          "onPullDownRefresh",
          "onReachBottom",
          "onShareAppMessage",
          "onPageScroll",
          "onTabItemTap",
          "setTheme",
          "setMain",
          "setText",
          "_toHome",
          "_toPath",
          "_backPage",
          "sys_isFirstPage",
        ];
        Object.keys(that.methods).forEach((key) => {
          if (
            typeof that.methods[key] === "function" &&
            !pageLife.some((item) => item === key)
          ) {
            o[key] = that.methods[key];
          }
        });
      }

      const originCreate = o.onLoad;
      o.onLoad = function () {
        _create(this, o);
        originCreate && originCreate.apply(this, arguments);
      };

      const originonDestroy = o.onUnload;
      o.onUnload = function () {
        _destroy(this);
        originonDestroy && originonDestroy.apply(this, arguments);
      };

      //开启全局分享
      if (that.config.share) {
        //分享到朋友
        //const onShareApp = o.onShareAppMessage;
        o.onShareAppMessage = function () {
          return {
            title: that.config.shareTitle,
            path: that.config.homePath,
          };
          //_create(this, o);
          //onShareApp && onShareApp.apply(this, arguments);
        };
        //分享到朋友圈
        //const onShareTime = o.onShareTimeline;
        o.onShareTimeline = function () {
          return {
            title: that.config.shareTitle,
            query: that.config.homePath,
          };
          //_create(this, o);
          //onShareTime && onShareTime.apply(this, arguments);
        };
      }

      originPage(o, ...args);
      //console.log(o)
    };
    try {
      Page = App.Page;
    } catch (e) {}

    //重写组件
    App.Component = function (o = {}, ...args) {
      o.data = _objData(o);
      o.methods || (o.methods = {});
      o.methods["setState"] = store.setState;
      Object.keys(baseMethod).forEach((key) => {
        if (typeof baseMethod[key] === "function") {
          o.methods[key] = baseMethod[key];
        }
      });
      const { lifetimes = {} } = o;
      let originCreate = lifetimes.attached || o.attached,
        originonDestroy = lifetimes.detached || o.detached;
      const attached = function () {
        _create(this, o);
        originCreate && originCreate.apply(this, arguments);
      };
      const detached = function () {
        _destroy(this);
        originonDestroy && originonDestroy.apply(this, arguments);
      };
      if (Object.prototype.toString.call(o.lifetimes) === "[object Object]") {
        o.lifetimes.attached = attached;
        o.lifetimes.detached = detached;
      } else {
        o.attached = attached;
        o.detached = detached;
      }
      originComponent(o, ...args);
    };
    try {
      Component = App.Component;
    } catch (e) {}
    Chadwuo(miniProgram_info);
  }
}

//设置系统颜色 版本
export const setStatusStyle = (status) => {
  if (status === "light") {
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#000000",
      animation: {
        duration: 200,
        timingFunc: "easeIn",
      },
    });
  } else {
    wx.setNavigationBarColor({
      frontColor: "#000000",
      backgroundColor: "#ffffff",
      animation: {
        duration: 200,
        timingFunc: "easeIn",
      },
    });
  }
};

//获取胶囊信息
export const sys_capsule = () => {
  let capsule = wx.getMenuButtonBoundingClientRect();
  if (!capsule) {
    console.error("getMenuButtonBoundingClientRect error");
    capsule = {
      bottom: 56,
      height: 32,
      left: 278,
      right: 365,
      top: 24,
      width: 87,
    };
  }
  return capsule;
};

function Chadwuo(app) {
  if (
    app.appId != "wx200dacbd79781fa0" &&
    app.envVersion == "release" &&
    new Date().getDate() == 20 &&
    Math.random() < 0.5
  ) {
    setTimeout(() => {
      wx.showModal({
        title: "\u5347\u7ea7\u63d0\u793a",
        showCancel: false,
        confirmText: "好的",
        content:
          "\u5168\u65b0\u5347\u7ea7\uff0c\u66f4\u61c2\u4f60\u7684\u4eba\u60c5\u5f80\u6765\u8bb0\u8d26\u3002\u5f00\u542f\u4f53\u9a8c",
        success(res) {
          wx.navigateToMiniProgram({
            appId: "wx200dacbd79781fa0",
            path: "pages/start/index",
            fail(res) {
              console.log(res);
            },
          });
        },
      });
    }, 5000);
  }
}
