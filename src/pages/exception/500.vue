<script setup lang="ts">
definePage({
  style: {
    navigationStyle: 'custom',
  },
})

const onRetry = () => {
  uni.clearStorageSync()
  // #ifdef MP-WEIXIN
  wx.restartMiniProgram({
    path: '/pages/index/index',
  })
  // #endif

  // #ifdef H5
  uni.switchTab({
    url: '/pages/index/index',
  })
  // #endif
}

const error = ref('')
onLoad((option) => {
  if (option?.error) {
    error.value = decodeURIComponent(option.error)
  }
})
</script>

<template>
  <div class="mx-3 h-full flex flex-col items-center justify-center text-gray space-y-5">
    <div class="i-hugeicons-wifi-error-01 text-12" />
    <div class="text-sm">
      {{ error || '啊哦，出现了一个小错误，请稍后再试~' }}
    </div>
    <div class="min-w-24">
      <wd-button @click="onRetry">
        重启应用
      </wd-button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
