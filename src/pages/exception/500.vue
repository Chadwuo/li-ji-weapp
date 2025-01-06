<script setup lang="ts">
const onRetry = () => {
  uni.clearStorageSync()

  wx.restartMiniProgram({
    path: '/pages/book/page',
  })
}
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center text-gray">
    <div class="i-tabler-error-404 text-12" />
    <div class="mt-8 text-sm">
      啊哦，出现了一个小错误，请稍后再试~
    </div>
    <div class="mt-8 min-w-24">
      <wd-button @click="onRetry">
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
