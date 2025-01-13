import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken = ref<string>()
    const refreshToken = ref<string>()
    const userInfo = ref<Api.User>()
    const userFamilys = ref<Array<Api.UserFamily>>()
    const isLogin = computed(() => Boolean(accessToken.value))
    const login = async () => {
      const { code, errMsg } = await uni.login()
      if (code) {
        const res = await apiLoginPost(code)
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

    watch(userFamilys, async (newValue, oldValue) => {
      const newScope = Array.isArray(newValue) ? newValue.map(i => i.userId) : []
      const oldScope = Array.isArray(oldValue) ? oldValue.map(i => i.userId) : []

      // 如果新旧不一样，就刷新token
      if (newScope.join(',') !== oldScope.join(',')) {
        apiUserRefreshTokenGet()
      }
    }, {
      flush: 'post',
    })

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
    persist: true,
  },
)
