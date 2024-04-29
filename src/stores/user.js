import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getInfo } from '~/alicloud/services/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const userDataScope = computed(() => {
      if (!userInfo.value.familyMembers)
        return [userInfo.value._id]
      else
        return userInfo.value.familyMembers.map(i => i.userId)
    })

    async function getUserInfo() {
      const res = await getInfo()
      if (!res.success)
        throw new Error(res)
      userInfo.value = res.result
    }

    return {
      userInfo,
      userDataScope,
      getUserInfo,
    }
  },
  {
    persist: {
      paths: ['userInfo'],
    },
  },
)
