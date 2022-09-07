const {
    db
} = require('../index');

/**
 * 获取家庭信息
 *
 * @author chadwuo
 */
exports.getFamily = async () => {
    try {
        const {
            userInfo
        } = getApp();
        // 获取家庭信息
        const {
            result
        } = await db.collection('family').findOne({
            _id: userInfo.familyId
        })
        return {
            success: true,
            data: result
        }
    } catch (error) {
        return {
            success: false,
            message: error
        };
    }
};

/**
 * 获取家庭及成员信息
 *
 * @author chadwuo
 */
exports.getFamilyInfo = async () => {
    try {
        const {
            userInfo
        } = getApp();
        // 获取家庭信息
        const {
            result: family
        } = await db.collection('family').findOne({
            _id: userInfo.familyId
        })

        // 获取家庭成员信息
        const {
            result: familyMembers
        } = await db.collection('family_member').aggregate([{
                $match: {
                    familyId: userInfo.familyId
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
    try {
        const {
            userInfo
        } = getApp();
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
            status: 1
        })

        // 更新自己的家庭id
        await db.collection('user').updateOne({
            _id: userInfo._id
        }, {
            $set: {
                familyId: _Id
            }
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
 * 申请加入家庭
 *
 * @author chadwuo
 */
exports.addFamilyMember = async (parameter) => {
    try {
        const {
            userInfo
        } = getApp();
        await db.collection('family_member').insertOne({
            userId: userInfo._id,
            familyId: parameter.familyId,
            relation: parameter.relation,
            status: 0 // 等待管理通过
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
 * 删除家庭成员
 *
 * @author chadwuo
 */
exports.delFamilyMember = async (parameter) => {
    try {
        await db.collection('family_member').deleteOne({
            _id: parameter._id
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
 * 审核家庭成员加入申请
 *
 * @author chadwuo
 */
exports.checkFamilyMember = async (parameter) => {
    try {
        // 修改状态
        await db.collection('family_member').updateOne({
            _id: parameter._id
        }, {
            $set: {
                status: 1
            }
        })

        // 更新成员的用户表中家庭id
        await db.collection('user').updateOne({
            _id: parameter.userId
        }, {
            $set: {
                familyId: parameter.familyId
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