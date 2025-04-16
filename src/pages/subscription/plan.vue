<script setup lang="ts">
import { storeToRefs } from 'pinia'

const loading = ref(false)
const { userInfo } = storeToRefs(useAuthStore())
const subscriptionPlan = ref<Api.SubscriptionPlan>()

const loadSubscriptionPlanData = async () => {
  const res = await apiSubscriptionPlanGet()
  if (res.succeeded && res.data) {
    subscriptionPlan.value = res.data
  }
}

const pay = async () => {
  loading.value = true
  const res = await apiSubscriptionCreatePayPost({
    planId: 2,
  })
  if (res.succeeded && res.data) {
    const payData = res.data.singInfo
    wx.requestPayment({
      ...payData,
      async success() {
        const { data } = await apiUserMemberStatusPut()
        if (data) {
          userInfo.value = data
          uni.showToast({
            title: '支付成功 谢谢！',
            icon: 'success',
          })
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

onLoad(async () => {
  await loadSubscriptionPlanData()
})
</script>

<template>
  <div class="mx-3 h-full flex flex-col items-center">
    <div
      class="bg-[url('https://liji.poemcode.cn/oss/assets/subscription/congratulate.webp')] bg-contain bg-no-repeat text-center"
    >
      <div class="mt-6 text-6xl">
        🎉
      </div>
      <div class="mt-4 text-2xl">
        开通永久VIP会员
      </div>
      <div class="mt-2 text-sm text-gray">
        为效率和情怀充值，让你的人情往来记账更高效
      </div>
    </div>
    <div
      class="mt-6 h-52 w-full bg-[url('https://liji.poemcode.cn/oss/assets/subscription/vip_price.webp')] bg-contain bg-no-repeat"
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
          <div>
            <span class="font-bold">￥</span>
            <span class="text-2xl font-bold">{{ subscriptionPlan?.price }}</span>
            <span class="ml-2 text-gray line-through">￥98</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mt-6">
      会员权益
    </div> -->
    <div class="fixed bottom-0 w-full rounded-t-xl bg-white py-6">
      <div class="mx-3">
        <wd-button block :loading="loading" loading-color="#F87171" @click="pay">
          <div class="font-bold">
            <span>￥</span>
            <span>{{ subscriptionPlan?.price }}</span>
            <span class="ml-2">立即购买</span>
          </div>
        </wd-button>
        <div class="mt-2 text-xs text-gray">
          你购买的是永久会员权益，在交易成功后的一年内（支付平台支持的最长时间），可以申请无条件退款。
        </div>
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
