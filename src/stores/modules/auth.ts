import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken = ref<string>()
    const refreshToken = ref<string>()
    const userInfo = ref<Api.User>()
    const isLogin = computed(() => Boolean(accessToken.value))
    const isVip = computed(() => Boolean(userInfo.value?.accountType || false))

    const loadUserInfo = async () => {
      userInfo.value = await apiAuthUserInfoGet()
      return userInfo.value
    }

    return {
      accessToken,
      refreshToken,
      isLogin,
      isVip,
      userInfo,
      loadUserInfo,
    }
  },
  {
    persist: {
      pick: ['accessToken', 'refreshToken'],
    },
  },
)
