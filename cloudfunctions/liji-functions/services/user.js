const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取当前OPENID
exports.userOpenid = async (event, context) => {
  try {
    let {
      OPENID
    } = cloud.getWXContext()
    return {
      success: true,
      data: OPENID
    }
  } catch {
    return {
      success: false,
      message: e
    };
  }
}

// 获取用户信息
exports.getUserInfo = async (event, context) => {
  try {
    let {
      OPENID
    } = cloud.getWXContext()
    const res = await db.collection('user').where({
      _openid: OPENID,
    }).get()

    return {
      success: true,
      data: res.data
    }
  } catch {
    return {
      success: false,
      message: e
    };
  }
};

// 获取用户家庭信息
exports.getUserFamily = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  return await db.collection('family').where({
    _id: wxContext.OPENID,
  }).get()
};

// 注册用户
exports.register = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  return await db.collection('user').add({
    _openid: wxContext.OPENID,
  })
};