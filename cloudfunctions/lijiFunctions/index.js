const getUserInfo = require('./getUserInfo/index');
const addUser = require('./addUser/index');
const getAllAppreciate = require('./getAllAppreciate/index');
const getAllData = require('./getAllData/index');
const deleteAllData = require('./deleteAllData/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getUserInfo':
      return await getUserInfo.main(event, context);
    case 'signup':
      return await addUser.main(event, context);
    case 'getAllAppreciate':
      return await getAllAppreciate.main(event, context);
    case 'getAllData':
      return await getAllData.main(event, context);
    case 'deleteAllData':
      return await deleteAllData.main(event, context);
  }
};