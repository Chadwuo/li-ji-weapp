const app = getApp();
const db = app.mpserverless.db;

/**
 * 获取分页
 *
 * @author chadwuo
 */
exports.getIssuePage = async (parameter) => {
  try {
    const {
      result
    } = await db.collection('issue').find({}, {
      sort: {
        createTime: -1
      },
      skip: (parameter.page - 1) * parameter.limit,
      limit: parameter.limit,
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
 * 添加
 *
 * @author chadwuo
 */
exports.addIssue = async (parameter) => {
  try {
    const {
      result
    } = await db.collection('issue').insertOne({
      createTime: new Date(),
      title: parameter.title,
      content: parameter.content
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
 * 更新
 *
 * @author chadwuo
 */
exports.updateIssue = async (parameter) => {
  try {
    await db.collection('issue').updateOne({
      _id: parameter._id
    }, {
      $set: {
        reply: parameter.reply,
        replyTime: new Date(),
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
 * 删除
 *
 * @author chadwuo
 */
exports.deleteIssue = async (parameter) => {
  try {
    await db.collection('issue').deleteOne({
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