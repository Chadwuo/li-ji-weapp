import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref("");
    const refreshToken = ref("");
    const userInfo = ref<Api.User.UserInfo>();
    const userFamilys = ref<Api.User.UserFamily[]>();
    const userSubscription = ref<Api.User.UserSubscription>();

    const login = async () => {
      try {
        if (!token.value) {
          const { code, errMsg } = await wx.login();
          if (code) {
            //发起网络请求
            const { result } = await apiLoginPost(code);
            token.value = result.token;
            refreshToken.value = result.refreshToken;
          } else {
            throw new Error(errMsg);
          }
        }

        const { result } = await apiUserInfoGet();
        userInfo.value = result.userInfo;
        userFamilys.value = result.userFamilys;
        userSubscription.value = result.userSubscription;
      } catch (error) {
        throw error;
      }
    };

    return {
      userInfo,
      token,
      refreshToken,
      login,
    };
  },
  {
    persist: true,
  }
);
