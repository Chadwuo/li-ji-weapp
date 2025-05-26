<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { userInfo, userFamilys, isVip } = storeToRefs(useAuthStore())
const vipLevel = computed(() => {
  switch (userInfo.value?.accountType) {
    case 1:
      return {
        name: 'VIP PRO',
        text: '仅限百席，致敢于梦想的⌜创始人⌟',
      }
    case 2:
      return {
        name: 'VIP',
        text: '专属礼遇，馈赠予重要伙伴的特殊权益',
      }
    case 9:
      return {
        name: 'SVIP',
        text: '终身尊享，解锁平台无期限的特权礼遇',
      }
    default:
      return {
        name: '普通用户',
        text: '会员限时 1 折，享专属服务 >',
      }
  }
})
const jinrishici = ref('')
const staticData = ref<Api.StatOverall>({
  inCount: 0,
  outCount: 0,
  inTotal: 0,
  outTotal: 0,
})
const statistics = async () => {
  apiStatisticsOverallGet().then((res) => {
    if (res.succeeded && res.data) {
      staticData.value = res.data
    }
  })
}

onLoad(() => {
  jinrishiciLoad((result: any) => {
    jinrishici.value = result.data.content
  })
})

onShow(() => {
  statistics()
})

const toSettings = () => {
  uni.navigateTo({
    url: '/pages/settings/index',
  })
}

const toSubscription = () => {
  uni.navigateTo({
    url: `/pages/subscription/${isVip.value ? 'index' : 'plan'}`,
  })
}

onShareAppMessage(() => {
  return {
    title: '可能是东半球最好用的人情往来记账工具',
    path: `/pages/index/index`,
    imageUrl: '/static/share/1.png',
  }
})
// #ifdef MP-WEIXIN
const paddingTop = uni.getMenuButtonBoundingClientRect().bottom + 5
// #endif
</script>

<template>
  <div class="bg-[url('https://liji.poetic.ltd/oss/assets/bg/bg_mine.png')] bg-contain bg-no-repeat"
       :style="{ 'padding-top': `${paddingTop || 55}px` }"
  >
    <div class="mx-3 space-y-3">
      <div class="flex items-center" @click="toSettings">
        <uv-avatar :src="userInfo?.avatar" :size="55" />
        <div class="ml-3">
          <div class="text-lg">
            {{ welcome() }}，{{ userInfo?.nickName }}
          </div>
          <div class="mt-1 text-sm text-gray">
            {{ jinrishici }}
          </div>
        </div>
        <div class="i-hugeicons-settings-03 ml-auto text-lg" />
      </div>
      <div>
        <div
          class="h-18 flex bg-[url('https://liji.poetic.ltd/oss/assets/subscription/vip_equity_bg.webp')] bg-contain bg-no-repeat px-4 -mb-4"
          @click="toSubscription"
        >
          <div class="mt-2">
            <div class="text-[#7D3F0B] font-bold">
              {{ vipLevel.name }}
            </div>
            <div class="mt-1 text-sm text-[#985426]">
              {{ vipLevel.text }}
            </div>
          </div>

          <div class="ms-auto mt-4">
            <div class="rounded-full from-[#fed7aa] to-[#d97706] bg-gradient-to-r px-2 py-1 text-sm text-white">
              {{ isVip ? '我的权益' : '立即开通' }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-5 rounded-2xl bg-white p-5">
          <div class="text-center">
            <div class="text-lg text-black font-bold">
              {{ formatMoney(staticData.inTotal) }}
            </div>
            <div class="flex items-center justify-center text-sm text-gray space-x-1">
              <div>收礼({{ staticData.inCount }})</div>
            </div>
          </div>
          <div class="text-center">
            <div class="text-lg text-black font-bold">
              {{ formatMoney(staticData.outTotal) }}
            </div>
            <div class="flex items-center justify-center text-sm text-gray space-x-1">
              <div>送礼({{ staticData.outCount }})</div>
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl bg-white p-2">
        <wd-cell v-if="userFamilys && userFamilys.length" value="家人共享" is-link center to="/pages/family/index">
          <template #title>
            <uv-avatar-group :urls="userFamilys.map((i) => i.avatar)" gap="0.4" />
          </template>
        </wd-cell>
        <wd-cell v-else title="开通家人共享" is-link to="/pages/family/index">
          <template #icon>
            <div class="i-hugeicons-home-12 mx-2 text-lg text-red" />
          </template>
        </wd-cell>
      </div>
      <div class="rounded-2xl bg-white p-2">
        <wd-cell title="亲友标签" is-link to="/pages/friend/tag">
          <template #icon>
            <div class="i-hugeicons-tag-01 mx-2 text-lg text-red" />
          </template>
        </wd-cell>
      </div>
      <div class="rounded-2xl bg-white p-2 space-y-3">
        <!-- <wd-cell title="支持礼记" is-link to="/pages/subscription/index">
          <template #icon>
            <div class="i-hugeicons-thumbs-up mx-2 text-lg text-red" />
          </template>
        </wd-cell> -->
        <!-- <wd-cell title="夸夸礼记" is-link @click="openComment">
          <template #icon>
            <div class="i-hugeicons-thumbs-up mx-2 text-lg text-red" />
          </template>
        </wd-cell> -->
        <button class="reset-button" open-type="share">
          <wd-cell is-link title="分享好友">
            <template #icon>
              <div class="i-hugeicons-share-01 pr-4 text-lg text-green" />
            </template>
          </wd-cell>
        </button>
        <wd-cell title="常见问题" is-link to="/pages/faq/index">
          <template #icon>
            <div class="i-hugeicons-bubble-chat-question mx-2 text-lg text-blue" />
          </template>
        </wd-cell>
        <wd-cell title="个人设置" is-link to="/pages/settings/index">
          <template #icon>
            <div class="i-hugeicons-settings-03 mx-2 text-lg text-gray" />
          </template>
        </wd-cell>
      </div>
    </div>
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
