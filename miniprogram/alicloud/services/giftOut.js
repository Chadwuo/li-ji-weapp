const app = getApp();
const {
    getUserDataScope
} = require('./user');

const db = app.mpserverless.db;
const userInfo = app.userInfo;

/**
 * 计算送礼金额总计
 *
 * @author chadwuo
 */
exports.computedTotalGiftOut = async () => {
    try {
        // 数据权限范围
        const dataScope = await getUserDataScope()
        const { result } = db.collection('giftOut')
            .aggregate([
                {
                    $match: { userId: { $in: dataScope } }
                },
                {
                    $group: { _id: null, total: { $sum: "$money" } }
                }
            ])
        let total = result
        return {
            success: true,
            data: total.toFixed(2)
        };
    } catch (e) {
        return {
            success: false,
            message: e
        };
    }
};

/**
 * 添加送礼
 *
 * @author chadwuo
 */
exports.addGiftOut = async (parameter) => {
    const {
        giftOut, // 人情数据
        friend, // 亲友数据
    } = parameter
    try {
        // 参数中没有亲友id，添加先
        if (!giftOut.friendId) {
            const { result } = await db.collection('friend').insertOne({
                data: {
                    name: friend.name,
                    userId: userInfo._id,
                    firstLetter: friend.firstLetter
                }
            })
            // 新添加的亲友id
            giftOut.friendId = result._id
        }

        const { result } = await db.collection('giftOut').insertOne({
            userId: userInfo._id,
            friendId: giftOut.friendId,
            title: giftOut.title,
            date: giftOut.date,
            money: giftOut.money
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
 * 更新送礼
 *
 * @author chadwuo
 */
exports.updateGiftOut = async (parameter) => {
    try {
        await db.collection('giftOut').updateOne({
            _id: parameter._id
        }, {
            $set:
            {
                friendId: parameter.friendId,
                title: parameter.title,
                date: parameter.date,
                money: parameter.money
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
 * 删除送礼
 *
 * @author chadwuo
 */
exports.deleteGiftOut = async (parameter) => {
    try {
        await db.collection('giftOut').deleteOne({
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