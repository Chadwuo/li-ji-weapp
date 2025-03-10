import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const searchHistory = ref<string[]>()

  return {
    searchHistory,
  }
}, {
  persist: true,
})
