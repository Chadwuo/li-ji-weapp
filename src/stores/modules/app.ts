import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const searchHistory = ref<Array<string>>([])
  let baseApiUrl = import.meta.env.VITE_SERVICE_API_URL
  let version = '4.0.0'

  // #ifdef MP-WEIXIN
  const { miniProgram } = uni.getAccountInfoSync()
  version = miniProgram.version
  baseApiUrl += miniProgram.envVersion === 'release' ? '-release' : '-dev'
  // #endif

  return {
    searchHistory,
    baseApiUrl,
    version,
  }
}, {
  persist: {
    pick: ['searchHistory'],
  },
})
