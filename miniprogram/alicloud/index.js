import MPServerless from '@alicloud/mpserverless-sdk';

export const mpserverless = new MPServerless(wx, {
  appId: 'wx200dacbd79781fa0',
  spaceId: 'mp-ca131de3-6a07-4205-8ee0-970a5c092c09',
  clientSecret: 'RG5dz4Lxj/Vkktljnq48Ig==',
  endpoint: 'https://api.next.bspapp.com',
});

// liji_dev 开发环境
// export const mpserverless = new MPServerless(wx, {
//   appId: 'wx200dacbd79781fa0',
//   spaceId: 'mp-b7801322-786f-405a-8f38-0c8d16007dd5',
//   clientSecret: 'lh6PCosd7kGsIiY6+L6KWQ==',
//   endpoint: 'https://api.next.bspapp.com'
// });
