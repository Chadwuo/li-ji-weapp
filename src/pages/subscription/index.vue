<script setup lang="ts">
import { storeToRefs } from 'pinia'

const loading = ref(false)
const { userInfo } = storeToRefs(useAuthStore())
const isVip = computed(() => userInfo.value?.isVip)
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
      fail() {
        uni.showToast({
          title: '支付取消',
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
        {{ isVip ? '您已经是VIP了' : '开通永久VIP会员' }}
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
          <div>不限共享人数</div>
          <div>VIP身份标识</div>
          <!-- <div>敬请期待</div> -->
        </div>

        <div class="mt-14 text-sm">
          <div v-if="isVip">
            NO.202502131889816510038499328
          </div>
          <div v-else>
            <span class="font-bold">￥</span>
            <span class="text-2xl font-bold">29.8</span>
            <span class="line-throug ml-2 text-gray">￥68</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6">
      尊享权益
    </div>
    <div v-if="!isVip" class="fixed bottom-0 w-full rounded-t-xl bg-white py-6">
      <div class="mx-3">
        <wd-button block :loading="loading" loading-color="#F87171" @click="pay">
          立即购买
        </wd-button>
      </div>
      <uv-safe-bottom />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "layout": false,
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>
