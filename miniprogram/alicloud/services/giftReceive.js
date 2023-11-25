import pinyin from 'wl-pinyin';
const app = getApp();

/**
 * 计算收礼金额总计
 *
 * @author chadwuo
 */
exports.computedTotalGiftReceive = async (parameter) => {
  return wx.$api.get(`/computedTotalGiftReceive`, parameter)
};
/**
 * 根据礼簿分页获取收礼数据
 *
 * @author chadwuo
 */
exports.getGiftReceivePage = async (parameter) => {
  wx.$api.get(`/todo/getGiftReceivePage`, parameter)
  parameter.limit = parameter.limit || 20;
  parameter.page = parameter.page || 1;
  return {
    success: true,
    data: [],
  };
};

/**
 * 添加收礼
 *
 * @author chadwuo
 */
exports.addGiftReceive = async (parameter) => {
  wx.$api.get(`/todo/addGiftReceive`, parameter)
  return {
    success: true,
    data: '',
  };
};

/**
 * 更新收礼
 *
 * @author chadwuo
 */
exports.updateGiftReceive = async (parameter) => {
  wx.$api.get(`/todo/updateGiftReceive`, parameter)
  return {
    success: true,
    data: '',
  };
};

/**
 * 删除收礼
 *
 * @author chadwuo
 */
exports.deleteGiftReceive = async (parameter) => {
  wx.$api.get(`/todo/deleteGiftReceive`, parameter)
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