const app = getApp();

/**
 * 获取用户信息
 * 如果没有会自动创建用户
 *
 * @author chadwuo
 */
exports.getUserInfo = async (parameter) => {
  return await wx.$api.get(`/users/${wx.$userId}`)
};

/**
 * 更新用户数据
 *
 * @author chadwuo
 */
exports.updateUserInfo = async (parameter) => {
  wx.$api.get(`/todo/updateUserInfo`, parameter)
  return [undefined, {
    success: true,
    data: "",
  }];
};

/**
 * 开启/关闭广告
 *
 * @author chadwuo
 */
exports.toggleADSet = async (parameter) => {
  wx.$api.get(`/todo/toggleADSet`, parameter)
  return [undefined, {
    success: true,
    data: "",
  }];
};