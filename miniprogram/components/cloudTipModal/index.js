// miniprogram/components/cloudTipModal/index.js
const { isMac } = require('../../envList.js');

Component({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    tipText: isMac ? 'sh ./uploadCloudFunction.sh' : './uploadCloudFunction.bat'
  },
  properties: {
    showUploadTipProps: Boolean
  },
  observers: {
    showUploadTipProps: function(showUploadTipProps) {
      this.setData({
        showUploadTip: showUploadTipProps
      });
    }
  },
  methods: {
    onChangeShowUploadTip() {
      this.setData({
        showUploadTip: !this.data.showUploadTip
      });
    },

    copyShell() {
      wx.setClipboardData({
        data: this.data.tipText,
      });
    },
  }

});
