const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.getPage = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  const res = await db.collection('book').aggregate()
    .match({
      _openid: wxContext.OPENID,
    })
    .skip(event.page * event.limit)
    .limit(event.limit)
    .lookup({
      from: "gift",
      localField: "_id",
      foreignField: "bookId",
      as: "giftList"
    })
    .end()
};