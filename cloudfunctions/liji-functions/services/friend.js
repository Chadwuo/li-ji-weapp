const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取全部数据集合
exports.getList = async (event, context) => {
	const db = cloud.database()
	const MAX_LIMIT = 100
	exports.main = async (event, context) => {
		// 先取出集合记录总数
		const countResult = await db.collection('friend').count()
		const total = countResult.total
		// 计算需分几次取
		const batchTimes = Math.ceil(total / 100)
		// 承载所有读操作的 promise 的数组
		const tasks = []
		for (let i = 0; i < batchTimes; i++) {
			const promise = db.collection('friend').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
			tasks.push(promise)
		}
		// 等待所有
		return (await Promise.all(tasks)).reduce((acc, cur) => {
			return {
				data: acc.data.concat(cur.data),
				errMsg: acc.errMsg,
			}
		})
	}
};

// 添加
exports.add = async (event, context) => {
	const {
	  data
	} = event
	try {
	 const res = await db.collection('friend').add(data)
	  return {
		success: true,
		data: res
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
	  await db.collection('friend').doc(event._id).update()
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
	  await db.collection('friend').doc(event._id).remove()
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
