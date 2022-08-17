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
        const {
            result
        } = db.collection('gift_out')
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
 * 分页获取送礼
 *
 * @author chadwuo
 */
exports.getGiftOutPage = async (parameter) => {
    try {
        // 数据权限范围
        const dataScope = await getUserDataScope()
        const {
            result
        } = await db.collection('gift_out').aggregate([{
                $match: {
                    userId: {
                        $in: dataScope
                    }
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
 * 添加送礼
 *
 * @author chadwuo
 */
exports.addGiftOut = async (parameter) => {
    try {
        // 参数中没有亲友id，添加先
        if (!parameter.friendId) {
            const {
                result
            } = await db.collection('friend').insertOne({
                userId: userInfo._id,
                name: parameter.friendName,
                firstLetter: parameter.friendFirstLetter
            })
            // 新添加的亲友id
            giftOut.friendId = result._id
        }

        const {
            result
        } = await db.collection('gift_out').insertOne({
            userId: userInfo._id,
            friendId: parameter.friendId,
            title: parameter.title,
            date: parameter.date,
            money: parameter.money,
            remarks: parameter.remarks
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
        await db.collection('gift_out').updateOne({
            _id: parameter._id
        }, {
            $set: {
                friendId: parameter.friendId,
                title: parameter.title,
                date: parameter.date,
                money: parameter.money,
                remarks: giftOut.remarks
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
        await db.collection('gift_out').deleteOne({
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