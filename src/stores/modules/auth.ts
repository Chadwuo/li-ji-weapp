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
    const isVip = computed(() => Boolean(userInfo.value?.accountType || false))
    const vipLevel = computed(() => {
      switch (userInfo.value?.accountType) {
        case 1:
          return {
            name: '创始会员',
            color: 'text-[#B8860B]',
            bg: 'https://liji.poemcode.cn/oss/assets/subscription/vip_pro_bg.webp',
            text: '仅限百席，献给敢于梦想的⌜创始人⌟',
          }
        case 2:
          return {
            name: '赠送会员',
            color: 'text-[#B8860B]',
            bg: 'https://liji.poemcode.cn/oss/assets/subscription/vip_free_bg.webp',
            text: '专属礼遇，馈赠予重要伙伴的特殊权益',
          }
        case 9:
          return {
            name: '永久会员',
            color: 'text-[#B8860B]',
            bg: 'https://liji.poemcode.cn/oss/assets/subscription/vip_svip_bg.webp',
            text: '终身尊享，解锁平台无期限的特权礼遇',
          }
        default:
          return {
            name: '普通用户',
            color: 'text-gray',
            bg: 'https://liji.poemcode.cn/oss/assets/subscription/vip_normal_bg.webp',
            text: '会员限时 1 折，享专属服务 >',
          }
      }
    })
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
      isVip,
      vipLevel,
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
