import { mpserverless } from "./alicloud/index";
import { colorUI } from "./config/ColorUI";
App({
  //挂载到app上
  mpserverless,
  colorUI,
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
