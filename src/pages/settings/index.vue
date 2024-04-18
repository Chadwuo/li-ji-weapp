<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { update } from '@/alicloud/services/user'
import mpserverless from '~/alicloud/index'

const { userInfo } = storeToRefs(useUserStore())
function onChange(val) {
  update({ skipAD: val })
}

function openPrivacyContract() {
  wx.openPrivacyContract()
}

function onChooseAvatar(e) {
  mpserverless.file.uploadFile({
    filePath: e.detail.avatarUrl,
  }).then((res) => {
    const { fileUrl } = res
    update({
      avatarUrl: fileUrl,
    }).then((res) => {
      if (res.success) {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 2000,
        })
        userInfo.value.avatarUrl = fileUrl
      }
    })
  })
}
const nickName_edit = ref(userInfo.value.nickName)
function onBlur() {
  if (nickName_edit.value !== userInfo.value.nickName) {
    update({
      nickName: nickName_edit.value,
    }).then((res) => {
      if (res.success) {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 2000,
        })
        userInfo.value.nickName = nickName_edit.value
      }
    })
  }
}
</script>

<template>
  <div class="mt-3 space-y-3">
    <div class="rounded-2xl bg-white p-1">
      <uv-cell is-link :border="false">
        <template #title>
          <button class="uv-reset-button w-full text-left" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
            头像
          </button>
        </template>
        <template #value>
          <uv-avatar :src="userInfo.avatarUrl" />
        </template>
      </uv-cell>
      <uv-cell title="昵称" :border="false" is-link>
        <template #value>
          <input v-model="nickName_edit" class="text-right text-sm" type="nickname" @blur="onBlur">
        </template>
      </uv-cell>
    </div>
    <div class="rounded-2xl bg-white p-1">
      <uv-cell title="关闭广告" :label="userInfo.skipAD ? '礼记会继续努力，期待得到你的认可！' : '页面广告已开启，礼记因你更美好！'" :border="false">
        <template #value>
          <uv-switch v-model="userInfo.skipAD" active-color="#f87171" @change="onChange" />
        </template>
      </uv-cell>
    </div>
    <div class="rounded-2xl bg-white p-1">
      <uv-cell is-link :border="false">
        <template #title>
          <button class="uv-reset-button w-full text-left" open-type="contact">
            在线客服
          </button>
        </template>
      </uv-cell>
      <uv-cell is-link :border="false">
        <template #title>
          <button class="uv-reset-button w-full text-left" open-type="feedback">
            意见反馈
          </button>
        </template>
      </uv-cell>
    </div>
    <div class="rounded-2xl bg-white p-1">
      <uv-cell title="备案号" :border="false" value="皖ICP备2023023087号-1X" />
      <uv-cell title="开源协议" :border="false" value="GPL-3.0 license" />
      <uv-cell title="隐私政策" :border="false" is-link @click="openPrivacyContract" />
      <uv-cell title="关于礼记" is-link :border="false" url="/pages/about/index" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "设置"
  }
}
</route>
