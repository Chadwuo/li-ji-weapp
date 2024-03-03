import mpserverless from "~/alicloud";
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
const { userInfo } = storeToRefs(useUserStore())
const db = mpserverless.db;

/**
 * 获取家庭及成员信息
 *
 * @author chadwuo
 */
export const getFamilyInfo = async () => {
  // TODO
};

/**
 * 添加家庭
 *
 * @author chadwuo
 */
export const addFamily = async (parameter) => {
  // TODO
};

/**
 * 更新家庭
 *
 * @author chadwuo
 */
export const updateFamily = async (parameter) => {
  // TODO
};

/**
 * 删除家庭
 *
 * @author chadwuo
 */
export const deleteFamily = async (parameter) => {
  // TODO
};

/**
 * 加入某个家庭
 *
 * @author chadwuo
 */
export const joinFamily = async (parameter) => {
  // TODO
};

/**
 * 删除家庭成员
 *
 * @author chadwuo
 */
export const delFamilyMember = async (parameter) => {
  // TODO
};