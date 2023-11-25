import pinyin from 'wl-pinyin';
const app = getApp();

/**
 * 计算送礼金额总计
 *
 * @author chadwuo
 */
exports.computedTotalGiftOut = async (parameter) => {
  return wx.$api.get(`/computedTotalGiftOut`, parameter);
};

/**
 * 分页获取送礼
 *
 * @author chadwuo
 */
exports.getGiftOutPage = async (parameter) => {
  wx.$api.get(`/todo/getGiftOutPage`, parameter)
  parameter.limit = parameter.limit || 20;
  parameter.page = parameter.page || 1;
  return {
    success: true,
    data: [],
  };
};

/**
 * 添加送礼
 *
 * @author chadwuo
 */
exports.addGiftOut = async (parameter) => {
  wx.$api.get(`/todo/addGiftOut`, parameter)
  return {
    success: true,
    data: ``,
  };
};

/**
 * 更新送礼
 *
 * @author chadwuo
 */
exports.updateGiftOut = async (parameter) => {
  wx.$api.get(`/todo/updateGiftOut`, parameter)
  return {
    success: true,
    data: '',
  };
};

/**
 * 删除送礼
 *
 * @author chadwuo
 */
exports.deleteGiftOut = async (parameter) => {
  wx.$api.get(`/todo/deleteGiftOut`, parameter)
  return {
    success: true,
    data: '',
  };
};

/**
 * 详情
 *
 * @author chadwuo
 */
exports.getGiftOut = async (parameter) => {
  wx.$api.get(`/todo/getGiftOut`, parameter)
  return {
    success: true,
    data: [],
  };
};
