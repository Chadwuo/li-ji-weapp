import { friendCategory } from '@/constants/app'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken = ref<string>()
    const refreshToken = ref<string>()
    const userFamilys = ref<Array<Api.UserFamily>>()
    const userInfo = ref<Api.User>()
    const friendTags = ref<Array<Api.FriendTag>>([])
    const isLogin = computed(() => Boolean(accessToken.value))
    const friendTagPickerColumns = computed(() => {
      return [...friendCategory.map(item => ({ label: item, value: item })), ...friendTags.value.map(item => ({ label: item.name, value: item.name }))]
    })
    const friendTabsList = computed(() => {
      return [{ name: '全部', value: '' }, ...friendCategory.map(item => ({ name: item, value: item })), ...friendTags.value.map(item => ({ name: item.name, value: item.name }))]
    })

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

    const logout = () => {
      uni.clearStorageSync()

      const pages = getCurrentPages()
      if (pages.at(-1)?.route !== 'pages/welcome/index') {
        uni.navigateTo({
          url: '/pages/welcome/index',
        })
      }
    }

    const setupApp = async () => {
      const res = await apiUserInfoGet()
      if (res.succeeded && res.data) {
        userInfo.value = res.data
      }
      else {
        throw new Error(JSON.stringify(res.errors || 'Request Error.'))
      }

      apiUserFamilyListGet().then((res) => {
        if (res.succeeded && res.data) {
          userFamilys.value = res.data
        }
      })

      apiFriendTagListGet().then((res) => {
        if (res.succeeded && res.data) {
          friendTags.value = res.data
        }
      })
    }

    return {
      accessToken,
      refreshToken,
      isLogin,
      userInfo,
      userFamilys,
      friendTags,
      friendTagPickerColumns,
      friendTabsList,
      login,
      logout,
      setupApp,
    }
  },
  {
    persist: {
      pick: ['accessToken', 'refreshToken'],
    },
  },
)
