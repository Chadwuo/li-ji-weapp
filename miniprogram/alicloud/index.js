import MPServerless from '@alicloud/mpserverless-sdk'

const mpserverless = new MPServerless(wx, {
  appId: 'wx200dacbd79781fa0',
  spaceId: 'mp-ca131de3-6a07-4205-8ee0-970a5c092c09',
  clientSecret: 'RG5dz4Lxj/Vkktljnq48Ig==',
  endpoint: 'https://api.next.bspapp.com'
});

// liji_dev
// const mpserverless = new MPServerless(wx, {
//   appId: 'wx200dacbd79781fa0',
//   spaceId: 'mp-b7801322-786f-405a-8f38-0c8d16007dd5',
//   clientSecret: 'lh6PCosd7kGsIiY6+L6KWQ==',
//   endpoint: 'https://api.next.bspapp.com'
// });

// 在小程序端开始使用Serverless服务前，需要先调用mpserverless.init方法完成服务的初始化，且仅能初始化一次.
// 较为通用的做法是在onLaunch生命周期中进行初始化操作，并将实例对象mpserverless挂载到小程序的全局对象App，以便后续在其他文件中调用。
mpserverless.init();

module.exports = mpserverless