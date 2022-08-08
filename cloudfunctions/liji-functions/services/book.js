const cloud = require('wx-server-sdk');
const {
  getUserDataScope
} = require('./user');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取分页
exports.page = async (event, context) => {
  try {
    const _ = db.command
    // 数据权限范围
    const dataScope = await getUserDataScope(event, context)
    const res = await db.collection('book').aggregate()
      .match({
        userId: _.in(dataScope)
      })
      .skip(event.page * event.limit)
      .limit(event.limit)
      .lookup({
        from: "giftReceive",
        localField: "_id",
        foreignField: "bookId",
        as: "giftList"
      })
      .end()
    return {
      success: true,
      data: res.list
    };
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
};

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
			const countResult = await db.collection('book').where({
				userId: _.in(dataScope)
			}).count()
			const total = countResult.total
			// 计算需分几次取
			const batchTimes = Math.ceil(total / 100)
			// 承载所有读操作的 promise 的数组
			const tasks = []
			for (let i = 0; i < batchTimes; i++) {
				const promise = db.collection('book').where({
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

// 获取
exports.get = async (event, context) => {
  try {
    const res = await db.collection('book').doc(event._id).get()
    return {
      success: true,
      data: res.data
    };
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
};

// 添加
exports.add = async (event, context) => {
  const {
    data,
    userInfo
  } = event
  try {
    data.userId = userInfo._id
    await db.collection('book').add(data)
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

// 更新
exports.update = async (event, context) => {
  try {
    await db.collection('book').doc(event._id).update()
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
    await db.collection('book').doc(event._id).remove()
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