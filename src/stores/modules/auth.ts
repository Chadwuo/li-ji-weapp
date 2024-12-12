import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref('')
    const refreshToken = ref('')
    const userInfo = ref<Api.User.UserInfo>()
    const userFamilys = ref<Api.User.UserFamily[]>()
    const userSubscription = ref<Api.User.UserSubscription>()

    const login = async () => {
      if (!token.value) {
        const { code, errMsg } = await wx.login()
        if (code) {
          // 发起网络请求
          const res = await apiLoginPost(code)
          if (res.succeeded) {
            token.value = res.data.token
            refreshToken.value = res.data.refreshToken
          }
          else {
            throw new Error(res.errors)
          }
        }
        else {
          throw new Error(errMsg)
        }
      }
    }

    const getUserInfo = async () => {
      const res = await apiUserInfoGet()
      if (res.succeeded) {
        userInfo.value = res.data.userInfo
        userFamilys.value = res.data.userFamilys
        userSubscription.value = res.data.userSubscription
      }
      else {
        throw new Error(res.errors)
      }
    }

    return {
      userInfo,
      token,
      refreshToken,
      login,
      getUserInfo,
    }
  },
  {
    persist: {
      pick: ['token'],
    },
  },
)
