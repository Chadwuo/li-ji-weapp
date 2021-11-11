const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 获取小程序二维码云函数入口函数
exports.main = async (event, context) => {
  // 获取小程序二维码的buffer
  const resp = await cloud.openapi.wxacode.get({
    path: 'pages/index/index'
  });
  const { buffer } = resp;
  // 将图片上传云存储空间
  const upload = await cloud.uploadFile({
    cloudPath: 'code.png',
    fileContent: buffer
  });
  return upload.fileID;
};
