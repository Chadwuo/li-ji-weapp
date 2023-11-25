/**
 * 获取分页
 *
 * @author chadwuo
 */
exports.getBookPage = async (parameter) => {
  parameter.limit = parameter.limit || 20;
  parameter.page = parameter.page || 1;
  parameter.userId = wx.$userId
  return wx.$api.get(`/books`, parameter)
};

/**
 * 添加礼簿
 *
 * @author chadwuo
 */
exports.addBook = async (parameter) => {
  return wx.$api.post(`/books`, {
    userId: wx.$userId,
    date: parameter.date,
    title: parameter.title,
    remarks: parameter.remarks,
  })
};

/**
 * 更新礼簿
 *
 * @author chadwuo
 */
exports.updateBook = async (parameter) => {
  wx.$api.get(`/todo/updateBook`, parameter)
  return {
    success: true,
    data: '',
  };
};

/**
 * 删除礼簿
 *
 * @author chadwuo
 */
exports.deleteBook = async (parameter) => {
  wx.$api.get(`/todo/deleteBook`, parameter)
  return {
    success: true,
    data: '',
  };
};
