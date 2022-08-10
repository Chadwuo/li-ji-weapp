const {
    alicloud
} = getApp();

/**
 * 获取用户信息
 * 如果没有会自动创建用户
 *
 * @author micahh
 */
export async function getUserInfo() {
    try {
        const res = await alicloud.user.getInfo()
        if (res.success) {
            const userId = res.result.userId // Serverless平台生成的用户ID
            let user = await alicloud.db.collection('user').findOne({
                _id: userId
            })
            if (!user) {
                // 创建用户
                user = {
                    _id: userId,
                    familyId: '',
                    isVip: false
                }
                await alicloud.db.collection('user').insertOne(user)
            }
            return {
                success: true,
                data: user
            }
        }
        return {
            success: false,
            message: '操作失败'
        }
    } catch (e) {
        return {
            success: false,
            message: e
        };
    }
}