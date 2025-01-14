<script setup lang="ts">
import { storeToRefs } from 'pinia'

const loading = ref(false)
const textArray = ref([
  '欢迎使用',
])
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

const back = () => {
  uni.navigateBack()
}
</script>

<template>
  <div class="mx-3">
    <wd-navbar custom-class=" bg-transparent" :bordered="false" safe-area-inset-top leftarrow placeholder fixed
               custom-style="background-color: transparent !important;" @click-left="back"
    >
      <template #title>
        <wd-notice-bar type="info" direction="vertical" :text="textArray" :delay="3" custom-class="text-center mt-1" />
      </template>
    </wd-navbar>
    <wd-button block :loading="loading" loading-color="#F87171" @click="pay">
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
    "navigationStyle": "custom"
  }
}
</route>
