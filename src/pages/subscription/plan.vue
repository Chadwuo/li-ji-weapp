<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMessage } from 'wot-design-uni'
import VipEquity from './components/VipEquity.vue'

const message = useMessage()
const loading = ref(false)
const { userInfo } = storeToRefs(useAuthStore())
const subscriptionPlan = ref<Api.SubscriptionPlan>()

const loadSubscriptionPlanData = async () => {
  const res = await apiSubscriptionPlanGet({ planId: 1 })
  if (res.succeeded && res.data) {
    subscriptionPlan.value = res.data
  }
}

const pay = async () => {
  loading.value = true
  const res = await apiSubscriptionCreatePayPost({
    planId: 1,
  })
  if (res.succeeded && res.data) {
    const { singInfo, outTradeNumber } = res.data
    wx.requestPayment({
      ...singInfo,
      async success() {
        uni.showToast({
          title: '支付成功 谢谢！',
          icon: 'success',
        })
        const { data } = await apiUserMemberStatusPut({
          outTradeNumber,
        })
        if (data) {
          userInfo.value = data
          uni.redirectTo({
            url: '/pages/subscription/index',
          })
        }
      },
      fail() {
        uni.showToast({
          title: '支付取消 下次一定！',
          icon: 'none',
        })
      },
      complete() {
        loading.value = false
      },
    })
  }
}

const couponPay = async () => {
  message
    .prompt({
      title: '优惠码兑换',
      inputPlaceholder: '请输入优惠码',
      inputPattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      inputError: '无效的优惠码',
    })
    .then(async ({ action, value }) => {
      if (action === 'confirm') {
        uni.showLoading({
          title: '兑换中...',
        })
        const { succeeded, data } = await apiUserMemberStatusPut({
          couponCode: value,
        })
        if (succeeded && data) {
          userInfo.value = data
          uni.redirectTo({
            url: '/pages/subscription/index',
          })
          uni.showToast({
            title: '兑换成功!',
            icon: 'success',
          })
        }
      }
    })
}

onLoad(async () => {
  await loadSubscriptionPlanData()
})
</script>

<template>
  <div>
    <div class="mx-3 h-full pb-36 space-y-3">
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
      <div
        class="w-full bg-[length:100%_100%] bg-[url('https://liji.poemcode.cn/oss/assets/subscription/vip_price_bg.webp')] bg-no-repeat"
      >
        <div class="h-28 flex flex-col p-5">
          <div class="ml-8 text-xl text-[#9F5300] font-bold">
            {{ subscriptionPlan?.title }}
          </div>
          <div class="m-2 text-gray">
            {{ subscriptionPlan?.desc }}
          </div>
          <div class="my-auto text-center text-[#9F5300]">
            <div>
              <span class="font-bold">￥</span>
              <span class="text-2xl font-bold">{{ subscriptionPlan?.price }}</span>
              <span class="ml-2 text-lg text-gray font-bold line-through">￥98</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <vip-equity />
      </div>
      <div class="rounded-2xl bg-white p-2">
        <wd-cell title="优惠码兑换" is-link @click="couponPay()">
          <template #icon>
            <div class="i-hugeicons-coupon-percent mx-2 text-lg text-red" />
          </template>
        </wd-cell>
      </div>
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
    <wd-message-box />
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
