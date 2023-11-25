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
 * 获取礼簿详情
 *
 * @author chadwuo
 */
exports.getBook = async (id) => {
  return wx.$api.get(`/books/${id}`)
};

/**
 * 更新礼簿
 *
 * @author chadwuo
 */
exports.updateBook = async (id, parameter) => {
  return wx.$api.put(`/books/${id}`, parameter)
};

/**
 * 删除礼簿
 *
 * @author chadwuo
 */
exports.deleteBook = async (id) => {
  wx.$api.delete(`/books/${id}`)
  return {
    success: true,
    data: '',
  };
};
