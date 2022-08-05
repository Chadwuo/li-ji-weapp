const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取当前OPENID
exports.getOpenid = async (event, context) => {
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
exports.getInfo = async (event, context) => {
  try {
    let {
      OPENID
    } = cloud.getWXContext()
    const res = await db.collection('user').where({
      _openid: OPENID,
    }).get()

    if (res.result.data.length == 1) {
      return {
        success: true,
        data: res.result.data[0]
      }
    } else {
      return {
        success: false,
        message: 'user not found by openid'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
};

// 注册用户
exports.add = async (event, context) => {
  try {
    const res = await db.collection('user').add({
      data: {
        familyId: '',
        isVip: false
      }
    })
    return {
      success: true,
      data: res.result.data
    }
  } catch (error) {
    return {
      success: false,
      message: error
    }
  }
};

/**
* 获取用户数据范围
* @return data {Array.<string>} 用户id集合。
* @author chadwuo
*/
exports.getUserDataScope = async (event, context) => {
  try {
    const {
      userInfo
    } = event

    // 没有加入家庭，就返回自己的id
    if (!userInfo.familyId) {
      return [userInfo._Id]
    }

    // 获取家庭信息
    const res = await db.collection('familyInfo').where({
      familyId: userInfo.familyId,
      status: 1
    }).get()

    return res.result.data

  } catch {
    return []
  }
};