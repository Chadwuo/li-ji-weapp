<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { join } from '@/alicloud/services/family'

const { userInfo } = storeToRefs(useUserStore())

const inviteData = ref({})
const loading = ref(false)

onLoad((options) => {
  inviteData.value = options
})
function onAgree() {
  if (userInfo.value.familyMembers) {
    router.push({
      path: '/pages/family/index',
    })
    return
  }
  loading.value = true
  join({
    familyId: inviteData.value.familyId,
  }).then(async (res) => {
    if (res.success) {
      await useUserStore().getUserInfo()
      uni.showToast({
        title: '加入成功',
        icon: 'none',
      })
      router.push({
        path: '/pages/family/index',
      })
    }
  }).finally(() => {
    loading.value = false
  })
}

function onReject() {
  router.push({
    path: '/pages/book/index',
    tabBar: true,
  })
}
</script>

<template>
  <div>
    <div class="mt-3 rounded-2xl bg-white p-4">
      <div>
        <div class="mt-5 flex items-center justify-center space-x-3xl">
          <div class="i-iconoir-favourite-book text-12 text-red" />
          <div class="i-mingcute-transfer-3-fill text-2xl text-green" />
          <uv-avatar :src="inviteData.avatarUrl" :size="55" />
        </div>
        <div class="mt-3 text-xl font-bold">
          {{ inviteData.word }}
        </div>
      </div>

      <div class="mt-10 space-y-xl">
        <div class="flex items-center">
          <div class="m-3 text-red">
            <i class="i-tabler-device-mobile-share text-3xl" />
          </div>
          <div>
            <div class="font-bold">
              协同共享记账
            </div>
            <div class="text-sm text-gray">
              安全共享你的数据，使亲友和你共同记录家庭人情往来
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <div class="m-3 text-red">
            <i class="i-tabler-lock-heart text-3xl" />
          </div>
          <div>
            <div class="font-bold">
              私密且安全
            </div>
            <div class="text-sm text-gray">
              信息会加密，你可以随时停止共享
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 space-y-xl">
        <uv-button
          type="primary" shape="circle" text="同意" :loading="loading" loading-mode="circle"
          @click="onAgree"
        />
        <uv-button shape="circle" text="拒绝" :loading="loading" loading-mode="circle" @click="onReject" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
    "style": {
        "navigationBarTitleText": "家人共享"
    }
}
</route>
