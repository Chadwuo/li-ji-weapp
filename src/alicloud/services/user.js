import mpserverless from "~/alicloud/releases";
import dayjs from 'dayjs';

// 获取用户信息
const getUserInfo = async () => {
    let res = await mpserverless.user.getInfo();

    if (!res.success) {
        return res
    }

    const loginUser = res.result;
    const db = mpserverless.db;

    res = await db.collection('user').findOne({
        _id: loginUser.userId
    })

    if (!res.success) {
        return res
    }

    let user = res.result;

    if (!user) {
        // 创建用户
        user = {
            _id: loginUser.userId,
            nickName: '微信用户',
            avatarUrl: '',
            isVip: false,
            oAuthUserId: loginUser.oAuthUserId,
            createdAt: dayjs(loginUser.createdAt).format(),
            lastSeenAt: dayjs(loginUser.lastSeenAt).format(),
        }

        res = await db.collection('user').insertOne(user);
    } else {
        res = await db.collection('user').updateOne({
            _id: loginUser.userId,
        }, {
            $set: {
                lastSeenAt: dayjs(loginUser.lastSeenAt).format(),
            },
        });
    }

    return res;
}

// 更新用户信息
const updateUser = async (parameter) => {
    const db = mpserverless.db;
    return await db.collection('user').updateOne({
        _id: parameter._id,
    }, {
        $set: {
            nickName: parameter.nickName,
            avatarUrl: parameter.avatarUrl,
        },
    });
}

const getUserDataScope = async (parameter) => {
    const db = mpserverless.db;
    // TODO: 获取用户数据权限
    console.log('object :>> ', parameter);

}

export {
    getUserInfo,
    updateUser,
    getUserDataScope,

}