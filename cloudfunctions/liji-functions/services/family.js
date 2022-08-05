const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取用户家庭信息
exports.getInfo = async (event, context) => {
    try {
        const {
            userInfo
        } = event

        // 获取家庭信息
        const familyRes = await db.collection('family').doc(userInfo.familyId).get()

        // 获取家庭成员信息
        const familyInfoRes = await db.collection('familyInfo').aggregate()
            .match({
                familyId: userInfo.familyId,
            }).lookup({
                from: "user",
                localField: "userId",
                foreignField: "_Id",
                as: "user"
            })
            .end()

        return {
            success: true,
            data: {
                ...familyRes.result.data,
                familyInfo: familyInfoRes.result.data
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error
        };
    }
};

// 添加家庭
exports.add = async (event, context) => {
    try {
        const {
            data, userInfo
        } = event

        // 添加家庭
        const res = await db.collection('family').add(data)
        //  新增的记录 _id
        const _Id = res.result.data._id

        // 把自己添加为家庭管理员
        await db.collection('familyInfo').add({
            userId: userInfo._id,
            familyId: _Id,
            relation: '管理员',
            status: 1
        })

        // 更新自己的家庭id
        await db.collection('user').doc(userInfo._id).update({
            familyId: _Id
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

// 更新家庭
exports.update = async (event, context) => {
    try {
        const {
            data
        } = event

        // 更新家庭
        await db.collection('family').doc(data._id).update(data)

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

// 删除家庭
exports.delete = async (event, context) => {
    try {
        const {
            data
        } = event

        // 删除家庭
        await db.collection('family').doc(data._id).remove()
        // 删除家庭成员
        await db.collection('familyInfo').where({
            familyId: data._id
        }).remove()
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


// 添加家庭成员(申请加入家庭)
exports.addMember = async (event, context) => {
    try {
        const {
            data, userInfo
        } = event

        await db.collection('familyInfo').add({
            userId: userInfo._id,
            familyId: data.familyId,
            relation: data.relation,
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

// 删除家庭成员
exports.delMember = async (event, context) => {
    try {
        const {
            data
        } = event

        await db.collection('familyInfo').doc(data._id).remove()

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

// 审核家庭成员加入申请
exports.checkMember = async (event, context) => {
    try {
        const {
            data
        } = event

        // 修改状态
        await db.collection('familyInfo').doc(data._id).update({
            data: {
                status: 1
            }
        })
        // 更新成员的用户表中家庭id
        await db.collection('user').doc(data.userId).update({
            data: {
                familyId: data.familyId
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
