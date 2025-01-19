<script setup lang="ts">
const { miniProgram } = uni.getAccountInfoSync()
const version = miniProgram.version || '4.0'
</script>

<template>
  <div class="mx-3 bg-[url('https://poemcode.cn/liji-oss/assets/bg/bg_about.webp')] bg-contain bg-no-repeat">
    <div class="mb-4 pt-18 text-center">
      <img class="m-auto h-14 w-14" src="/static/logo.png">
      <div class="my-3">
        <div class="text-xl font-bold">
          礼记
        </div>
        <div class="mt-2 text-sm text-gray">
          v{{ version }} "幽灵倒计时"
        </div>
      </div>
    </div>
    <div class="indent-8 text-sm leading-relaxed">
      专注于记录和管理亲友间的收礼、随礼、份子钱、礼金、心意、礼物、红包等，「礼记」理解中国传统文化中的人情世故，支持多维度查询和统计亲友间的往来记录，提供全家人共享的账本功能，您贴心的人情往来数字记账伙伴。
    </div>
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
