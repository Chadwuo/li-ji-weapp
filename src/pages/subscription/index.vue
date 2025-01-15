<script setup lang="ts">
import { storeToRefs } from 'pinia'

const loading = ref(false)
const { userInfo } = storeToRefs(useAuthStore())
const pay = async () => {
  loading.value = true
  const res = await apiWechatPayCreatePayPost({
    planId: 1,
  })
  if (res.succeeded && res.data) {
    const payData = res.data.singInfo
    wx.requestPayment({
      ...payData,
      success(res) {
        console.log('支付成功', res)
      },
      fail(res) {
        console.log('支付失败', res)
      },
      complete() {
        loading.value = false
      },
    })
  }
}

</script>

<template>
  <div class="mx-3">
    
    <wd-button block :loading="loading" loading-color="#F87171" @click="pay">
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
    "navigationBarTitleText": ""
  }
}</route>
