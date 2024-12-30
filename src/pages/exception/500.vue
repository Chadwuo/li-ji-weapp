<script setup lang="ts">
const onRetry = () => {
  // 这个新的重启api可以更好解决问题
  wx.restartMiniProgram({
    path: '/pages/book/index',
  })
}
</script>

<template>
  <div class="mt-auto flex flex-col items-center text-gray">
    <div class="i-iconoir-wifi-error text-12" />
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

<route lang="json">{
  "style": {
    "navigationStyle": "custom"
  }
}</route>
