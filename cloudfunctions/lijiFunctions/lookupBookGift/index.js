const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()
var $ = db.command.aggregate
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  return await db.collection('gift').aggregate()
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
}