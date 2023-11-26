const app = getApp();

/**
 * 获取分页
 *
 * @author chadwuo
 */
exports.page = async (parameter) => {
  wx.$api.get(`/todo/page`, parameter)
  parameter.limit = parameter.limit || 20;
  parameter.page = parameter.page || 1;
  return [undefined, {
    success: true,
    data: [],
  }];
};

/**
 * 获取
 *
 * @author chadwuo
 */
exports.get = async (parameter) => {
  wx.$api.get(`/todo/get`, parameter)
  return [undefined, {
    success: true,
    data: [],
  }];
};

/**
 * 添加
 *
 * @author chadwuo
 */
exports.add = async (parameter) => {
  wx.$api.get(`/todo/add`, parameter)
  return [undefined, {
    success: true,
    data: ``,
  }];
};

/**
 * 更新
 *
 * @author chadwuo
 */
exports.update = async (parameter) => {
  wx.$api.get(`/todo/update`, parameter)
  return [undefined, {
    success: true,
    data: "",
  }];
};
