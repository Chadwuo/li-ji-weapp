const getUserInfo = require('./getUserInfo/index');
const getAllData = require('./getAllData/index');
const deleteAllData = require('./deleteAllData/index');
const lookupGiftFriend = require('./lookupGiftFriend/index');
const lookupBookGift = require('./lookupBookGift/index');
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
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