const getUserInfo = require('./getUserInfo/index');
const getAllData = require('./getAllData/index');
const deleteAllData = require('./deleteAllData/index');
const lookupGiftFriend = require('./lookupGiftFriend/index');
const lookupBookGift = require('./lookupBookGift/index');

const userHandler = require('./services/user');
const bookHandler = require('./services/book');
const giftReceiveHandler = require('./services/giftReceive');
const giftOutHandler = require('./services/giftOut');

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
       case 'userOpenid': // 获取用户openid
            return await userHandler.userOpenid(event, context);
        case 'getBookPage': // 分页获取礼簿
            return await bookHandler.page(event, context);
        case 'addBook': //添加礼簿
            return await bookHandler.add(event, context);
        case 'updateBook': // 更新礼簿
            return await bookHandler.update(event, context);
        case 'deleteBook': // 删除礼簿
            return await bookHandler.delete(event, context);
        case 'addGiftReceive': // 添加收礼
            return await giftReceiveHandler.add(event, context);
        case 'updateGiftReceive': // 更新收礼
            return await giftReceiveHandler.update(event, context);
        case 'deleteGiftReceive': // 删除收礼
            return await giftReceiveHandler.delete(event, context);
        case 'addGiftReceive': // 添加送礼
            return await giftOutHandler.add(event, context);
        case 'updateGiftOut': // 更新送礼
            return await giftOutHandler.upd

        case 'getUserInfo':
            return await getUserInfo.main(event, context);
        case 'getAllData':
            return await getAllData.main(event, context);
        case 'deleteAllData':
            return await deleteAllData.main(event, context);
        case 'lookupGiftFriend':
            return await lookupGiftFriend.main(event, context);
        case 'lookupBookGift':
            return await lookupBookGift.main(event, context);
    }
};
