<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { userInfo, userFamilys } = storeToRefs(useAuthStore())
const jinrishici = ref('')

onLoad(() => {
  jinrishiciLoad((result: any) => {
    jinrishici.value = result.data.content
  })
  statistics()
})

const staticData = ref({
  giftOutTotal: 0,
  giftInTotal: 0,
  giftOutCount: 0,
  giftInCount: 0,
})
const statistics = async () => {
  // const [giftOutRes, giftInRes] = await Promise.all([
  //   staticGiftOut(),
  //   staticGiftIn(),
  // ])
  // if (giftOutRes.success)
  //   staticData.value.giftOut = giftOutRes.data

  // if (giftInRes.success)
  //   staticData.value.giftIn = giftInRes.data
}

const toSettings = () => {
  uni.navigateTo({
    url: '/pages/settings/index',
  })
}

onShareAppMessage(() => {
  return {
    title: '可能是东半球最好用的人情记账工具',
    path: `/pages/book/index`,
    imageUrl: '/static/share.png',
  }
})
</script>

<template>
  <div class="pt-24 space-y-5">
    <div class="flex items-center" @click="toSettings">
      <uv-avatar :src="userInfo?.avatar" shape="square" :size="55" />
      <div class="ml-3">
        <div class="text-lg">
          {{ welcome() }}，{{ userInfo?.nickName }}
        </div>
        <div class="mt-1 text-sm text-gray">
          {{ jinrishici }}
        </div>
      </div>
      <div class="i-ri-settings-line ml-auto text-lg" />
    </div>
    <div class="grid grid-cols-2 gap-5 rounded-2xl bg-white p-5 divide-x">
      <div class="text-center">
        <div class="text-lg text-black font-bold">
          {{ formatMoney(staticData.giftInTotal) }}
        </div>
        <div class="flex items-center justify-center text-sm text-gray space-x-1">
          <div class="i-icon-park-outline-income" />
          <div>收礼({{ staticData.giftInCount }})</div>
        </div>
      </div>
      <div class="text-center">
        <div class="text-lg text-black font-bold">
          {{ formatMoney(staticData.giftOutTotal) }}
        </div>
        <div class="flex items-center justify-center text-sm text-gray space-x-1">
          <div class="i-icon-park-outline-expenses" />
          <div>送礼({{ staticData.giftOutTotal }})</div>
        </div>
      </div>
    </div>
    <div class="rounded-2xl bg-white p-2">
      <wd-cell v-if="userFamilys" value="家人共享" is-link center to="/pages/family/index">
        <template #title>
          <uv-avatar-group :urls="userFamilys.map((i) => i.avatar)" gap="0.4" />
        </template>
      </wd-cell>
      <wd-cell v-else title="开通家人共享" is-link to="/pages/family/index">
        <template #icon>
          <div class="i-material-symbols:family-home mx-2 text-lg text-red" />
        </template>
      </wd-cell>
    </div>
    <div class="rounded-2xl bg-white p-2 space-y-3">
      <wd-cell title="支持礼记" is-link to="/pages/sponsor/index">
        <template #icon>
          <div class="i-bx-like mx-2 text-lg text-red" />
        </template>
      </wd-cell>
      <wd-cell is-link>
        <template #icon>
          <div class="i-ri-wechat-fill pr-4 text-lg text-green" />
        </template>
        <template #title>
          <button class="reset-button w-full text-left" open-type="share">
            分享好友
          </button>
        </template>
      </wd-cell>
      <wd-cell title="常见问题" is-link to="/pages/faq/index">
        <template #icon>
          <div class="i-ic-round-question-answer mx-2 text-lg text-blue" />
        </template>
      </wd-cell>
      <wd-cell title="个人设置" is-link to="/pages/settings/index">
        <template #icon>
          <div class="i-mingcute-settings-1-fill mx-2 text-lg text-gray" />
        </template>
      </wd-cell>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">{
  "style": {
    "navigationStyle": "custom"
  }
}</route>
