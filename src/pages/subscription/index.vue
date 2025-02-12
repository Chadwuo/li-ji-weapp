<script setup lang="ts">
// import { storeToRefs } from 'pinia'

const loading = ref(false)
// const { userInfo } = storeToRefs(useAuthStore())
const pay = async () => {
  loading.value = true
  const res = await apiWechatPayCreatePayPost({
    planId: 1,
  })
  if (res.succeeded && res.data) {
    const payData = res.data.singInfo
    wx.requestPayment({
      ...payData,
      // success(res) {
      //   console.log('支付成功', res)
      // },
      // fail(res) {
      //   console.log('支付失败', res)
      // },
      complete() {
        loading.value = false
      },
    })
  }
}
</script>

<template>
  <div class="mx-3 h-full flex flex-col items-center">
    <div class="bg-[url('https://poemcode.cn/liji-oss/assets/subscription/countdown_streamer.png')] bg-contain bg-no-repeat text-center">
      <div class="mt-6 text-6xl">
        🎉
      </div>
      <div class="mt-4 text-2xl">
        永久会员限时优化活动
      </div>
      <div class="mt-2 text-sm text-gray">
        为效率和人情充值，让你的时间管理更高效
      </div>
    </div>
    <img src="https://poemcode.cn/liji-oss/assets/subscription/price.png" class="mt-6 w-full">
    <div class="mt-auto w-full">
      <wd-button block :loading="loading" loading-color="#F87171" @click="pay">
        立即购买
      </wd-button>
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
