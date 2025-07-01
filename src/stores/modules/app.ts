import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const searchHistory = ref<Array<string>>([])
  let version = '5.0.0'
  let envVersion = 'dev'

  // #ifdef MP-WEIXIN
  const { miniProgram } = uni.getAccountInfoSync()
  version = miniProgram.version
  envVersion = miniProgram.envVersion// === 'release' ? '/release' : ''
  // #endif

  return {
    searchHistory,
    version,
    envVersion,
  }
}, {
  persist: {
    pick: ['searchHistory'],
  },
})
