import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getInfo } from '~/alicloud/services/user'

export const useUserStore = defineStore(
    'user',
    () => {
        const userInfo = ref(null)
        const userDataScope = computed(() => {
            if (!userInfo.value.familyMembers) {
                return [userInfo.value._id]
            } else {
                return userInfo.value.familyMembers.map((i) => i.userId);
            }
        })

        async function initUserInfo() {
            var res = await getInfo()
            if (!res.success) {
                throw new Error(res);
            }
            userInfo.value = res.data
            console.log('userInfo :>> ', userInfo.value);
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