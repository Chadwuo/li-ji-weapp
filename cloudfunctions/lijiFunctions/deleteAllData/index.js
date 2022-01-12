// 使用了 async await 语法
const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    let whereVal = event.where || {
        _openid: wxContext.OPENID,
        _id: '0',
    }
    return await db.collection(event.table).where(whereVal).remove()
}