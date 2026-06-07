<script setup lang="ts">
import { useDialog } from '@wot-ui/ui'
import { resolveAssetUrl } from '@/utils'
import VipEquity from './components/VipEquity.vue'

definePage({
  layout: false,
  style: {
    navigationBarTitleText: '',
  },
})
const planId = 1
const dialog = useDialog()
const loading = ref(false)
const authStore = useAuthStore()
const { loadUserInfo } = authStore
const subscriptionPlan = ref<Api.SubscriptionPlan>()

const loadSubscriptionPlanData = async () => {
  subscriptionPlan.value = await apiSubscriptionPlanGet({ planId })
}

const syncMemberStatusAfterPayment = async (outTradeNumber: string) => {
  await apiSubscriptionSyncMemberStatusFromPaymentGatewayPost({
    outTradeNumber,
  }).catch(() => undefined)
  await loadUserInfo()
}

const xPay = async () => {
  loading.value = true
  try {
    const { singInfo, outTradeNumber } = await apiSubscriptionCreateXPayPost({
      planId,
    })

    wx.requestVirtualPayment({
      mode: singInfo.mode,
      signData: singInfo.signData as unknown as WechatMiniprogram.SignData,
      paySig: singInfo.paySig,
      signature: singInfo.signature,
      async success() {
        await syncMemberStatusAfterPayment(outTradeNumber)
        dialog.alert({
          icon: 'success',
          title: '支付成功',
          msg: '感谢你的支持！如果你有任何问题或需要帮助，请随时联系我们的客服团队。',
        }).then(() => {
          uni.redirectTo({
            url: '/pages/subscription/index',
          })
        })
      },
      fail({ errCode }) {
        if (errCode === -2) {
          uni.showToast({
            title: '支付取消',
            icon: 'none',
          })
        }
        else {
          dialog.alert({
            icon: 'danger',
            title: '支付失败',
            msg: `请稍后再试(${errCode})`,
          })
        }
      },
      complete() {
        loading.value = false
      },
    })
  }
  catch {
    loading.value = false
    uni.showToast({
      title: '创建支付订单失败，请稍后再试',
      icon: 'none',
    })
  }
}

const h5Pay = async () => {
  loading.value = true
  try {
    const { singInfo } = await apiSubscriptionCreateH5PayPost({
      planId,
    })
    uni.navigateTo({
      url: singInfo.h5Url,
    })
  }
  catch {
    uni.showToast({
      title: '创建支付订单失败，请稍后再试',
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}

const couponPay = async () => {
  dialog.prompt({
    title: '优惠码兑换',
    inputProps: {
      placeholder: '请输入优惠码',
    },
    inputPattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    inputError: '无效的优惠码',
  }).then(async ({ action, value }) => {
    if (action === 'confirm') {
      uni.showLoading({
        title: '兑换中...',
      })
      await apiSubscriptionRedeemCouponPost({
        couponCode: value,
      })
      await loadUserInfo()
      uni.redirectTo({
        url: '/pages/subscription/index',
      })
      uni.showToast({
        title: '兑换成功!',
        icon: 'success',
      })
    }
  })
}

const price = computed(() => {
  return (subscriptionPlan.value?.price ?? 0) / 100
})

onLoad(async () => {
  await loadSubscriptionPlanData()
})
</script>

<template>
  <div>
    <div class="mx-3 h-full pb-[152px] space-y-3">
      <div
        class="bg-contain bg-no-repeat text-center"
        :style="{ 'background-image': `url(${resolveAssetUrl('/oss/assets/subscription/congratulate.webp')})` }"
      >
        <div class="mt-6 text-6xl">
          🎉
        </div>
        <div class="mt-4 text-xl font-bold">
          永久 VIP 会员 限时优惠活动
        </div>
        <div class="mt-2 text-sm text-gray">
          为效率和情怀充值，让你的人情往来记账更高效
        </div>
      </div>
      <div
        class="w-full bg-[length:100%_100%] bg-no-repeat"
        :style="{ 'background-image': `url(${resolveAssetUrl('/oss/assets/subscription/vip_price_bg.webp')})` }"
      >
        <div class="h-28 flex flex-col p-5">
          <div class="ml-8 text-xl text-[#9F5300] font-bold">
            {{ subscriptionPlan?.title }}
          </div>
          <div class="my-3 ml-8 text-[#9F5300]">
            {{ subscriptionPlan?.desc }}
          </div>
          <div class="my-auto text-center">
            <div>
              <span class="text-lg text-red font-bold">￥</span>
              <span class="text-3xl text-red font-bold">{{ price }}</span>
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
        <!-- #ifdef MP-WEIXIN -->
        <wd-button round block :loading="loading" loading-color="#F87171" @click="xPay">
          <div class="font-bold">
            <span>￥</span>
            <span>{{ price }}</span>
            <span class="ml-2">立即购买</span>
          </div>
        </wd-button>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <wd-button round block :loading="loading" loading-color="#F87171" @click="h5Pay">
          <div class="font-bold">
            <span>￥</span>
            <span>{{ price }}</span>
            <span class="ml-2">立即购买</span>
          </div>
        </wd-button>
        <!-- #endif -->
        <div class="mt-2 text-xs text-gray">
          * 你购买的是永久会员权益，在交易成功后的一年内（支付平台支持的最长时间），可以申请无条件退款。
        </div>
      </div>
      <uv-safe-bottom />
    </div>
    <wd-dialog />
  </div>
</template>

<style lang="scss" scoped></style>
