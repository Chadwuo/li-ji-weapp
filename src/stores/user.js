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
                userInfo.value = res.result
            }
        }

        async function setUserDataScope() {
            userInfo.value.userDataScope = await getUserDataScope()
        }

        return {
            userInfo,
            setUserInfo,
            setUserDataScope
        }
    },
    {
        persist: false,
    },
)