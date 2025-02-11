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
    fail: (err) => {
      uni.showToast({
        title: err.errMsg,
        icon: 'none',
      })
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
        <wd-cell title="头像" is-link center title-width="80px">
          <button class="reset-button flex flex-row-reverse" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
            <uv-avatar :src="userInfo?.avatar" />
          </button>
        </wd-cell>
        <wd-cell title="昵称" is-link center title-width="80px">
          <input v-model="nickName_edit" class="text-right text-sm" type="nickname" @blur="onBlur">
        </wd-cell>
      </div>

      <div>
        <div class="rounded-2xl bg-white p-2">
          <button class="reset-button" open-type="contact">
            <wd-cell is-link :clickable="false" title="在线客服" />
          </button>
          <button class="reset-button" open-type="feedback">
            <wd-cell is-link :clickable="false" title="异常反馈" />
          </button>
        </div>
        <div class="mt-1 px-2 text-xs text-gray">
          使用异常反馈，向开发者报告App功能异常问题，与开发者共享诊断日志，帮助开发者快速定位问题，改进App。
        </div>
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
