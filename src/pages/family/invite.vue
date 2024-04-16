<template>
    <div>
        <div class="bg-white rounded-2xl p-4 mt-3">
            <div>
                <div class="mt-5 flex justify-center items-center space-x-3xl">
                    <div class="i-iconoir-favourite-book text-red text-12"></div>
                    <div class="i-mingcute-transfer-3-fill text-green text-2xl"></div>
                    <uv-avatar :src="inviteData.avatarUrl" :size="55"></uv-avatar>
                </div>
                <div class="mt-3 text-xl font-bold">{{ inviteData.word }}</div>
            </div>

            <div class="space-y-xl mt-10">
                <div class="flex items-center">
                    <div class="text-red m-3"><i class="i-tabler-device-mobile-share text-3xl"></i></div>
                    <div>
                        <div class="font-bold">协同共享记账</div>
                        <div class="text-gray text-sm">安全共享你的数据，使亲友和你共同记录家庭人情往来</div>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="text-red m-3"><i class="i-tabler-lock-heart text-3xl"></i></div>
                    <div>
                        <div class="font-bold">私密且安全</div>
                        <div class="text-gray text-sm">信息会加密，你可以随时停止共享</div>
                    </div>
                </div>
            </div>

            <div class="space-y-xl mt-10">
                <uv-button type="primary" shape="circle" text="同意" @click="onAgree" :loading="loading"
                    loadingMode="circle">
                </uv-button>
                <uv-button shape="circle" text="拒绝" @click="onReject" :loading="loading" loadingMode="circle">
                </uv-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
const { userInfo } = storeToRefs(useUserStore())
import { join } from '@/alicloud/services/family'

onLoad((options) => {
    inviteData.value = options
})
const inviteData = ref({})
const loading = ref(false)
const onAgree = () => {
    if (userInfo.value.familyMembers) {
        router.push({
            path: '/pages/family/index'
        })
        return
    }
    loading.value = true
    join({
        familyId: inviteData.value.familyId
    }).then(res => {
        if (res.success) {
            uni.showToast({
                title: '加入成功',
                icon: 'none'
            })
            router.push({
                path: '/pages/family/index'
            })
        } else {

        }

    }).finally(() => {
        loading.value = false
    })
}

const onReject = () => {
    router.push({
        path: '/pages/book/index',
        tabBar: true
    })
}

</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "style": {
        "navigationBarTitleText": "家人共享"
    }
}</route>