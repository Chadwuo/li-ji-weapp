<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { userInfo } = storeToRefs(useAuthStore())
const pay = async () => {
  const res = await apiWechatPayCreatePayPost({
    planId: 1,
  })
  if (res.succeeded) {
    const payData = res.data.singInfo
    wx.requestPayment({
      timeStamp: payData.timeStamp,
      nonceStr: payData.nonceStr,
      package: payData.package,
      signType: payData.signType,
      paySign: payData.paySign,
      success(res) {
        console.log('支付成功', res)
      },
      fail(res) {
        console.log('支付失败', res)
      },
    })
  }
}
const textArray = ref([
  '欢迎使用',
])
const back = () => {
  uni.navigateBack()
}
const loading = ref(false)
</script>

<template>
  <div class="mx-3">
    <wd-navbar custom-class=" bg-transparent" fixed placeholder @click-left="back" leftArrow :bordered="false"
      safe-area-inset-top custom-style="background-color: transparent !important;">
      <template #title>
        <wd-notice-bar type="info" direction="vertical" :text="textArray" :delay="3" custom-class="text-center mt-1" />
      </template>
    </wd-navbar>
    <wd-button @click="pay" block :loading="loading" loading-color="#F87171">
      立即购买
    </wd-button>

    <div>{{ userInfo?.id }}</div>
    <div>{{ userInfo?.nickName }}</div>
    <div>{{ userInfo?.isVip }}</div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">{
  "style": {
    "navigationStyle": "custom"
  }
}</route>
