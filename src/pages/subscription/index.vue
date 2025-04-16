<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { userInfo } = storeToRefs(useAuthStore())
const vipType = computed(() => {
  if (userInfo.value?.accountType === 1) {
    return {
      text: '创始会员',
      color: 'text-[#CD7F32]',
      bg: 'https://liji.poemcode.cn/oss/assets/subscription/vip_price.webp',
    }
  }
  else if (userInfo.value?.accountType === 2) {
    return {
      text: '赠送会员',
      color: 'text-red',
      bg: 'https://liji.poemcode.cn/oss/assets/subscription/vip_price.webp',
    }
  }
  else if (userInfo.value?.accountType === 9) {
    return {
      text: '永久会员',
      color: 'text-amber',
      bg: 'https://liji.poemcode.cn/oss/assets/subscription/vip_price.webp',
    }
  }
  else {
    return {
      text: '普通用户',
      color: 'text-gray',
      bg: 'https://liji.poemcode.cn/oss/assets/subscription/vip_price.webp',
    }
  }
})

onLoad(() => {
  if (userInfo.value?.accountType === 0) {
    uni.navigateTo({
      url: '/pages/subscription/plan',
    })
  }
})
</script>

<template>
  <div class="mx-3 h-full flex flex-col items-center">
    <div class="mt-6 h-52 w-full bg-contain bg-no-repeat" :style="{ 'background-image': `url(${vipType.bg})` }">
      <div class="p-5">
        <div class="text-2xl font-bold" :class="vipType.color">
          {{ vipType.text }}
        </div>
        <div class="mt-3 flex space-x-3">
          <div>不限共享人数</div>
          <div>VIP身份展示</div>
          <div>专属客服</div>
        </div>

        <div class="mt-14 flex text-sm">
          <div class="rounded-lg bg-black px-2 text-center text-xs leading-5" :class="vipType.color">
            持卡人
          </div>
          <div class="ms-2 text-slate-500 font-serif">
            {{ userInfo?.nickName }}
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mt-6">
      会员权益
    </div> -->
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
