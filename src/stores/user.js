import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo, getUserDataScope } from '~/alicloud/services/user'

export const useUserStore = defineStore(
    'user',
    () => {
        const userInfo = ref(null)

        async function setUserInfo() {
            var res = await getUserInfo()
            if (res.success) {
                userInfo.value = res.data
                await getUserDataScope()
            }
            return res
        }

        return {
            userInfo,
            setUserInfo
        }
    },
    {
        persist: false,
    },
)