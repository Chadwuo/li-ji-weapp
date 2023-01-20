const app = getApp();

/**
 * 获取家庭及成员信息
 *
 * @author chadwuo
 */
exports.getFamilyInfo = async () => {
    const userInfo = app.userInfo
    const db = app.mpserverless.db;
    try {
        // 获取当前用户的家庭成员信息
        const {
            result: memberInfo
        } = await db.collection('family_member').findOne({
            userId: userInfo._id
        })

        // 没有加入家庭
        if (!memberInfo) {
            return {
                success: true,
                data: ''
            }
        }

        // 获取家庭成员信息
        const {
            result: familyMembers
        } = await db.collection('family_member').aggregate([{
                $match: {
                    familyId: memberInfo.familyId
                }
            },
            {
                $lookup: {
                    from: "user",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: { // 拆分子数组
                    path: "$user",
                    preserveNullAndEmptyArrays: true // 空的数组也拆分
                }
            }
        ])

        // 获取家庭信息
        const {
            result: family
        } = await db.collection('family').findOne({
            _id: memberInfo.familyId
        })

        return {
            success: true,
            data: {
                ...family,
                familyMembers
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error
        };
    }
};

/**
 * 添加家庭
 *
 * @author chadwuo
 */
exports.addFamily = async (parameter) => {
    const userInfo = app.userInfo
    const db = app.mpserverless.db;
    try {
        // 添加家庭
        const {
            result
        } = await db.collection('family').insertOne({
            userId: userInfo._id,
            name: parameter.name
        })
        //  新增的记录 _id
        const _Id = result.insertedId

        // 把自己添加为家庭管理员
        await db.collection('family_member').insertOne({
            userId: userInfo._id,
            familyId: _Id,
            relation: '管理员',
        })

        return {
            success: true,
            data: _Id
        }
    } catch (error) {
        return {
            success: false,
            message: error
        };
    }
};

/**
 * 更新家庭
 *
 * @author chadwuo
 */
exports.updateFamily = async (parameter) => {
    const db = app.mpserverless.db;
    try {
        // 更新家庭
        await db.collection('family').updateOne({
            _id: parameter._id
        }, {
            $set: {
                name: parameter.name
            }
        })

        return {
            success: true,
            data: ''
        }
    } catch (error) {
        return {
            success: false,
            message: error
        };
    }
};

/**
 * 删除家庭
 *
 * @author chadwuo
 */
exports.deleteFamily = async (parameter) => {
    const db = app.mpserverless.db;
    try {
        // 删除家庭
        await db.collection('family').deleteOne({
            _id: parameter._id
        })
        // 删除家庭成员
        await db.collection('family_member').deleteMany({
            familyId: parameter._id
        })
        return {
            success: true,
            data: ''
        }
    } catch (error) {
        return {
            success: false,
            message: error
        };
    }
};

/**
 * 加入某个家庭
 *
 * @author chadwuo
 */
exports.joinFamily = async (parameter) => {
    const userInfo = app.userInfo
    const db = app.mpserverless.db
    try {
        await db.collection('family_member').insertOne({
            userId: userInfo._id,
            familyId: parameter.familyId,
            relation: parameter.relation,
        })

        return {
            success: true,
            data: ''
        }
    } catch (error) {
        return {
            success: false,
            message: error
        };
    }
};


/**
 * 用户是否已经加入家庭
 *
 * @author chadwuo
 */
exports.isExistFamily = async () => {
    const userInfo = app.userInfo
    const db = app.mpserverless.db
    try {
        const {
            affectedDocs
        } = await db.collection('family_member').findOne({
            userId: userInfo._id
        })
        return {
            success: true,
            data: affectedDocs == 1 ? true : false
        }
    } catch (error) {
        return {
            success: false,
            message: error
        };
    }
};

/**
 * 删除家庭成员
 *
 * @author chadwuo
 */
exports.delFamilyMember = async (parameter) => {
    const db = app.mpserverless.db;
    try {
        await db.collection('family_member').deleteOne({
            _id: parameter._id
        })

        // 更新自己用户表中家庭id
        await db.collection('user').updateOne({
            _id: parameter.userId
        }, {
            $set: {
                familyId: ''
            }
        })

        return {
            success: true,
            data: ''
        }
    } catch (error) {
        return {
            success: false,
            message: error
        };
    }
};