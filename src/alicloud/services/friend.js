import mpserverless from "~/alicloud/releases";
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
const { userInfo } = storeToRefs(useUserStore())
const db = mpserverless.db;

/**
 * 获取全部亲友数据集合
 *
 * @author chadwuo
 */
export const getFriendList = async (parameter) => {
    const searchValue = parameter?.searchValue || '';
    return await db.collection("friend").find({
        $and: [
            {
                name: {
                    $regex: searchValue,
                },
            },
            {
                userId: {
                    $in: dataScope,
                },
            },
        ],
    });
};

/**
 * 获取亲友数据
 *
 * @author chadwuo
 */
export const getFriend = async (parameter) => {
    return await db.collection("friend").findOne({
        _id: parameter._id,
    });
};

/**
 * 获取亲友来往数据
 *
 * @author chadwuo
 */
export const getFriendGifts = async (parameter) => {
    const { result } = await db.collection("friend").findOne({
        _id: parameter._id,
    });
    // 送礼集合
    const { result: giftOutList } = await db.collection("gift_out").find({
        friendId: parameter._id,
    });
    // 收礼集合
    const { result: giftReceiveList } = await db
        .collection("gift_receive")
        .aggregate([
            {
                $match: {
                    friendId: parameter._id,
                },
            },
            {
                $sort: {
                    date: -1,
                },
            },
            {
                $lookup: {
                    // 左连接
                    from: "book", // 关联到de表
                    localField: "bookId", // 左表关联的字段
                    foreignField: "_id", // 右表关联的字段
                    as: "bookInfo",
                },
            },
            {
                $unwind: {
                    // 拆分子数组
                    path: "$bookInfo",
                    preserveNullAndEmptyArrays: true, // 空的数组也拆分
                },
            },
        ]);
    return {
        success: true,
        result: {
            ...result,
            giftOutList,
            giftReceiveList,
        },
    };
};

/**
 * 添加亲友数据
 *
 * @author chadwuo
 */
export const addFriend = async (parameter) => {
    return await db.collection("friend").insertOne({
        userId: userInfo.value._id,
        name: parameter.name.trim(),
        firstLetter: pinyin.getFirstLetter(parameter.name.substr(0, 1)),
        relation: parameter.relation,
        remarks: parameter.remarks,
    });
};

/**
 * 更新亲友数据
 *
 * @author chadwuo
 */
export const updateFriend = async (parameter) => {
    return await db.collection("friend").updateOne(
        {
            _id: parameter._id,
        },
        {
            $set: {
                name: parameter.name.trim(),
                firstLetter: pinyin.getFirstLetter(parameter.name.substr(0, 1)),
                relation: parameter.relation,
                remarks: parameter.remarks,
            },
        }
    );
};

/**
 * 删除亲友数据
 *
 * @author chadwuo
 */
export const deleteFriend = async (parameter) => {
    // 删除亲友下所有送礼记录
    await db.collection("gift_out").deleteMany({
        friendId: parameter._id,
    });

    // 删除亲友下所有收礼记录
    await db.collection("gift_receive").deleteMany({
        friendId: parameter._id,
    });


    // 删除亲友
    return await db.collection("friend").deleteOne({
        _id: parameter._id,
    });
};