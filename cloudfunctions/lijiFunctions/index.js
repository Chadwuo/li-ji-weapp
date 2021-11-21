const getUserInfo = require('./getUserInfo/index');
const addUser = require('./addUser/index');
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getUserInfo':
      return await getUserInfo.main(event, context);
    case 'signup':
      return await addUser.main(event, context);
  }
};