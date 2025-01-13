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
</script>

<template>
  <div>
    <wd-button @click="pay">
      立即购买
    </wd-button>

    <div>{{ userInfo?.id }}</div>
    <div>{{ userInfo?.nickName }}</div>
    <div>{{ userInfo?.isVip }}</div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
    "style": {
        "navigationBarTitleText": "支持礼记"
    }
}
</route>
