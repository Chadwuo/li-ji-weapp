const cloud = require('wx-server-sdk');

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 计算收礼金额总计
exports.total = async (event, context) => {
	const $ = db.command.aggregate
	try {
		const res = db.collection('giftReceive')
			.aggregate()
			.match({
				userId: 'TODO',
			})
			.group({
				_id: null,
				total: $.sum('$money')
			})
			.end()
		let total = 0
		if (res.list.length != 0) {
			total = res.list[0].total
		}
		return {
			success: true,
			data: total.toFixed(2)
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
		data, // 人情数据
		friendData, // 亲友数据
	} = event
	try {
		// 参数中没有亲友id，添加先
		if (!data.friendId) {
			const friend = await db.collection('friend').add({
				data: {
					name: friendData.name,
					userId: data.userId,
					firstLetter: friendData.firstLetter
				}
			})
			// 新添加的亲友id
			data.friendId = friend._id
		}

		const res = await db.collection('gift').add(data)
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
		await db.collection('giftReceive').doc(event._id).update()
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
		await db.collection('giftReceive').doc(event._id).remove()
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
