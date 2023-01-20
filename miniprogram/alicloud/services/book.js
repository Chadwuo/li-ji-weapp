const app = getApp()

/**
 * 获取分页
 *
 * @author chadwuo
 */
exports.getBookPage = async (parameter) => {
  const db = app.mpserverless.db;
  const dataScope = app.userDataScope
  try {
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
      { // TODO 需要修改
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
  const db = app.mpserverless.db;
  const dataScope = app.userDataScope
  try {
    const {
      result
    } = await db.collection('book').find({
      userId: {
        $in: dataScope
      }
    })

    return {
      success: true,
      data: result
    };
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
  const db = app.mpserverless.db;
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
  const userInfo = app.userInfo
  const db = app.mpserverless.db;
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
  const db = app.mpserverless.db;
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
  const db = app.mpserverless.db;
  try {
    await db.collection('book').deleteOne({
      _id: parameter._id
    })
    // 删除礼簿下所有收礼记录
    await db.collection('gift_receive').deleteMany({
      bookId: parameter._id
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