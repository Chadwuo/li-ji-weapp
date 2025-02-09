<script setup>
import { storeToRefs } from 'pinia'
import { useMessage, useToast } from 'wot-design-uni'

const message = useMessage()
const toast = useToast()
const { userFamilys } = storeToRefs(useAuthStore())
const inviteData = ref({})

onLoad((options) => {
  inviteData.value = options
})
const onAgree = async () => {
  if (userFamilys.value) {
    message.alert({
      msg: '你当前已属于一个家庭账户，无法直接加入新的家庭。若要接受新邀请，请先退出当前家庭。',
      title: '提示',
      confirmText: '我的家庭',
    }).then(() => {
      uni.navigateTo({
        url: '/pages/family/index',
      })
    })
    return
  }
  toast.loading({
    loadingColor: '#F87171',
    msg: '加载中...',
  })
  const res = await apiUserFamilyPost({
    role: '成员',
    familyId: inviteData.value.familyId,
  })
  if (res.succeeded) {
    uni.navigateTo({
      url: '/pages/family/index',
    })
  }
  toast.close()
}

const onReject = () => {
  uni.switchTab({
    url: '/pages/book/page',
  })
}
</script>

<template>
  <div class="mx-3">
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
              协同记账
            </div>
            <div class="text-sm text-gray">
              贴心记账伙伴，让家庭人情往来记录更轻松。
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
              确保记录安全无虞，你能够自由掌控。
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 w-full flex">
        <wd-button plain @click="onReject">
          拒绝
        </wd-button>
        <wd-button @click="onAgree">
          同意
        </wd-button>
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
