import MPServerless from '@alicloud/mpserverless-sdk'

const mpserverless = new MPServerless(wx, {
  appId: '小程序 AppID',
  spaceId: '服务空间 SpaceId',
  clientSecret: '服务空间 Secret',
  endpoint: '服务空间 API Endpoint'
});

// 在小程序端开始使用Serverless服务前，需要先调用mpserverless.init方法完成服务的初始化，且仅能初始化一次.
// 较为通用的做法是在onLaunch生命周期中进行初始化操作，并将实例对象mpserverless挂载到小程序的全局对象App，以便后续在其他文件中调用。
mpserverless.init();

module.exports = mpserverless