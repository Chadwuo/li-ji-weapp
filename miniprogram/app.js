//import { mpserverless } from "./alicloud/index";
import { mpserverless } from "./alicloud/releases";
import config from "@/config/index.js";
import api from "@/utils/api.js";

wx.$config = config
wx.$api = api
wx.$app = App({
  //挂载到app上
  mpserverless,
  colorUI: config.colorUI,
  userInfo: "",
  userDataScope: "",
  giftTotal: {
    receive: 0,
    out: 0,
  },
  onLaunch() {
    mpserverless.init();
  },
});
