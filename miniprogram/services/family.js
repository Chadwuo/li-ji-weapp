const app = getApp();

/**
 * 获取家庭及成员信息
 *
 * @author chadwuo
 */
exports.getFamilyInfo = async (parameter) => {
  wx.$api.get(`/todo/getFamilyInfo`, parameter)
  return {
    success: true,
    data: '',
  };
};

/**
 * 添加家庭
 *
 * @author chadwuo
 */
exports.addFamily = async (parameter) => {
  wx.$api.get(`/todo/addFamily`, parameter)
  return {
    success: true,
    data: ``,
  };
};

/**
 * 更新家庭
 *
 * @author chadwuo
 */
exports.updateFamily = async (parameter) => {
  wx.$api.get(`/todo/updateFamily`, parameter)
  return {
    success: true,
    data: '',
  };
};

/**
 * 删除家庭
 *
 * @author chadwuo
 */
exports.deleteFamily = async (parameter) => {
  wx.$api.get(`/todo/deleteFamily`, parameter)
  return {
    success: true,
    data: '',
  };
};

/**
 * 加入某个家庭
 *
 * @author chadwuo
 */
exports.joinFamily = async (parameter) => {
  wx.$api.get(`/todo/joinFamily`, parameter)
  return {
    success: true,
    data: '',
  };
};

/**
 * 用户是否已经加入家庭
 *
 * @author chadwuo
 */
exports.isExistFamily = async (parameter) => {
  wx.$api.get(`/todo/isExistFamily`, parameter)
  return {
    success: true,
    data: false,
  };
};

/**
 * 删除家庭成员
 *
 * @author chadwuo
 */
exports.delFamilyMember = async (parameter) => {
  wx.$api.get(`/todo/delFamilyMember`, parameter)
  return {
    success: true,
    data: '',
  };
};
