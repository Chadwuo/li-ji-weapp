<script setup lang="ts">
import { useDialog, useToast } from '@wot-ui/ui'

definePage({
  style: {
    navigationBarTitleText: '家人共享',
  },
})

const dialog = useDialog()
const toast = useToast()
const { userFamilies, loadUserFamilies } = useUserFamilies()
const inviteData = ref({
  familyId: '',
  avatarUrl: '',
  word: '',
})

onLoad((options: any) => {
  inviteData.value = options
})
const onAgree = async () => {
  await loadUserFamilies()
  if (userFamilies.value?.length) {
    dialog.alert({
      msg: '你当前已属于一个家庭账户，无法直接加入新的家庭。若要接受新邀请，请先退出当前家庭。',
      title: '提示',
      confirmButtonText: '我的家庭',
    }).then(() => {
      uni.navigateTo({
        url: '/pages/family/index',
      })
    })
    return
  }
  toast.loading({
    loadingColor: '#F87171',
    msg: '请稍等...',
  })
  await apiUserFamilyPost({
    role: '成员',
    familyId: inviteData.value.familyId,
  })
  await loadUserFamilies()
  await useAuthStore().loadUserInfo()
  toast.close()
  uni.switchTab({
    url: '/pages/index/index',
  })
}

const onReject = () => {
  uni.switchTab({
    url: '/pages/index/index',
  })
}
</script>

<template>
  <div class="mx-3">
    <div class="mt-3 rounded-2xl bg-white p-4">
      <div>
        <div class="mt-5 flex items-center justify-center space-x-3xl">
          <div class="i-iconoir-favourite-book text-12 text-red" />
          <div class="i-mingcute-transfer-3-fill text-2xl text-teal" />
          <wd-avatar :src="inviteData.avatarUrl" :size="55" />
        </div>
        <div class="mt-3 text-xl font-bold">
          {{ inviteData.word }}
        </div>
      </div>

      <div class="mt-10 space-y-xl">
        <div class="flex items-center">
          <div class="m-3 text-red">
            <i class="i-hugeicons-share-01 text-3xl" />
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
            <i class="i-hugeicons-blocked text-3xl" />
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
      <div class="mt-10 flex justify-around">
        <wd-button variant="plain" round block @click="onReject">
          拒绝
        </wd-button>
        <wd-button round block @click="onAgree">
          同意
        </wd-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
