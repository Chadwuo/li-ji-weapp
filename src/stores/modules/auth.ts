import { apiWxOpenLoginPost } from '@/api'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken = ref<string>()
    const refreshToken = ref<string>()
    const userFamilys = ref<Array<Api.UserFamily>>()
    const userInfo = ref<Api.User>()
    const isLogin = computed(() => Boolean(accessToken.value))

    const login = async () => {
      // #ifdef MP-WEIXIN
      const { code, errMsg } = await uni.login()
      if (code) {
        const res = await apiWxOpenLoginPost(code)
        if (res.succeeded && res.data) {
          accessToken.value = res.data.accessToken
          refreshToken.value = res.data.refreshToken
        }
        else {
          throw new Error(JSON.stringify(res.errors || 'Login Error.'))
        }
      }
      else {
        throw new Error(errMsg)
      }
      // #endif
    }

    const getUserInfo = async () => {
      const res = await apiUserInfoGet()
      if (res.succeeded && res.data) {
        userInfo.value = res.data.userInfo
        userFamilys.value = res.data.userFamilys
      }
      else {
        throw new Error(JSON.stringify(res.errors || 'Request Error.'))
      }
    }

    return {
      isLogin,
      userInfo,
      userFamilys,
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
