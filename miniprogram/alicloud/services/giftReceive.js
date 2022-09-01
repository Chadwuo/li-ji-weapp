import pinyin from "wl-pinyin";
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
        const {
            result
        } = await db.collection('gift_receive')
            .aggregate([{
                    $match: {
                        userId: {
                            $in: dataScope
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$money"
                        }
                    }
                }
            ])
        let {
            total
        } = result[0]
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
}
/**
 * 根据礼簿分页获取收礼数据
 *
 * @author chadwuo
 */
exports.getGiftReceivePage = async (parameter) => {
    try {
        // 数据权限范围
        const dataScope = await getUserDataScope()
        const {
            result
        } = await db.collection('gift_receive').aggregate([{
                $match: {
                    userId: {
                        $in: dataScope
                    },
                    bookId: parameter.bookId
                }
            },
            {
                $sort: {
                    date: -1
                }
            },
            {
                $skip: ((parameter.page - 1) * parameter.limit)
            },
            {
                $limit: parameter.limit
            },
            {
                $lookup: { // 左连接
                    from: "friend", // 关联到de表
                    localField: "friendId", // 左表关联的字段
                    foreignField: "_id", // 右表关联的字段
                    as: "friendInfo"
                }
            },
            {
                $unwind: { // 拆分子数组
                    path: "$friendInfo",
                    preserveNullAndEmptyArrays: true // 空的数组也拆分
                }
            }
        ])
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
 * 添加收礼
 *
 * @author chadwuo
 */
exports.addGiftReceive = async (parameter) => {
    try {
        // 参数中没有亲友id，添加先
        if (!parameter.friendId) {
            const {
                result
            } = await db.collection('friend').insertOne({
                userId: userInfo._id,
                name: parameter.friendName,
                firstLetter: pinyin.getFirstLetter(parameter.friendName.substr(0, 1)),
            })
            // 新添加的亲友id
            parameter.friendId = result.insertedId
        }

        const {
            result
        } = await db.collection('gift_receive').insertOne({
            userId: userInfo._id,
            friendId: parameter.friendId,
            bookId: parameter.bookId,
            title: parameter.title,
            date: parameter.date,
            money: Number(parameter.money),
            remarks: parameter.remarks
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
 * 更新收礼
 *
 * @author chadwuo
 */
exports.updateGiftReceive = async (parameter) => {
    try {
        await db.collection('gift_receive').updateOne({
            _id: parameter._id
        }, {
            $set: {
                friendId: parameter.friendId,
                bookId: parameter.bookId,
                title: parameter.title,
                date: parameter.date,
                money: Number(parameter.money),
                remarks: giftReceive.remarks
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
        await db.collection('gift_receive').deleteOne({
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