const cloud = require('wx-server-sdk');

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取分页
exports.page = async (event, context) => {
	// 获取基础信息
	const wxContext = cloud.getWXContext();
	try {
		const res = await db.collection('book').aggregate()
			.match({
				_openid: wxContext.OPENID,
			})
			.skip(event.page * event.limit)
			.limit(event.limit)
			.lookup({
				from: "gift",
				localField: "_id",
				foreignField: "bookId",
				as: "giftList"
			})
			.end()
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
		await db.collection('issues').add(data)
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
		await db.collection('issues').doc(event._id).update()
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
		await db.collection('issues').doc(event._id).remove()
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