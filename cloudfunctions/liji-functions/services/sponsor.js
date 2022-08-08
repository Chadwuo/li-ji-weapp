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
		const countResult = await db.collection('sponsor').count()
		const total = countResult.total
		// 计算需分几次取
		const batchTimes = Math.ceil(total / 100)
		// 承载所有读操作的 promise 的数组
		const tasks = []
		for (let i = 0; i < batchTimes; i++) {
			const promise = db.collection('sponsor').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
			tasks.push(promise)
		}
		// 等待所有
		return (await Promise.all(tasks)).reduce((acc, cur) => {
			return {
				data: acc.data.result.list.concat(cur.data.result.list),
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
		const res = await db.collection('sponsor').add(data)
		return {
			success: true,
			data: res
		};
	} catch (e) {
		return {
			success: false,
			message: e
		};
	}
};

// 更新
exports.update = async (event, context) => {
	const {
		data
	} = event
	try {
		await db.collection('sponsors').doc(event._id).update(data)
		return {
			success: true,
			data: ''
		};
	} catch (e) {
		return {
			success: false,
			message: e
		};
	}
};

// 删除
exports.delete = async (event, context) => {
	try {
		await db.collection('sponsor').doc(event._id).remove()
		return {
			success: true,
			data: ''
		};
	} catch (e) {
		return {
			success: false,
			message: e
		};
	}
};
