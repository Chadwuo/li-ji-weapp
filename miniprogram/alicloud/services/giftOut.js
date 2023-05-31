import pinyin from 'wl-pinyin';
const app = getApp();

/**
 * 计算送礼金额总计
 *
 * @author chadwuo
 */
exports.computedTotalGiftOut = async () => {
  const db = app.mpserverless.db;
  const dataScope = app.userDataScope;
  try {
    const { result } = await db.collection('gift_out').aggregate([
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
    let { total } = result[0];
    return {
      success: true,
      data: total.toFixed(2),
    };
  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
};

/**
 * 分页获取送礼
 *
 * @author chadwuo
 */
exports.getGiftOutPage = async (parameter) => {
  parameter.limit = parameter.limit || 20;
  parameter.page = parameter.page || 1;
  const db = app.mpserverless.db;
  const dataScope = app.userDataScope;
  try {
    const { result } = await db.collection('gift_out').aggregate([
      {
        $match: {
          userId: {
            $in: dataScope,
          },
        },
      },
      {
        $sort: {
          date: -1,
          _id: 1,
        },
      },
      {
        $skip: (parameter.page - 1) * parameter.limit,
      },
      {
        $limit: parameter.limit,
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
    return {
      success: true,
      data: result,
    };
  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
};

/**
 * 添加送礼
 *
 * @author chadwuo
 */
exports.addGiftOut = async (parameter) => {
  const userInfo = app.userInfo;
  const db = app.mpserverless.db;
  const dataScope = app.userDataScope;
  try {
    // 参数中没有亲友id，添加先
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

    const { result } = await db.collection('gift_out').insertOne({
      userId: userInfo._id,
      friendId: parameter.friendId,
      title: parameter.title,
      icon: parameter.icon,
      date: parameter.date,
      money: Number(parameter.money),
      remarks: parameter.remarks,
    });
    return {
      success: true,
      data: result.insertedId,
    };
  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
};

/**
 * 更新送礼
 *
 * @author chadwuo
 */
exports.updateGiftOut = async (parameter) => {
  const db = app.mpserverless.db;
  try {
    await db.collection('gift_out').updateOne(
      {
        _id: parameter._id,
      },
      {
        $set: {
          friendId: parameter.friendId,
          title: parameter.title,
          icon: parameter.icon,
          date: parameter.date,
          money: Number(parameter.money),
          remarks: parameter.remarks,
        },
      }
    );
    return {
      success: true,
      data: '',
    };
  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
};

/**
 * 删除送礼
 *
 * @author chadwuo
 */
exports.deleteGiftOut = async (parameter) => {
  const db = app.mpserverless.db;
  try {
    await db.collection('gift_out').deleteOne({
      _id: parameter._id,
    });
    return {
      success: true,
      data: '',
    };
  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
};
