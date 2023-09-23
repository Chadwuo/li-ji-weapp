const app = getApp();

/**
 * 获取分页
 *
 * @author chadwuo
 */
exports.page = async (parameter) => {
  parameter.limit = parameter.limit || 20;
  parameter.page = parameter.page || 1;
  const db = app.mpserverless.db;
  try {
    const { result } = await db.collection("sponsor").aggregate([
      {
        $sort: {
          count: -1,
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
          from: "user", // 关联到de表
          localField: "userId", // 左表关联的字段
          foreignField: "_id", // 右表关联的字段
          as: "user",
        },
      },
      {
        $unwind: {
          // 拆分子数组
          path: "$user",
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
 * 获取
 *
 * @author chadwuo
 */
exports.get = async () => {
  const db = app.mpserverless.db;
  const userInfo = app.userInfo;
  try {
    const { result } = await db.collection("sponsor").findOne({
      userId: userInfo._id,
    });
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
 * 添加
 *
 * @author chadwuo
 */
exports.add = async (parameter) => {
  const userInfo = app.userInfo;
  const db = app.mpserverless.db;
  try {
    const { result } = await db.collection("sponsor").insertOne({
      userId: userInfo._id,
      count: parameter.count,
      date: Date.now(),
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
 * 更新
 *
 * @author chadwuo
 */
exports.update = async (parameter) => {
  const db = app.mpserverless.db;
  try {
    await db.collection("sponsor").updateOne(
      {
        _id: parameter._id,
      },
      {
        $set: {
          count: parameter.count,
          date: Date.now(),
        },
      }
    );
    return {
      success: true,
      data: "",
    };
  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
};
