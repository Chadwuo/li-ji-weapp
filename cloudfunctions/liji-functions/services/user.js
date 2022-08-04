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
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
};

// 获取用户家庭信息
exports.getUserFamily = async (event, context) => {
  try {
    const familyRes = await db.collection('family').doc(event._id).get()

    const familyInfoRes = await db.collection('familyInfo').where({
      familyId: event._id,
    }).get()

    return {
      success: true,
      data: {
        ...familyRes.result.data,
        familyInfo: familyInfoRes.result.data
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }

};

// 注册用户
exports.register = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  return await db.collection('user').add({
    _openid: wxContext.OPENID,
  })
};