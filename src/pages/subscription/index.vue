<script setup lang="ts">
import { apiUserSubscriptionGet, apiWxPayCreatePayPost } from '@/api'
import { storeToRefs } from 'pinia'

const loading = ref(false)
const { userInfo } = storeToRefs(useAuthStore())
const isVip = computed(() => userInfo.value?.isVip)
const userSubscription = ref<Api.UserSubscription>()
const subscriptionPlan = ref<Api.SubscriptionPlan>()

const loadUserSubscriptionData = async () => {
  const res = await apiUserSubscriptionGet()
  if (res.succeeded && res.data) {
    userSubscription.value = res.data
  }
}

const loadSubscriptionPlanData = async () => {
  const res = await apiSubscriptionPlanGet()
  if (res.succeeded && res.data) {
    subscriptionPlan.value = res.data
  }
}

const pay = async () => {
  loading.value = true
  const res = await apiWxPayCreatePayPost({
    planId: 1,
  })
  if (res.succeeded && res.data) {
    const payData = res.data.singInfo
    wx.requestPayment({
      ...payData,
      success() {
        uni.showToast({
          title: '支付成功 谢谢！',
          icon: 'success',
        })
        if (userSubscription.value)
          userSubscription.value.outTradeNumber = res.data?.outTradeNumber || ''
        if (userInfo.value)
          userInfo.value.isVip = true
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

onLoad(async () => {
  await loadUserSubscriptionData()
  await loadSubscriptionPlanData()
})
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
          {{ subscriptionPlan?.title }}
        </div>
        <div class="mt-3 flex space-x-3">
          <div>不限共享人数</div>
          <div>VIP身份展示</div>
          <div>专属客服</div>
        </div>

        <div class="mt-14 text-sm">
          <div v-if="isVip">
            NO.{{ userSubscription?.outTradeNumber }}
          </div>
          <div v-else>
            <span class="font-bold">￥</span>
            <span class="text-2xl font-bold">{{ subscriptionPlan?.price }}</span>
            <span class="line-throug ml-2 text-gray">￥68</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mt-6">
      会员权益
    </div> -->
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
