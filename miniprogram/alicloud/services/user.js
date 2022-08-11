const app = getApp();

const db = app.mpserverless.db
const userInfo = app.userInfo
/**
 * 获取用户数据范围
 *
 * @return data {Array.<string>} 用户id集合。
 * @author chadwuo
 */
exports.getUserDataScope = async () => {
  // 没有加入家庭，就返回自己的id
  if (!userInfo.familyId) {
    return [userInfo._Id]
  }

  // 获取家庭信息
  const { result: familyInfos } = await db.collection('familyInfo').find({
    familyId: userInfo.familyId,
    status: 1
  })

  let dataScope = familyInfos.map(i => {
    return i._id
  })

  return dataScope
}