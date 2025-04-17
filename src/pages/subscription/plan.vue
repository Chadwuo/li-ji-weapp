<script setup lang="ts">
import { storeToRefs } from 'pinia'
import VipEquity from './components/VipEquity.vue'

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
  <div>
    <div class="mx-3 h-full flex flex-col items-center pb-32">
      <div
        class="bg-[url('https://liji.poemcode.cn/oss/assets/subscription/congratulate.webp')] bg-contain bg-no-repeat text-center"
      >
        <div class="mt-6 text-6xl">
          🎉
        </div>
        <div class="mt-4 text-xl font-bold">
          永久VIP会员 限时 1 折起
        </div>
        <div class="mt-2 text-sm text-gray">
          为效率和情怀充值，让你的人情往来记账更高效
        </div>
      </div>
      <div class="mt-6 w-full bg-[length:100%_100%] bg-[url('https://liji.poemcode.cn/oss/assets/subscription/price.webp')] bg-no-repeat">
        <div class="justify-between p-5">
          <div class="text-xl text-[#985426] font-bold">
            {{ subscriptionPlan?.title }}
          </div>
          <div class="mt-2 text-slate-500">
            {{ subscriptionPlan?.desc }}
          </div>
          <div class="my-2 text-center text-[#CD7F32]">
            <div>
              <span class="font-bold">￥</span>
              <span class="text-2xl font-bold">{{ subscriptionPlan?.price }}</span>
              <span class="ml-2 text-lg text-gray font-bold line-through">￥98</span>
            </div>
          </div>
        </div>
      </div>
      <vip-equity class="mt-6 pb-6" />
    </div>
    <div class="fixed bottom-0 w-full rounded-t-xl bg-white pt-6">
      <div class="mx-3">
        <wd-button block :loading="loading" loading-color="#F87171" @click="pay">
          <div class="font-bold">
            <span>￥</span>
            <span>{{ subscriptionPlan?.price }}</span>
            <span class="ml-2">立即购买</span>
          </div>
        </wd-button>
        <div class="mt-2 text-xs text-gray">
          * 你购买的是永久会员权益，在交易成功后的一年内（支付平台支持的最长时间），可以申请无条件退款。
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
