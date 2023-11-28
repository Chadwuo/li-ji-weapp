import config from "@/config/index.js";
import api from "@/utils/api.js";
import * as utils from "@/utils/index.js";

wx.$config = config
wx.$userId = `todoid`
wx.$api = api
wx.$utils = utils
wx.$app = {
  //挂载到app上
  colorUI: config.colorUI,
  userInfo: wx.getStorageSync(`userInfo`) || ``,
  giftTotal: {
    receive: 0,
    out: 0,
  },
  onLaunch() {
  },
}

App(wx.$app);
