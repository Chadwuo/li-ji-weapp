<script setup>
import { storeToRefs } from 'pinia'

const { userInfo } = storeToRefs(useAuthStore())
// function onChange(val) {
//   update({ enableAD: val })
// }

function openPrivacyContract() {
  wx.openPrivacyContract()
}

function onChooseAvatar(e) {
  mpserverless.file
    .uploadFile({
      filePath: e.detail.avatarUrl,
    })
    .then((res) => {
      const { fileUrl } = res
      update({
        avatarUrl: fileUrl,
      }).then((res) => {
        if (res.success) {
          uni.showToast({
            title: '修改成功',
            icon: 'none',
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
        uni.showToast({
          title: '修改成功',
          icon: 'none',
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
      <button class="uv-reset-button w-full text-left" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <uv-cell title="头像" is-link :border="false">
          <template #value>
            <uv-avatar :src="userInfo.avatarUrl" />
          </template>
        </uv-cell>
      </button>
      <uv-cell title="昵称" :border="false" is-link>
        <template #value>
          <input v-model="nickName_edit" class="w-4/5 py-2 text-right text-sm" type="nickname" @blur="onBlur">
        </template>
      </uv-cell>
    </div>
    <!-- <div class="rounded-2xl bg-white p-1">
      <uv-cell title="开启广告" :label="userInfo.enableAD ? '页面广告已开启，礼记因你更美好！' : '礼记会继续努力，期待得到你的认可！'" :border="false">
        <template #value>
          <uv-switch v-model="userInfo.enableAD" active-color="#f87171" @change="onChange" />
        </template>
      </uv-cell>
    </div> -->
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
      <uv-cell title="备案号" :border="false" value="皖ICP备2024069565号-1X" />
      <uv-cell title="开源协议" :border="false" value="GPL-3.0 license" />
      <uv-cell title="隐私政策" :border="false" is-link @click="openPrivacyContract" />
      <uv-cell title="关于礼记" is-link :border="false" url="/pages/about/index" />
    </div>
    <div class="overflow-hidden rounded-2xl bg-white">
      <ad unit-id="adunit-64aefbe92c2dc7bf" />
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
