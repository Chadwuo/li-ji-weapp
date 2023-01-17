const mpserverless = require('../index');
const db = mpserverless.db;

/**
 * 获取用户信息
 * 如果没有会自动创建用户
 *
 * @author chadwuo
 */
exports.getUserInfo = async () => {
  try {
    const res = await mpserverless.user.getInfo()
    if (!res.success) {
      throw new Error("操作失败");
    }
    const userId = res.result.user.userId // Serverless平台生成的用户ID
    let {
      result: user
    } = await db.collection('user').findOne({
      _id: userId
    })
    if (!user) {
      // 创建用户
      user = {
        _id: userId,
        nickName: '礼记者',
        avatarUrl: '/static/logo.png',
        isVip: false,
        createTime: new Date(),
      }
      await db.collection('user').insertOne(user)
    }

    return {
      success: true,
      data: user
    }
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
}

/**
 * 获取用户数据范围
 *
 * @return data {Array.<string>} 用户id集合。
 * @author chadwuo
 */
exports.getUserDataScope = async () => {
  const {
    userInfo
  } = getApp()

  // 获取家庭信息
  const {
    result: familyMember
  } = await db.collection('family_member').findOne({
    userId: userInfo._id
  })

  // 没有加入家庭，就返回自己的id
  if (!familyMember) {
    return [userInfo._id]
  } 
  
  // 获取家庭其他成员信息
  const {
    result: familyInfos
  } = await db.collection('family_member').find({
    familyId: familyMember.familyId
  })

  let dataScope = familyInfos.map(i => {
    return i.userId
  })

  if (!dataScope || dataScope.length == 0) {
    return [userInfo._id]
  }

  return dataScope
}