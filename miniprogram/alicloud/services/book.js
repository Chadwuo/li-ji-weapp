const app = getApp();
const {
  getUserDataScope
} = require('./user');

const db = app.mpserverless.db;
const userInfo = app.userInfo;

/**
 * 获取分页
 *
 * @author chadwuo
 */
exports.getBookPage = async (parameter) => {
  try {
    // 数据权限范围
    const dataScope = await getUserDataScope()
    const {
      result
    } = await db.collection('book').aggregate([{
        $match: {
          userId: {
            $in: dataScope
          }
        }
      },
      {
        $sort: {
          date: -1
        }
      },
      {
        $skip: ((parameter.page - 1) * parameter.limit)
      },
      {
        $limit: parameter.limit
      },
      {
        $lookup: { // 左连接
          from: "gift_receive", // 关联到de表
          localField: "_id", // 左表关联的字段
          foreignField: "bookId", // 右表关联的字段
          as: "giftList"
        }
      }
    ])
    return {
      success: true,
      data: result
    };
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
};

/**
 * 获取全部数据集合
 *
 * @author chadwuo
 */
exports.getBookList = async () => {
  try {
    // 数据权限范围
    const dataScope = await getUserDataScope()
    const MAX_LIMIT = 100
    // 先取出集合记录总数
    const {
      result: total
    } = await db.collection('book').count({
      userId: {
        $in: dataScope
      }
    })

    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('book').find({
        userId: _.in(dataScope)
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT)

      tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        message: acc.errMsg,
      }
    })
  } catch (error) {
    return {
      success: false,
      message: error,
    }
  }
};

/**
 * 获取礼簿
 *
 * @author chadwuo
 */
exports.getBook = async (parameter) => {
  try {
    const {
      result
    } = await db.collection('book').findOne({
      _id: parameter._id,
    })
    return {
      success: true,
      data: result
    };
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
};

/**
 * 添加礼簿
 *
 * @author chadwuo
 */
exports.addBook = async (parameter) => {
  try {
    const {
      result
    } = await db.collection('book').insertOne({
      userId: userInfo._id,
      date: parameter.date,
      title: parameter.title,
      remarks: parameter.remarks,
    })
    return {
      success: true,
      data: result.insertedId
    };
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
};

/**
 * 更新礼簿
 *
 * @author chadwuo
 */
exports.updateBook = async (parameter) => {
  try {
    await db.collection('book').updateOne({
      _id: parameter._id
    }, {
      $set: {
        title: parameter.title,
        date: parameter.date,
        remarks: parameter.remarks
      }
    })
    return {
      success: true,
      data: ''
    };
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
};

/**
 * 删除礼簿
 *
 * @author chadwuo
 */
exports.deleteBook = async (parameter) => {
  try {
    await db.collection('book').deleteOne({
      _id: parameter._id
    })
    return {
      success: true,
      data: ''
    };
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
};