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
      from: "friend",
      localField: "friendId",
      foreignField: "_id",
      as: "friendList"
    })
    // 并将 friend 匹配到的数组结果直接 merge 到 gift 记录中
    .addFields({
      friendInfo: $.mergeObjects([$.arrayElemAt(['$friendList', 0])])
    })
    .project({
      friendList: 0
    })
    .end()
}