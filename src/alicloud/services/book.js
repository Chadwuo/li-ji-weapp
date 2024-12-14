import { storeToRefs } from 'pinia'
import mpserverless from '~/alicloud/index'
import { useUserStore } from '~/stores/user'

const { userDataScope, userInfo } = storeToRefs(useUserStore())
const db = mpserverless.db

/**
 * 获取分页
 *
 * @author chadwuo
 */
export async function page(parameter) {
  const { pageSize, pageNo } = parameter
  return await db.collection('book').aggregate([
    {
      $match: {
        userId: {
          $in: userDataScope.value,
        },
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
    {
      $skip: (pageNo - 1) * pageSize,
    },
    {
      $limit: pageSize,
    },
    {
      // TODO 需要修改
      $lookup: {
        // 左连接
        from: 'gift_receive', // 关联到de表
        localField: '_id', // 左表关联的字段
        foreignField: 'bookId', // 右表关联的字段
        as: 'giftList',
      },
    },
  ])
}

/**
 * 获取礼簿
 *
 * @author chadwuo
 */
export async function get(parameter) {
  return await db.collection('book').findOne({
    _id: parameter._id,
  })
}

/**
 * 添加礼簿
 *
 * @author chadwuo
 */
export async function add(parameter) {
  const { date, title, remarks, cost } = parameter
  return await db.collection('book').insertOne({
    userId: userInfo.value._id,
    date,
    title,
    remarks,
    cost,
  })
}

/**
 * 更新礼簿
 *
 * @author chadwuo
 */
export async function update(parameter) {
  const { _id, date, title, remarks, cost } = parameter
  return await db.collection('book').updateOne(
    {
      _id,
    },
    {
      $set: {
        title,
        date,
        remarks,
        cost,
      },
    },
  )
}

/**
 * 删除礼簿
 *
 * @author chadwuo
 */
export async function del(parameter) {
  const { _id } = parameter
  if (!_id) {
    return {
      success: false,
      message: '礼簿id不能为空',
    }
  }
  let res = await db.collection('book').deleteOne({
    _id,
  })
  if (res.success) {
    // 删除礼簿下所有收礼记录
    res = await db.collection('gift_receive').deleteMany({
      bookId: _id,
    })
  }
  return res
}
