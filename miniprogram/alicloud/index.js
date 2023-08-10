import MPServerless from '@alicloud/mpserverless-sdk';

export const mpserverless = new MPServerless(wx, {
    appId: '小程序 AppID',
    spaceId: '服务空间 SpaceId',
    clientSecret: '服务空间 Secret',
    endpoint: '服务空间 API Endpoint'
});