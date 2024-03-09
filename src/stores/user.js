import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo, getUserDataScope } from '~/alicloud/services/user'

export const useUserStore = defineStore(
    'user',
    () => {
        const userInfo = ref(null)
        const userDataScope = ref([])

        async function initUserInfo() {
            if (!userInfo.value) {
                var res = await getUserInfo()
                if (res.success) {
                    userInfo.value = res.data
                }
            }
        }

        async function initUserDataScope() {
            userDataScope.value = await getUserDataScope()
        }

        return {
            userInfo,
            userDataScope,
            initUserInfo,
            initUserDataScope,
        }
    },
    {
        persist: true,
    },
)