const app = getApp();
const {
    getUserDataScope
} = require('./user');

const db = app.mpserverless.db;
const userInfo = app.userInfo;

/**
 * 计算收礼金额总计
 *
 * @author chadwuo
 */
exports.computedTotalGiftReceive = async () => {
    try {
        // 数据权限范围
        const dataScope = await getUserDataScope()
        const { result } = db.collection('giftReceive')
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
 * 添加收礼
 *
 * @author chadwuo
 */
exports.addGiftReceive = async (parameter) => {
    const {
        giftReceive, // 人情数据
        friend, // 亲友数据
    } = parameter
    try {
        // 参数中没有亲友id，添加先
        if (!giftReceive.friendId) {
            const { result } = await db.collection('friend').insertOne({
                data: {
                    name: friend.name,
                    userId: userInfo._id,
                    firstLetter: friend.firstLetter
                }
            })
            // 新添加的亲友id
            giftReceive.friendId = result._id
        }

        const { result } = await db.collection('giftReceive').insertOne({
            userId: userInfo._id,
            friendId: giftReceive.friendId,
            bookId: giftReceive.bookId,
            title: giftReceive.title,
            date: giftReceive.date,
            money: giftReceive.money
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
* 更新收礼
*
* @author chadwuo
*/
exports.updateGiftReceive = async (parameter) => {
    try {
        await db.collection('giftReceive').updateOne({
            _id: parameter._id
        }, {
            $set:
            {
                friendId: parameter.friendId,
                bookId: parameter.bookId,
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
* 删除收礼
*
* @author chadwuo
*/
exports.deleteGiftReceive = async (parameter) => {
    try {
        await db.collection('giftReceive').deleteOne({
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