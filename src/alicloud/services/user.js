import mpserverless from "~/alicloud/index";
import dayjs from 'dayjs';
import { useUserStore } from '~/stores/user'

const db = mpserverless.db;

/**
 * 获取用户信息
 * 如果没有会自动创建用户
 *
 * @author chadwuo
 */
export const getUserInfo = async () => {
    let res = await mpserverless.user.getInfo();
    if (!res.success) {
        return res
    }

    const loginUser = res.result;

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

    res.data = user;
    return res;
}

/**
 * 更新用户数据
 *
 * @author chadwuo
 */
export const updateUser = async (parameter) => {
    return await db.collection('user').updateOne({
        _id: parameter._id,
    }, {
        $set: {
            nickName: parameter.nickName,
            avatarUrl: parameter.avatarUrl,
        },
    });
}

/**
 * 获取用户数据范围
 *
 * @author chadwuo
 */
export const getUserDataScope = async () => {
    const { userInfo } = useUserStore()
    // 获取家庭信息
    const {
        result: familyMember
    } = await db.collection('family_member').findOne({
        userId: userInfo._id,
    });

    // 没有加入家庭，就返回自己的id
    if (!familyMember) {
        userInfo.dataScope = [userInfo._id];
        return;
    }

    // 获取家庭其他成员信息
    const {
        result: familyInfos
    } = await db.collection('family_member').find({
        familyId: familyMember.familyId,
    });

    let dataScope = familyInfos.map((i) => {
        return i.userId;
    });

    if (dataScope && dataScope.length > 0) {
        userInfo.dataScope = dataScope;
    }
}
