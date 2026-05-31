<script setup lang="ts">
import { JSONStringify } from '@alova/shared'
import { useNotify } from '@wot-ui/ui'
import { storeToRefs } from 'pinia'

definePage({
  style: {
    navigationBarTitleText: '设置',
  },
})

const { showNotify } = useNotify()
const { userInfo } = storeToRefs(useAuthStore())
const nickName_edit = ref(userInfo.value?.nickName)
const currentEmail = computed(() => userInfo.value?.email || '')
const emailCellValue = computed(() => currentEmail.value ? maskEmail(currentEmail.value) : '未绑定')

function maskEmail(email: string) {
  const [name, domain] = email.split('@')
  if (!domain)
    return email

  const visibleName = name.length <= 2 ? `${name.slice(0, 1)}***` : `${name.slice(0, 2)}***${name.slice(-1)}`
  return `${visibleName}@${domain}`
}

const openPrivacyContract = () => {
  wx.openPrivacyContract({ fail: () => { } })
}

const onChooseAvatar = async (e: any) => {
  const { data } = await apiUserAvatarPut({
    filePath: e.detail.avatarUrl,
    name: 'file',
  })
  const result = JSON.parse(data) as Api.Response<string>
  if (result.succeeded && userInfo.value) {
    showNotify({ type: 'success', message: '头像修改成功' })
    userInfo.value.avatar = result.data
  }
  else {
    uni.showToast({
      title: JSONStringify(result.errors),
      icon: 'none',
    })
  }
}

const onBlur = async () => {
  if (userInfo.value && nickName_edit.value !== userInfo.value.nickName) {
    await apiUserNickNamePut({
      nickName: nickName_edit.value,
    })
    showNotify({ type: 'success', message: '昵称修改成功' })
    userInfo.value.nickName = nickName_edit.value
  }
}

const goAccountDelete = () => {
  uni.navigateTo({
    url: '/pages/account/delete',
  })
}

const goEmailBinding = () => {
  uni.navigateTo({
    url: '/pages/settings/email',
  })
}

const goContact = () => {
  uni.navigateTo({
    url: '/pages/contact/index',
  })
}

const logout = () => {
  uni.clearStorageSync()
  // #ifdef MP-WEIXIN
  wx.restartMiniProgram({
    path: '/pages/index/index',
  })
  // #endif

  // #ifdef H5
  uni.redirectTo({
    url: '/pages/login/index',
  })
  // #endif
}
</script>

<template>
  <div class="m-3 space-y-3">
    <div class="rounded-2xl bg-white p-2">
      <wd-cell title="头像" is-link center title-width="80px">
        <button class="reset-button flex flex-row-reverse" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <wd-avatar :src="userInfo?.avatar" />
        </button>
      </wd-cell>
      <wd-cell title="昵称" is-link center title-width="80px">
        <input v-model="nickName_edit" class="text-right text-sm" type="nickname" @blur="onBlur">
      </wd-cell>
      <wd-cell title="邮箱" :value="emailCellValue" is-link center title-width="80px" @click="goEmailBinding" />
    </div>
    <div>
      <div class="rounded-2xl bg-white p-2">
        <!-- <button class="reset-button" open-type="contact">
          <wd-cell is-link :clickable="false" title="在线客服" />
        </button> -->
        <wd-cell is-link title="联系客服" @click="goContact" />
        <button class="reset-button" open-type="feedback">
          <wd-cell is-link :clickable="false" title="异常反馈" />
        </button>
      </div>
      <div class="mt-1 px-2 text-xs text-gray">
        使用异常反馈，向开发者报告App功能异常问题，与开发者共享诊断日志，帮助开发者快速定位问题，改进App。
      </div>
    </div>
    <div class="rounded-2xl bg-white p-2">
      <wd-cell title-width="60px" title="备案号" value="皖ICP备2024069565号-1X" />
      <wd-cell title="开源协议" value="GPL-3.0 license" />
      <!-- #ifdef MP-WEIXIN -->
      <wd-cell title="隐私政策" is-link @click="openPrivacyContract" />
      <!-- #endif -->
    </div>

    <wd-button plain round block variant="plain" @click="logout">
      <!-- #ifdef H5 -->
      退出登录
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      重启应用
      <!-- #endif -->
    </wd-button>

    <wd-button round block @click="goAccountDelete">
      注销账号
    </wd-button>
  </div>
</template>

<style lang="scss" scoped>
:deep(.wd-cell__body) {
  align-items: center;
}
</style>
