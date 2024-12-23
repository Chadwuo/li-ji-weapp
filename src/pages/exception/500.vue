<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import lottie from '../../static/IGmMCqhzpt.lottie?url'

async function onRetry() {
  // 这个新的重启api可以更好解决问题
  wx.restartMiniProgram({
    path: '/pages/book/index',
  })
}
</script>

<template>
  <div class="mt-auto flex flex-col items-center text-gray">
    <div>
      <DotLottieVue style="height: 500px; width: 500px" autoplay loop :src="lottie" />
    </div>
    <div class="i-iconoir-wifi-error text-12" />
    <div class="mt-8 text-sm">
      网络连接断开，请检查网络哦~
    </div>
    <div class="mt-8 min-w-24">
      <wd-button type="primary" @click="onRetry">
        重启应用
      </wd-button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationStyle": "custom"
  }
}
</route>
