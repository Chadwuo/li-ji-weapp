const cloud = require('wx-server-sdk');

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();


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

		const res = await db.collection('giftOut').add(data)
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
		await db.collection('giftOut').doc(event._id).update()
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
		await db.collection('giftOut').doc(event._id).remove()
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
