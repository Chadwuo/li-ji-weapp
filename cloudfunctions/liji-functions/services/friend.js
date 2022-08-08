const cloud = require('wx-server-sdk');
const {
	getUserDataScope
} = require('./user');
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取全部数据集合
exports.getList = async (event, context) => {
	try {
		// 数据权限范围
		const dataScope = await getUserDataScope(event, context)
		// 查询操作符
		const _ = db.command
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
				const promise = db.collection('friend').where({
					userId: _.in(dataScope)
				}).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
				tasks.push(promise)
			}
			// 等待所有
			return (await Promise.all(tasks)).reduce((acc, cur) => {
				return {
					data: acc.data.concat(cur.data),
					message: acc.errMsg,
				}
			})
		}
	} catch (error) {
		return {
			success: false,
			message: error,
		}
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
		await db.collection('friend').doc(event._id).update(data)
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
		// 删除亲友下所有送礼记录
		await db.collection('giftOut').where({
			friendId: event._id
		}).remove()
		// 删除亲友下所有收礼记录
		await db.collection('giftReceive').where({
			friendId: event._id
		}).remove()
		// 删除亲友
		await db.collection('friend').doc(event._id).remove()
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
