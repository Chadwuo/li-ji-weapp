const cloud = require('wx-server-sdk');
const {
  getUserDataScope
} = require('./user');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 计算送礼金额总计
exports.total = async (event, context) => {
  // 聚合操作符
  const $ = db.command.aggregate
  // 查询操作符
  const _ = db.command
  try {
    // 数据权限范围
    const dataScope = await getUserDataScope(event, context)
    const res = db.collection('giftOut')
      .aggregate()
      .match({
        userId: _.in(dataScope)
      })
      .group({
        _id: null,
        total: $.sum('$money')
      })
      .end()
    let total = 0
    if (res.list.length != 0) {
      total = res.list[0].total
    }
    return {
      success: true,
      data: total.toFixed(2)
    };
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
};

// 添加
exports.add = async (event, context) => {
  const {
    data, // 人情数据
    friendData, // 亲友数据
  } = event
  try {
    // 参数中没有亲友id，添加先
    if (!data.friendId) {
      const friend = await db.collection('friend').add({
        data: {
          name: friendData.name,
          userId: data.userId,
          firstLetter: friendData.firstLetter
        }
      })
      // 新添加的亲友id
      data.friendId = friend._id
    }

    const res = await db.collection('giftOut').add(data)
    return {
      success: true,
      data: res
    };
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
};

// 更新
exports.update = async (event, context) => {
  const {
    data, // 人情数据
  } = event
  try {
    await db.collection('giftOut').doc(event._id).update(data)
    return {
      success: true,
      data: ''
    };
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
};

// 删除
exports.delete = async (event, context) => {
  try {
    await db.collection('giftOut').doc(event._id).remove()
    return {
      success: true,
      data: ''
    };
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
};