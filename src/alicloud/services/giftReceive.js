import { pinyin } from 'pinyin-pro'
import { storeToRefs } from 'pinia'
import mpserverless from '~/alicloud'
import { useUserStore } from '~/stores/user'

const { userDataScope, userInfo } = storeToRefs(useUserStore())
const db = mpserverless.db

/**
 * 计算收礼金额总计
 *
 * @author chadwuo
 */
export async function statistics() {
  const res = await db.collection('gift_receive').aggregate([
    {
      $match: {
        userId: {
          $in: userDataScope.value,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: '$money',
        },
        count: {
          $sum: 1,
        },
      },
    },
  ])
  if (res.success) {
    res.data = {
      total: res.result[0]?.total.toFixed(2) || 0,
      count: res.result[0]?.count || 0,
    }
  }
  return res
}

/**
 * 根据礼簿分页获取收礼数据
 *
 * @author chadwuo
 */
export async function page(parameter) {
  const { pageSize, pageNo, keyword } = parameter
  return await db.collection('gift_receive').aggregate([
    {
      $match: {
        userId: {
          $in: userDataScope.value,
        },
        bookId: parameter.bookId,
      },
    },
    {
      $sort: {
        money: -1,
        _id: 1,
      },
    },
    {
      $lookup: {
        // 左连接
        from: 'friend', // 关联到de表
        localField: 'friendId', // 左表关联的字段
        foreignField: '_id', // 右表关联的字段
        as: 'friendInfo',
      },
    },
    {
      $unwind: {
        // 拆分子数组
        path: '$friendInfo',
        preserveNullAndEmptyArrays: true, // 空的数组也拆分
      },
    },
    {
      $match: {
        'friendInfo.name': { $regex: keyword ?? '', $options: 'i' },
      },
    },
    {
      $skip: (pageNo - 1) * pageSize,
    },
    {
      $limit: pageSize,
    },
  ])
}

/**
 * 添加收礼
 *
 * @author chadwuo
 */
export async function add(parameter) {
  const { friendInfo, bookId, attendance, money, remarks } = parameter
  let { name: friendName, _id: friendId } = friendInfo || {}
  // 参数中没有亲友id
  if (!friendId) {
    // 根据亲友名查询库中是否存在
    const { result: friend } = await db.collection('friend').findOne({
      userId: {
        $in: userDataScope.value,
      },
      name: friendName.trim(),
    })

    if (friend && friend._id) {
      // 存在
      friendId = friend._id
    }
    else {
      // 添加
      const { result: newFriend } = await db.collection('friend').insertOne({
        userId: userInfo.value._id,
        name: friendName,
        firstLetter: pinyin(friendName, { pattern: 'first', toneType: 'none', type: 'array' })[0],
      })
      // 新添加的亲友id
      friendId = newFriend.insertedId
    }
  }

  return await db.collection('gift_receive').insertOne({
    userId: userInfo.value._id,
    friendId,
    bookId,
    money: Number(money),
    attendance: Number(attendance),
    remarks,
  })
}

/**
 * 更新收礼
 *
 * @author chadwuo
 */
export async function update(parameter) {
  const { attendance, money, remarks } = parameter
  return await db.collection('gift_receive').updateOne(
    {
      _id: parameter._id,
    },
    {
      $set: {
        money: Number(money),
        attendance: Number(attendance),
        remarks,
      },
    },
  )
}

/**
 * 删除收礼
 *
 * @author chadwuo
 */
export async function del(parameter) {
  return await db.collection('gift_receive').deleteOne({
    _id: parameter._id,
  })
}

/**
 * 详情
 *
 * @author chadwuo
 */
export async function get(parameter) {
  return await db.collection('gift_receive').findOne({
    _id: parameter._id,
  })
}
