import pinyin from "wl-pinyin";
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
        const {
            result
        } = await db.collection('friend').find({
            userId: {
                $in: dataScope
            }
        })

        return {
            success: true,
            data: result
        };
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
        const {
            result
        } = await db.collection('friend').findOne({
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
 * 获取亲友来往数据
 *
 * @author chadwuo
 */
exports.getFriendGifts = async (parameter) => {
    try {
        const {
            result
        } = await db.collection('friend').findOne({
            _id: parameter._id,
        })
        // 送礼集合
        const {
            result: giftOutList
        } = await db.collection('gift_out').find({
            friendId: parameter._id,
        })
        // 收礼集合
        const {
            result: giftReceiveList
        } = await db.collection('gift_receive').find({
            friendId: parameter._id,
        })
        return {
            success: true,
            data: {
                ...result,
                giftOutList,
                giftReceiveList
            }
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
        const {
            result
        } = await db.collection('friend').insertOne({
            userId: userInfo._id,
            name: parameter.name,
            fristLetter: pinyin.getFirstLetter(parameter.name.substr(0, 1)),
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
 * 更新亲友数据
 *
 * @author chadwuo
 */
exports.updateFriend = async (parameter) => {
    try {
        await db.collection('friend').updateOne({
            _id: parameter._id
        }, {
            $set: {
                name: parameter.name,
                fristLetter: pinyin.getFirstLetter(parameter.name.substr(0, 1)),
                remarks: parameter.remarks
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