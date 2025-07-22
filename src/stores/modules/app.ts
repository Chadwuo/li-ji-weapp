import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const searchHistory = ref<Array<string>>([])

  return {
    searchHistory,
  }
}, {
  persist: {
    pick: ['searchHistory'],
  },
})
