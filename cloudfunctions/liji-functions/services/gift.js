const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();


// 添加
exports.add = async (event, context) => {
	const {
	  data
	} = event
	try {
	  await db.collection('gift').add(data)
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
	  await db.collection('gift').doc(event._id).update()
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
	  await db.collection('gift').doc(event._id).remove()
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