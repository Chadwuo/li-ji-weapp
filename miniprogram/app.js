import {
    mpserverless
} from './alicloud/index'
import {
    colorUI
} from './config/ColorUI'
import {
    colorUISdk
} from './config/mp-sdk'

App({
    //挂载到app上
    mpserverless,
    colorUI,
    colorUISdk,
    userInfo: '',
    userDataScope: '',
    refreshTotalGift: true,
    onLaunch() {
        mpserverless.init();
        console.log("软件版本", colorUISdk.version)
    },
});