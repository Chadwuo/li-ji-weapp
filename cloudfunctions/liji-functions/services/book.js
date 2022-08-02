const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取分页
exports.page = async (event, context) => {
  let {
    OPENID,
  } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的

  try {
    const res = await db.collection('book').aggregate()
      .match({
        _openid: OPENID,
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
      data: res.result.list
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
    data
  } = event
  try {
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
