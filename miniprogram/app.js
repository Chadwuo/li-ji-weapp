import { mpserverless } from "./alicloud/index";
import { colorUI } from "./config/ColorUI";
import { colorUISdk } from "./config/mp-sdk";
App({
  //挂载到app上
  mpserverless,
  colorUI,
  colorUISdk,
  userInfo: "",
  userDataScope: "",
  giftTotal: {
    receive: 0,
    out: 0,
  },
  onLaunch() {
    mpserverless.init();
    console.log("软件版本", colorUISdk.version);
  },
});
