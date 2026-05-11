import { defineStore } from 'pinia'
import { friendCategory } from '@/constants/app'

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
    const friendTagPickerColumns = computed(() => {
      return [...friendCategory.map(item => ({ label: item, value: item })), ...friendTags.value.map(item => ({ label: item.name, value: item.name }))]
    })
    const friendTabsList = computed(() => {
      return ['全部', ...friendCategory, ...friendTags.value.map(item => item.name)].map(item => ({ name: item, value: item }))
    })

    return {
      accessToken,
      refreshToken,
      isLogin,
      isVip,
      userInfo,
      userFamilys,
      friendTags,
      friendTagPickerColumns,
      friendTabsList,
    }
  },
  {
    persist: {
      pick: ['accessToken', 'refreshToken'],
    },
  },
)
