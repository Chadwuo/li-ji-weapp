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
      success() {
        uni.showToast({
          title: '支付成功 谢谢！',
          icon: 'none',
        })
        if (userInfo.value) {
          userInfo.value.isVip = true
        }
      },
      fail(res) {
        uni.showToast({
          title: res.errMsg,
          icon: 'none',
        })
      },
      complete() {
        loading.value = false
      },
    })
  }
}
</script>

<template>
  <div class="mx-3 h-full flex flex-col items-center">
    <div
      class="bg-[url('https://poemcode.cn/liji-oss/assets/subscription/countdown_streamer.png')] bg-contain bg-no-repeat text-center"
    >
      <div class="mt-6 text-6xl">
        🎉
      </div>
      <div class="mt-4 text-2xl">
        永久会员限时优惠活动
      </div>
      <div class="mt-2 text-sm text-gray">
        为效率和情怀充值，让你的人情往来记账更高效
      </div>
    </div>
    <div
      class="mt-6 h-52 w-full bg-[url('https://poemcode.cn/liji-oss/assets/subscription/vip_price_bg.png')] bg-contain bg-no-repeat"
    >
      <div class="p-5 text-amber">
        <div class="text-2xl font-bold">
          礼记永久会员权益
        </div>
        <div class="mt-3 flex space-x-3">
          <div>家庭成员无上限</div>
          <div>VIP身份标识</div>
          <!-- <div>敬请期待</div> -->
        </div>
        <div class="mt-14 text-2xl font-bold">
          <span class="text-sm">￥</span> 29.9
        </div>
      </div>
    </div>
    <div v-if="!userInfo?.isVip" class="mt-auto w-full">
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
