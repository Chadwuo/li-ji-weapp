const {
  mpserverless
} = getApp();


/**
 * 获取用户信息
 * 如果没有会自动创建用户
 *
 * @author chadwuo
 */
exports.getUserInfo = async () => {
  try {
    const res = await mpserverless.user.getInfo()
    if (res.success) {
      const userId = res.result.user.userId // Serverless平台生成的用户ID
      let {
        result: user
      } = await mpserverless.db.collection('user').findOne({
        _id: userId
      })

      console.log('3333')
      if (!user) {
        // 创建用户
        user = {
          _id: userId,
          familyId: '',
          isVip: false
        }
        mpserverless.db.collection('user').insertOne(user).then(res => {
          console.log(res)
        }).catch(console.error);
      }

      console.log('222222')
      return {
        success: true,
        data: user
      }
    }
    return {
      success: false,
      message: '操作失败'
    }
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
}