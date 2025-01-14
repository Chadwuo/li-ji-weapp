<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotify } from 'wot-design-uni'

const { showNotify } = useNotify()
const { userInfo, accessToken, refreshToken } = storeToRefs(useAuthStore())
const nickName_edit = ref(userInfo.value?.nickName)

const openPrivacyContract = () => {
  wx.openPrivacyContract({ fail: () => { } })
}

const onChooseAvatar = (e: any) => {
  uni.uploadFile({
    url: `${import.meta.env.VITE_SERVICE_API_URL}/user/upload-avatar`,
    filePath: e.detail.avatarUrl,
    name: 'file',
    header: {
      'Authorization': `Bearer ${accessToken.value}`,
      'X-Authorization': `Bearer ${refreshToken.value}`,
    },
    success: (uploadFileRes) => {
      const result = JSON.parse(uploadFileRes.data)
      if (result.succeeded && userInfo.value) {
        showNotify({ type: 'success', message: '头像修改成功' })
        userInfo.value.avatar = result.data
      }
    },
  })
}

const onBlur = async () => {
  if (userInfo.value && nickName_edit.value !== userInfo.value.nickName) {
    const res = await apiUserNickNamePut({
      nickName: nickName_edit.value,
    })
    if (res.succeeded) {
      showNotify({ type: 'success', message: '昵称修改成功' })
      userInfo.value.nickName = nickName_edit.value
    }
  }
}
</script>

<template>
  <div class="mx-3">
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
  </div>
</template>

<style lang="scss" scoped>
:deep(.wd-cell__body) {
  align-items: center;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "设置"
  }
}
</route>
