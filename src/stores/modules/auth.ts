import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken = ref<string>()
    const refreshToken = ref<string>()
    const userInfo = ref<Api.User>()
    const userFamilys = ref<Api.UserFamily[]>()
    const userSubscription = ref<Api.UserSubscription>()

    const login = async () => {
      if (!accessToken.value) {
        const { code, errMsg } = await wx.login()
        if (code) {
          // 发起网络请求
          const res = await apiLoginPost(code)
          if (res.succeeded) {
            accessToken.value = res.data.accessToken
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
      accessToken,
      refreshToken,
      login,
      getUserInfo,
    }
  },
  {
    persist: {
      pick: ['accessToken', 'refreshToken'],
    },
  },
)
