<script setup lang="ts">
import { storeToRefs } from 'pinia'

definePage({
  style: {
    navigationStyle: 'custom',
  },
})

const serviceUrl = import.meta.env.VITE_SERVICE_URL
const { userInfo, isVip } = storeToRefs(useAuthStore())
const { userFamilies, loadUserFamilies } = useUserFamilies()
const vipLevel = computed(() => {
  switch (userInfo.value?.accountType) {
    case 1:
      return {
        name: 'VIP PRO',
        text: '仅限百席，致敢于梦想的⌜创始人⌟',
      }
    case 2:
      return {
        name: 'VIP',
        text: '专属礼遇，馈赠予重要伙伴的特殊权益',
      }
    case 9:
      return {
        name: 'SVIP',
        text: '终身尊享，解锁平台无期限的特权礼遇',
      }
    default:
      return {
        name: '普通用户',
        text: '会员限时折扣，享专属服务 >',
      }
  }
})
const jinrishici = ref('')

onLoad(() => {
  loadUserFamilies()
  jinrishiciLoad((result: any) => {
    jinrishici.value = result.data.content
  })
})

const toSettings = () => {
  uni.navigateTo({
    url: '/pages/settings/index',
  })
}

const toSubscription = () => {
  uni.navigateTo({
    url: `/pages/subscription/${isVip.value ? 'index' : 'plan'}`,
  })
}

onShareAppMessage(() => {
  return {
    title: '可能是东半球最好用的人情往来记账工具',
    path: `/pages/index/index`,
    imageUrl: '/static/share/1.png',
  }
})
// #ifdef MP-WEIXIN
const paddingTop = uni.getMenuButtonBoundingClientRect().bottom + 5
// #endif
const userAvatar = computed(() => {
  const avatar = userInfo.value?.avatar
  if (avatar?.startsWith('http') || avatar?.startsWith('/static'))
    return avatar
  return `${serviceUrl}${avatar}`
})
</script>

<template>
  <div :style="{ 'padding-top': `${paddingTop || 55}px` }">
    <div class="mx-3 space-y-3">
      <div class="flex items-center" @click="toSettings">
        <wd-avatar :src="userAvatar" :size="64" />
        <div class="ml-3">
          <div class="text-lg">
            {{ welcome() }}，{{ userInfo?.nickName }}
          </div>
          <div class="mt-1 text-sm text-gray">
            {{ jinrishici }}
          </div>
        </div>
        <div class="i-hugeicons-settings-03 ml-auto text-xl" />
      </div>
      <div>
        <div
          class="h-18 flex bg-contain bg-no-repeat px-4 -mb-4"
          :style="{ 'background-image': `url(${serviceUrl}/oss/assets/subscription/vip_equity_bg.webp)` }"
          @click="toSubscription"
        >
          <div class="mt-2">
            <div class="text-[#7D3F0B] font-bold">
              {{ vipLevel.name }}
            </div>
            <div class="mt-1 text-sm text-[#985426]">
              {{ vipLevel.text }}
            </div>
          </div>

          <div class="ms-auto mt-4">
            <div class="rounded-full from-[#fed7aa] to-[#d97706] bg-gradient-to-r px-2 py-1 text-sm text-white">
              {{ isVip ? '我的权益' : '立即开通' }}
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white p-2">
          <wd-cell v-if="userFamilies && userFamilies.length" center is-link to="/pages/family/index" size="large">
            <template #title>
              <wd-avatar-group>
                <template v-for="i in userFamilies" :key="i.userId">
                  <wd-avatar :src="i.avatar" size="medium" />
                </template>
              </wd-avatar-group>
            </template>
            <div v-if="userFamilies.length < 5">
              家人共享
            </div>
          </wd-cell>
          <wd-cell v-else title="开通家人共享" is-link to="/pages/family/index" size="large" center>
            <template #prefix>
              <div class="i-hugeicons-home-12 mr-2 text-lg text-red" />
            </template>
          </wd-cell>
        </div>
      </div>

      <div class="rounded-2xl bg-white p-2">
        <wd-cell title="个性化" is-link to="/pages/settings/custom" size="large" center>
          <template #prefix>
            <div class="i-hugeicons-customize mr-2 text-lg text-red" />
          </template>
        </wd-cell>

        <wd-cell title="小工具" is-link to="/pages/tools/index" size="large" center>
          <template #prefix>
            <div class="i-hugeicons-tools mr-2 text-lg text-yellow" />
          </template>
        </wd-cell>
      </div>
      <div class="rounded-2xl bg-white p-2">
        <button class="reset-button" open-type="share">
          <wd-cell is-link title="分享好友" size="large" center>
            <template #prefix>
              <div class="i-hugeicons-share-01 mr-2 text-lg text-teal" />
            </template>
          </wd-cell>
        </button>
        <wd-cell title="常见问题" is-link to="/pages/faq/index" size="large" center>
          <template #prefix>
            <div class="i-hugeicons-bubble-chat-question mr-2 text-lg text-blue" />
          </template>
        </wd-cell>
        <wd-cell title="个人设置" is-link to="/pages/settings/index" size="large" center>
          <template #prefix>
            <div class="i-hugeicons-settings-03 mr-2 text-lg text-gray" />
          </template>
        </wd-cell>
        <wd-cell title="关于礼记" is-link to="/pages/about/index" size="large" center>
          <template #prefix>
            <div class="i-hugeicons-information-circle mr-2 text-lg text-green" />
          </template>
        </wd-cell>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
