import { nanoid } from 'nanoid/non-secure'
import { storeToRefs } from 'pinia'
import mpserverless from '~/alicloud'
import { useUserStore } from '~/stores/user'

const { userInfo } = storeToRefs(useUserStore())
const db = mpserverless.db

/**
 * 添加家庭
 *
 * @author chadwuo
 */
export async function add() {
  // 把自己添加为家庭管理员
  return await db.collection('family_member').insertOne({
    userId: userInfo.value._id,
    familyId: nanoid(),
    relation: '组织者',
  })
}

/**
 * 删除家庭
 *
 * @author chadwuo
 */
export async function del(parameter) {
  // 删除家庭成员
  return await db.collection('family_member').deleteMany({
    familyId: parameter.familyId,
  })
}

/**
 * 加入某个家庭
 *
 * @author chadwuo
 */
export async function join(parameter) {
  const { familyId } = parameter
  return await db.collection('family_member').insertOne({
    userId: userInfo.value._id,
    familyId,
    relation: '成员',
  })
}

/**
 * 删除家庭成员
 *
 * @author chadwuo
 */
export async function delFamilyMember(parameter) {
  return await db.collection('family_member').deleteOne({
    _id: parameter._id,
  })
}
