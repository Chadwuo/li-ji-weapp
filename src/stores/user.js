import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo, getUserDataScope } from '~/alicloud/services/user'

export const useUserStore = defineStore(
    'user',
    () => {
        const userInfo = ref(null)
        const userDataScope = computed(() => {
            if (!userInfo.value.userFamily) {
                return [userInfo.value._id]
            } else {
                return userFamily.value.map((i) => i.userId);
            }
        })

        async function initUserInfo() {
            var res = await getUserInfo()
            if (!res.success) {
                throw new Error(res);
            }
            userInfo.value = res.data
        }

        return {
            userInfo,
            userDataScope,
            initUserInfo,
        }
    },
    {
        persist: {
            paths: [],
        },
    },
)