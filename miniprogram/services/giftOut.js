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
  parameter.limit = parameter.limit || 20;
  parameter.page = parameter.page || 1;
  return wx.$api.get(`/giftout`, parameter)
};

/**
 * 添加送礼
 *
 * @author chadwuo
 */
exports.addGiftOut = async (parameter) => {
  return wx.$api.post(`/giftout`, parameter)
};

/**
 * 更新送礼
 *
 * @author chadwuo
 */
exports.updateGiftOut = async (id, parameter) => {
  return wx.$api.put(`/giftout/${id}`, parameter)
};

/**
 * 删除送礼
 *
 * @author chadwuo
 */
exports.deleteGiftOut = async (id) => {
  return wx.$api.delete(`/giftout/${id}`)
};

/**
 * 详情
 *
 * @author chadwuo
 */
exports.getGiftOut = async (id) => {
  return wx.$api.get(`/giftout/${id}`)
};
