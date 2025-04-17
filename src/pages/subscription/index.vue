<script setup lang="ts">
import { storeToRefs } from 'pinia'
import VipEquity from './components/VipEquity.vue'

const { isVip, vipLevel, userInfo } = storeToRefs(useAuthStore())

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
    <div class="mt-6 w-full bg-[length:100%_100%] bg-no-repeat"
         :style="{ 'background-image': `url(${vipLevel.bg})` }"
    >
      <div class="h-24 flex flex-col p-5">
        <div class="text-2xl font-bold" :class="vipLevel.color">
          {{ vipLevel.name }}
        </div>
        <div class="mt-3 flex whitespace-pre text-sm text-slate-500 leading-relaxed space-x-3">
          {{ vipLevel.text }}
        </div>

        <div class="ms-auto mt-auto flex text-sm">
          <div class="rounded-lg text-center text-xs text-slate-500 leading-5">
            持卡人：
          </div>
          <div class="ms-2 font-serif" :class="vipLevel.color">
            {{ userInfo?.nickName }}
          </div>
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
