const cloud = require('wx-server-sdk');

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取分页
exports.page = async (event, context) => {
	let {
		OPENID,
	} = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的

	try {
		const res = await db.collection('issue').aggregate()
			.orderBy('createTime', 'desc')
			.skip(event.page - 1 * event.limit)
			.limit(event.limit)
			.end()
		return {
			success: true,
			data: res.result.list
		};
	} catch (e) {
		return {
			success: false,
			errMsg: e
		};
	}
};

// 添加
exports.add = async (event, context) => {
	const {
		data
	} = event
	try {
		const res = await db.collection('issue').add(data)
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
	const {
		data
	} = event
	try {
		await db.collection('issue').doc(event._id).update(data)
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
		await db.collection('issue').doc(event._id).remove()
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
