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
  parameter.limit = parameter.limit || 20;
  parameter.page = parameter.page || 1;
  return wx.$api.get(`/gift`, parameter)
};

/**
 * 添加收礼
 *
 * @author chadwuo
 */
exports.addGiftReceive = async (parameter) => {
  return wx.$api.post(`/gift`, parameter)
};

/**
 * 更新收礼
 *
 * @author chadwuo
 */
exports.updateGiftReceive = async (id, parameter) => {
  return wx.$api.put(`/gift/${id}`, parameter)
};

/**
 * 删除收礼
 *
 * @author chadwuo
 */
exports.deleteGiftReceive = async (id) => {
  return wx.$api.delete(`/gift/${id}`)
};

/**
 * 详情
 *
 * @author chadwuo
 */
exports.getGiftOut = async (id) => {
  return wx.$api.get(`/gift/${id}`)
};