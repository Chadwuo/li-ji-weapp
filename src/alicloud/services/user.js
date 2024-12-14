import dayjs from 'dayjs'
import mpserverless from '~/alicloud/index'
import { useUserStore } from '~/stores/user'

const db = mpserverless.db

/**
 * 获取用户信息
 * 如果没有会自动创建用户
 *
 * @author chadwuo
 */
export async function getInfo() {
  let { userInfo } = useUserStore()
  if (!userInfo._id) {
    const res = await mpserverless.user.getInfo()
    if (!res.success)
      return res

    const loginUser = res.result.user
    userInfo = {
      _id: loginUser.userId,
      nickName: generateRandomNickname(),
      avatarUrl: generateRandomAvatar(),
      oAuthUserId: loginUser.oAuthUserId,
      enableAD: true,
      createdAt: dayjs(loginUser.createdAt).format(),
      lastSeenAt: dayjs(loginUser.lastSeenAt).format(),
    }
  }

  let res = await db.collection('user').findOne({
    _id: userInfo._id,
  })
  if (!res.success)
    return res

  if (res.result) {
    userInfo = res.result
    await db.collection('user').updateOne({
      _id: userInfo._id,
    }, {
      $set: {
        lastSeenAt: dayjs().format(),
      },
    })
  }
  else {
    res = await db.collection('user').insertOne(userInfo)
    if (!res.success)
      return res
  }

  // 获取家庭信息
  const {
    result: familyInfo,
  } = await db.collection('family_member').findOne({
    userId: userInfo._id,
  })

  if (!familyInfo) {
    userInfo.familyMembers = null
  }
  else {
    const { result: familyMembers } = await db
      .collection('family_member')
      .aggregate([
        {
          $match: {
            familyId: familyInfo.familyId,
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            // 拆分子数组
            path: '$user',
            preserveNullAndEmptyArrays: true, // 空的数组也拆分
          },
        },
      ])
    userInfo.familyMembers = familyMembers
  }

  return {
    success: true,
    result: userInfo,
  }
}

/**
 * 更新用户数据
 *
 * @author chadwuo
 */
export async function update(parameter) {
  const { nickName, avatarUrl, enableAD } = parameter
  const { userInfo } = useUserStore()
  const setConditions = {}
  if (nickName)
    setConditions.nickName = nickName

  if (avatarUrl)
    setConditions.avatarUrl = avatarUrl

  if (enableAD !== null && enableAD !== undefined)
    setConditions.enableAD = enableAD

  return await db.collection('user').updateOne({
    _id: userInfo._id,
  }, {
    $set: setConditions,
  })
}

function generateRandomNickname() {
  const nicknames = ['诗情画意', '斑马还没有睡', '52赫兹', 'Cx330', '长安某', 'TiAmo', 'YOLO', 'Nuyoah', '我想要两颗西柚', '一川烟草给你', '山山而川', '卡夫卡的熊', '海上森林一只猫', '从月亮走向月亮', '奈川12街6号', '雾都浪漫', '失约于月光', '南城一书生', '月亮上的垂耳兔', '热苏打', '凌晨一点的猫', '低谷有雾', '长谷深风']
  return nicknames[Math.floor(Math.random() * nicknames.length)]
}

function generateRandomAvatar() {
  return `/static/avatar/${Math.floor(Math.random() * 12) + 1}.jpg`
}
