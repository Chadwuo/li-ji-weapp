import mpserverless from "~/alicloud/releases";
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
const { userInfo } = storeToRefs(useUserStore())
const db = mpserverless.db;

/**
 * 计算收礼金额总计
 *
 * @author chadwuo
 */
export const computedTotalGiftReceive = async () => {
    const res = await db.collection('gift_receive').aggregate([
        {
            $match: {
                userId: {
                    $in: dataScope,
                },
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: '$money',
                },
            },
        },
    ]);
    if (res.success) {
        res.data = result[0].total.toFixed(2)
    }
    return res
};
/**
 * 根据礼簿分页获取收礼数据
 *
 * @author chadwuo
 */
export const getGiftReceivePage = async (parameter) => {
    const { pageSize, pageNo } = parameter
    return await db.collection('gift_receive').aggregate([
        {
            $match: {
                userId: {
                    $in: dataScope,
                },
                bookId: parameter.bookId,
            },
        },
        {
            $sort: {
                money: -1,
                _id: 1,
            },
        },
        {
            $skip: (pageNo - 1) * pageSize,
        },
        {
            $limit: pageSize,
        },
        {
            $lookup: {
                // 左连接
                from: 'friend', // 关联到de表
                localField: 'friendId', // 左表关联的字段
                foreignField: '_id', // 右表关联的字段
                as: 'friendInfo',
            },
        },
        {
            $unwind: {
                // 拆分子数组
                path: '$friendInfo',
                preserveNullAndEmptyArrays: true, // 空的数组也拆分
            },
        },
    ]);
};

/**
 * 添加收礼
 *
 * @author chadwuo
 */
export const addGiftReceive = async (parameter) => {
    // 参数中没有亲友id
    if (!parameter.friendId) {
        parameter.friendName = parameter.friendName.trim();
        // 根据亲友名查询库中是否存在
        const { result: friend } = await db.collection('friend').findOne({
            userId: {
                $in: dataScope,
            },
            name: parameter.friendName,
        });

        if (friend && friend._id) {
            // 存在
            parameter.friendId = friend._id;
        } else {
            // 添加
            const { result: newFriend } = await db.collection('friend').insertOne({
                userId: userInfo._id,
                name: parameter.friendName,
                firstLetter: pinyin.getFirstLetter(parameter.friendName.substr(0, 1)),
            });
            // 新添加的亲友id
            parameter.friendId = newFriend.insertedId;
        }
    }

    return await db.collection('gift_receive').insertOne({
        userId: userInfo._id,
        friendId: parameter.friendId,
        bookId: parameter.bookId,
        money: Number(parameter.money),
        remarks: parameter.remarks,
    });
};

/**
 * 更新收礼
 *
 * @author chadwuo
 */
export const updateGiftReceive = async (parameter) => {
    return await db.collection('gift_receive').updateOne(
        {
            _id: parameter._id,
        },
        {
            $set: {
                friendId: parameter.friendId,
                bookId: parameter.bookId,
                money: Number(parameter.money),
                remarks: parameter.remarks,
            },
        }
    );
};

/**
 * 删除收礼
 *
 * @author chadwuo
 */
export const deleteGiftReceive = async (parameter) => {
    return await db.collection('gift_receive').deleteOne({
        _id: parameter._id,
    });
};

/**
 * 详情
 *
 * @author chadwuo
 */
export const getGiftOut = async (parameter) => {
    return await db.collection("gift_receive").findOne({
        _id: parameter._id,
    });
};