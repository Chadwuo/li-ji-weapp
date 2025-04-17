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
