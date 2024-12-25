<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { userInfo } = storeToRefs(useAuthStore())
const nickName_edit = ref(userInfo.value?.nickName)

const openPrivacyContract = () => {
  wx.openPrivacyContract({ fail: () => { } })
}

const onChooseAvatar = (e: any) => {
  // mpserverless.file
  //   .uploadFile({
  //     filePath: e.detail.avatarUrl,
  //   })
  //   .then((res) => {
  //     const { fileUrl } = res
  //     update({
  //       avatarUrl: fileUrl,
  //     }).then((res) => {
  //       if (res.success) {
  //         uni.showToast({
  //           title: '修改成功',
  //           icon: 'none',
  //         })
  //         userInfo.value.avatarUrl = fileUrl
  //       }
  //     })
  //   })
}

const onBlur = () => {
  if (nickName_edit.value !== userInfo.value?.nickName) {
    // update({
    //   nickName: nickName_edit.value,
    // }).then((res) => {
    //   if (res.success) {
    //     uni.showToast({
    //       title: '修改成功',
    //       icon: 'none',
    //     })
    //     userInfo.value.nickName = nickName_edit.value
    //   }
    // })
  }
}
</script>

<template>
  <div class="mt-3 space-y-3">
    <div class="rounded-2xl bg-white p-2">
      <wd-cell title="头像" is-link center>
        <button class="reset-button flex flex-row-reverse" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <uv-avatar :src="userInfo?.avatar" />
        </button>
      </wd-cell>
      <wd-cell title="昵称" is-link center>
        <input v-model="nickName_edit" class="text-right text-sm" type="nickname" @blur="onBlur">
      </wd-cell>
    </div>

    <div class="rounded-2xl bg-white p-2">
      <wd-cell is-link :clickable="false">
        <template #title>
          <button class="reset-button w-full text-left" open-type="contact">
            在线客服
          </button>
        </template>
      </wd-cell>
      <wd-cell is-link :clickable="false">
        <template #title>
          <button class="reset-button w-full text-left" open-type="feedback">
            意见反馈
          </button>
        </template>
      </wd-cell>
    </div>
    <div class="rounded-2xl bg-white p-2">
      <wd-cell title-width="80px" title="备案号" value="皖ICP备2024069565号-1X" />
      <wd-cell title="开源协议" value="GPL-3.0 license" />
      <wd-cell title="隐私政策" is-link @click="openPrivacyContract" />
      <wd-cell title="关于礼记" is-link to="/pages/about/index" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.wd-cell__body) {
  align-items: center;
}
</style>

<route lang="json">{
  "style": {
    "navigationBarTitleText": "设置"
  }
}</route>
