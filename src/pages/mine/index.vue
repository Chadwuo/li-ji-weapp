<script setup>
import { storeToRefs } from 'pinia'
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '~/stores/user'
import { formatMoney, welcome } from '~/utils'
import jinrishiciApi from '@/utils/jinrishici.js'
import { statistics as staticGiftOut } from '@/alicloud/services/giftOut'
import { statistics as staticGiftIn } from '@/alicloud/services/giftReceive'

const { userInfo } = storeToRefs(useUserStore())
const jinrishici = ref('')

onLoad(() => {
  jinrishiciApi((result) => {
    jinrishici.value = result.data.content
  })
  statistics()
})

const staticData = ref({
  giftOut: {},
  giftIn: {},
})
async function statistics() {
  const [giftOutRes, giftInRes] = await Promise.all([staticGiftOut(), staticGiftIn()])
  if (giftOutRes.success)
    staticData.value.giftOut = giftOutRes.data

  if (giftInRes.success)
    staticData.value.giftIn = giftInRes.data
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
    <div class="flex items-center" @click="router.push('/pages/settings/index')">
      <uv-avatar :src="userInfo.avatarUrl" shape="square" :size="55" />
      <div class="ml-3">
        <div class="text-lg">
          {{ welcome() }}，{{ userInfo.nickName }}
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
          {{ formatMoney(staticData.giftIn.total) }}
        </div>
        <div class="flex items-center justify-center text-sm text-gray space-x-1">
          <div class="i-icon-park-outline-income" />
          <div>收礼({{ staticData.giftIn.count }})</div>
        </div>
      </div>
      <div class="text-center">
        <div class="text-lg text-black font-bold">
          {{ formatMoney(staticData.giftOut.total) }}
        </div>
        <div class="flex items-center justify-center text-sm text-gray space-x-1">
          <div class="i-icon-park-outline-expenses" />
          <div>送礼({{ staticData.giftOut.count }})</div>
        </div>
      </div>
    </div>
    <div class="rounded-2xl bg-white p-1">
      <uv-cell v-if="userInfo.familyMembers" is-link :border="false" url="/pages/family/index" value="家人共享">
        <template #title>
          <uv-avatar-group :urls="userInfo.familyMembers.map(i => i.user.avatarUrl)" size="35" gap="0.4" />
        </template>
      </uv-cell>
      <uv-cell v-else title="开通家人共享" url="/pages/family/index" is-link :border="false">
        <template #icon>
          <div class="i-material-symbols:family-home mx-2 text-lg text-red" />
        </template>
      </uv-cell>
    </div>
    <div class="rounded-2xl bg-white px-1 py-3 space-y-3">
      <uv-cell title="支持礼记" url="/pages/sponsor/index" is-link :border="false">
        <template #icon>
          <div class="i-bx-like mx-2 text-lg text-red" />
        </template>
      </uv-cell>

      <uv-cell :border="false" is-link>
        <template #icon>
          <div class="i-ri-wechat-fill pr-4 text-lg text-green" />
        </template>
        <template #title>
          <button class="uv-reset-button w-full text-left" open-type="share">
            分享好友
          </button>
        </template>
      </uv-cell>
      <uv-cell title="常见问题" :border="false" url="/pages/FAQs/index" is-link>
        <template #icon>
          <div class="i-ic-round-question-answer mx-2 text-lg text-blue" />
        </template>
      </uv-cell>
      <uv-cell title="个人设置" :border="false" url="/pages/settings/index" is-link>
        <template #icon>
          <div class="i-mingcute-settings-1-fill mx-2 text-lg text-gray" />
        </template>
      </uv-cell>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.uv-cell__title) {
    flex: none
}
</style>

<route lang="json">
{
    "style": {
        "navigationStyle": "custom"
    }
}
</route>
