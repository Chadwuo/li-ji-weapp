const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取当前OPENID
exports.userOpenid = async (event,context) => {
  try {
    let { OPENID } = cloud.getWXContext()
    return {
      success:true,
      data:OPENID
    }
  }catch{
    return {
      success: false,
      message: e
    };
  }
}

exports.getUserInfo = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  return await db.collection('user').where({
    _openid: wxContext.OPENID,
  }).get()
};

exports.register = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  return await db.collection('user').add({
    _openid: wxContext.OPENID,
  })
};