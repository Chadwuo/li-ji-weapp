import pinyin from "wl-pinyin";
const app = getApp();

/**
 * 获取全部亲友数据集合
 *
 * @author chadwuo
 */
exports.getFriendList = async (parameter) => {
  return wx.$api.get(`/friend`, parameter)
};

/**
 * 获取亲友数据
 *
 * @author chadwuo
 */
exports.getFriend = async (id) => {
  return wx.$api.get(`/friend/${id}`)
};

/**
 * 获取亲友来往数据
 *
 * @author chadwuo
 */
exports.getFriendGifts = async (parameter) => {
  return wx.$api.get(`/getFriendGifts`, parameter)
};

/**
 * 添加亲友数据
 *
 * @author chadwuo
 */
exports.addFriend = async (parameter) => {
  return wx.$api.post(`/friend`, parameter)
};

/**
 * 更新亲友数据
 *
 * @author chadwuo
 */
exports.updateFriend = async (id, parameter) => {
  return wx.$api.put(`/friend/${id}`, parameter)
};

/**
 * 删除亲友数据
 *
 * @author chadwuo
 */
exports.deleteFriend = async (id) => {
  return wx.$api.delete(`/friend/${id}`)
};
