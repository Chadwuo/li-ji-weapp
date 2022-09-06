const {
    db
  } = require('../index');

/**
 * 获取获取全部数据集合
 *
 * @author chadwuo
 */
exports.getSponsorList = async () => {
    const db = cloud.database()
    const MAX_LIMIT = 100
    // 先取出集合记录总数
    const {
        result: total
    } = await db.collection('sponsor').count()
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('sponsor').skip(i * MAX_LIMIT).limit(MAX_LIMIT)
        tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
        return {
            data: acc.data.result.list.concat(cur.data.result.list),
            errMsg: acc.errMsg,
        }
    })
};

/**
 * 添加
 *
 * @author chadwuo
 */
exports.addSponsor = async (parameter) => {
    try {
        const {
            result
        } = await db.collection('sponsor').insertOne({
            name: parameter.name,
            money: parameter.money,
            words: parameter.words
        })
        return {
            success: true,
            data: result.insertedId
        };
    } catch (e) {
        return {
            success: false,
            message: e
        };
    }
};

/**
 * 更新
 *
 * @author chadwuo
 */
exports.updateSponsor = async (parameter) => {
    try {
        await db.collection('sponsors').updateOne({
            _id: parameter._id
        }, {
            $set: {
                name: parameter.name,
                money: parameter.money,
                words: parameter.words
            }
        })
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

/**
 * 删除
 *
 * @author chadwuo
 */
exports.deleteSponsor = async (parameter) => {
    try {
        await db.collection('sponsor').deleteOne({
            _id: parameter._id
        })
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