<script setup lang="ts">
import { storeToRefs } from 'pinia'
import VipEquity from './components/VipEquity.vue'

const { isVip, userInfo } = storeToRefs(useAuthStore())
const vipLevel = computed(() => {
  switch (userInfo.value?.accountType) {
    case 1:
      return {
        name: 'VIP PRO',
        color: 'from-[#B8860B] to-[#F2CB69]',
        bg: `${import.meta.env.VITE_SERVICE_URL}/oss/assets/subscription/vip_pro_bg.webp`,
        text: '创始会员卡，仅限百席，致敢于梦想的⌜创始人⌟',
      }
    case 2:
      return {
        name: 'VIP',
        color: 'from-[#C02625] to-[#DB695B]',
        bg: `${import.meta.env.VITE_SERVICE_URL}/oss/assets/subscription/vip_free_bg.webp`,

        text: '专属礼遇，馈赠予重要伙伴的特殊权益',
      }
    case 9:
      return {
        name: 'SVIP',
        color: 'from-[#D044CF] to-[#EC70AE]',
        bg: `${import.meta.env.VITE_SERVICE_URL}/oss/assets/subscription/vip_svip_bg.webp`,
        text: '终身尊享，解锁平台无期限的特权礼遇',
      }
    default:
      return {
        name: '普通用户',
        color: 'from-[#E9EEEE] to-[#FBFFFC]',
        bg: `${import.meta.env.VITE_SERVICE_URL}/oss/assets/subscription/vip_normal_bg.webp`,
        text: '会员限时 1 折，享专属服务 >',
      }
  }
})

onLoad(() => {
  if (!isVip.value) {
    uni.navigateTo({
      url: '/pages/subscription/plan',
    })
  }
})
</script>

<template>
  <div class="mx-3 h-full flex flex-col items-center">
    <div class="mt-6 w-full bg-[length:100%_100%] bg-no-repeat" :style="{ 'background-image': `url(${vipLevel.bg})` }">
      <div class="h-32 flex flex-col p-5">
        <div class="bg-gradient-to-r bg-clip-text text-2xl text-transparent font-bold" :class="vipLevel.color">
          {{ vipLevel.name }}
        </div>
        <div class="my-auto flex items-center">
          <uv-avatar :src="userInfo?.avatar" :size="28" />
          <div class="ml-2 bg-gradient-to-r bg-clip-text text-transparent" :class="vipLevel.color">
            {{ userInfo?.nickName }}
          </div>
        </div>
        <div class="mt-1 bg-gradient-to-r bg-clip-text text-sm text-transparent" :class="vipLevel.color">
          {{ vipLevel.text }}
        </div>
      </div>
    </div>
    <vip-equity class="mt-6" />
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>
