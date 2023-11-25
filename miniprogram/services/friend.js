import pinyin from "wl-pinyin";
const app = getApp();

/**
 * 获取全部亲友数据集合
 *
 * @author chadwuo
 */
exports.getFriendList = async (parameter) => {
  wx.$api.get(`/todo/getFriendList`, parameter)
  return {
    success: true,
    data: [],
  };
};

/**
 * 获取亲友数据
 *
 * @author chadwuo
 */
exports.getFriend = async (parameter) => {
  wx.$api.get(`/todo/getFriend`, parameter)
  return {
    success: true,
    data: {},
  };
};

/**
 * 获取亲友来往数据
 *
 * @author chadwuo
 */
exports.getFriendGifts = async (parameter) => {
  wx.$api.get(`/todo/getFriendGifts`, parameter)
  return {
    success: true,
    data: {
      giftOutList: [],
      giftReceiveList: [],
    },
  };
};

/**
 * 添加亲友数据
 *
 * @author chadwuo
 */
exports.addFriend = async (parameter) => {
  wx.$api.get(`/todo/addFriend`, parameter)
  return {
    success: true,
    data: ``,
  };
};

/**
 * 更新亲友数据
 *
 * @author chadwuo
 */
exports.updateFriend = async (parameter) => {
  wx.$api.get(`/todo/updateFriend`, parameter)
  return {
    success: true,
    data: ``,
  };
};

/**
 * 删除亲友数据
 *
 * @author chadwuo
 */
exports.deleteFriend = async (parameter) => {
  wx.$api.get(`/todo/deleteFriend`, parameter)
  return {
    success: true,
    data: ``,
  };
};
