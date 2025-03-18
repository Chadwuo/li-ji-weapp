<script setup lang="ts">
const onRetry = () => {
  uni.clearStorageSync()

  wx.restartMiniProgram({
    path: '/pages/book/page',
  })
}

const error = ref('')
onLoad((option) => {
  if (option?.error) {
    error.value = option.error
  }
})
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center text-gray">
    <div class="i-hugeicons-wifi-error-01 text-12" />
    <div class="mt-8 text-sm">
      {{ error || '啊哦，出现了一个小错误，请稍后再试~' }}
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
