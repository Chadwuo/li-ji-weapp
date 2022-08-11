const app = getApp();
const {
    getUserDataScope
} = require('./user');

const db = app.mpserverless.db;
const userInfo = app.userInfo;

/**
 * 获取全部亲友数据集合
 *
 * @author chadwuo
 */
exports.getFriendList = async () => {
    try {
        // 数据权限范围
        const dataScope = await getUserDataScope()
        // 查询操作符
        const _ = db.command
        const MAX_LIMIT = 100
        // 先取出集合记录总数
        const { result: total } = await db.collection('friend').count({
            userId: { $in: dataScope }
        })
        // 计算需分几次取
        const batchTimes = Math.ceil(total / 100)
        // 承载所有读操作的 promise 的数组
        const tasks = []
        for (let i = 0; i < batchTimes; i++) {
            const promise = db.collection('friend').find({
                userId: _.in(dataScope)
            }).skip(i * MAX_LIMIT).limit(MAX_LIMIT)

            tasks.push(promise)
        }
        // 等待所有
        return (await Promise.all(tasks)).reduce((acc, cur) => {
            return {
                data: acc.data.concat(cur.data),
                message: acc.errMsg,
            }
        })
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
};

/**
 * 获取亲友数据
 *
 * @author chadwuo
 */
exports.getFriend = async (parameter) => {
    try {
        const { result } = await db.collection('friend').findOne({
            _id: parameter._id,
        })
        return {
            success: true,
            data: result
        };
    } catch (e) {
        return {
            success: false,
            message: e
        };
    }
};

/**
 * 添加亲友数据
 *
 * @author chadwuo
 */
exports.addFriend = async (parameter) => {
    try {
        const { result } = await db.collection('friend').insertOne({
            userId: userInfo._id,
            name: parameter.name,
            fristLetter: parameter.fristLetter
        })
        return {
            success: true,
            data: result
        };
    } catch (e) {
        return {
            success: false,
            message: e
        };
    }
};

/**
 * 更新亲友数据
 *
 * @author chadwuo
 */
exports.updateFriend = async (parameter) => {
    try {
        await db.collection('friend').updateOne({
            _id: parameter._id
        }, {
            $set:
            {
                name: parameter.name,
                fristLetter: parameter.fristLetter
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
 * 删除亲友数据
 *
 * @author chadwuo
 */
exports.deleteFriend = async (parameter) => {
    try {
        // 删除亲友下所有送礼记录
        await db.collection('giftOut').deleteMany({
            friendId: parameter._id
        }).remove()
        // 删除亲友下所有收礼记录
        await db.collection('giftReceive').deleteMany({
            friendId: parameter._id
        }).remove()
        // 删除亲友
        await db.collection('friend').deleteOne({
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
