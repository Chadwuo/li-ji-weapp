const cloud = require('wx-server-sdk');
const {
  getUserDataScope
} = require('./user');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取分页
exports.page = async (event, context) => {
  try {
    const _ = db.command
    // 数据权限范围
    const dataScope = await getUserDataScope(event, context)
    const res = await db.collection('book').aggregate()
      .match({
        userId: _.in(dataScope)
      })
      .skip(event.page * event.limit)
      .limit(event.limit)
      .lookup({
        from: "giftReceive",
        localField: "_id",
        foreignField: "bookId",
        as: "giftList"
      })
      .end()
    return {
      success: true,
      data: res.list
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};

// 添加
exports.get = async (event, context) => {
  try {
    const res = await db.collection('book').doc(event._id).get()
    return {
      success: true,
      data: res.data
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};

// 添加
exports.add = async (event, context) => {
  const {
    data,
    userInfo
  } = event
  try {
    data.userId = userInfo._id
    await db.collection('book').add(data)
    return {
      success: true,
      data: ''
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};

// 更新
exports.update = async (event, context) => {
  try {
    await db.collection('book').doc(event._id).update()
    return {
      success: true,
      data: ''
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};

// 删除
exports.delete = async (event, context) => {
  try {
    await db.collection('book').doc(event._id).remove()
    return {
      success: true,
      data: ''
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};