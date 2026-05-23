<script setup lang="ts">
import { storeToRefs } from 'pinia'

definePage({
  style: {
    navigationStyle: 'custom',
  },
})

const serviceUrl = import.meta.env.VITE_SERVICE_URL
const { userInfo, isVip } = storeToRefs(useAuthStore())
const { userFamilies, loadUserFamilies } = useUserFamilies()
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
        text: '会员限时折扣，享专属服务 >',
      }
  }
})
const jinrishici = ref('')

onLoad(() => {
  loadUserFamilies()
  jinrishiciLoad((result: any) => {
    jinrishici.value = result.data.content
  })
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

const quickActions = [
  {
    title: '亲友标签',
    desc: '分类管理',
    icon: 'i-hugeicons-hashtag',
    tone: 'tone-rose',
    url: '/pages/friend/tag',
  },
  {
    title: '回收站',
    desc: '敬请期待',
    icon: 'i-hugeicons-recycle-02',
    tone: 'tone-emerald',
  },
  {
    title: '人情债',
    desc: '敬请期待',
    icon: 'i-hugeicons-notebook',
    tone: 'tone-amber',
  },
  {
    title: '小工具',
    desc: '日历宜忌',
    icon: 'i-hugeicons-tools',
    tone: 'tone-sky',
    url: '/pages/tools/index',
  },
]

const cellTonePalette = [
  'cell-tone-coral',
  'cell-tone-cyan',
  'cell-tone-indigo',
  'cell-tone-lime',
  'cell-tone-violet',
  'cell-tone-orange',
  'cell-tone-slate',
]

const mineCells = [
  {
    title: '分享好友',
    icon: 'i-hugeicons-share-01',
    openType: 'share',
  },
  {
    title: '常见问题',
    icon: 'i-hugeicons-bubble-chat-question',
    url: '/pages/faq/index',
  },
  {
    title: '个人设置',
    icon: 'i-hugeicons-settings-03',
    url: '/pages/settings/index',
  },
  {
    title: '关于礼记',
    icon: 'i-hugeicons-information-circle',
    url: '/pages/about/index',
  },
]

const getCellTone = (index: number) => cellTonePalette[index % cellTonePalette.length]

const onQuickActionClick = (item: typeof quickActions[number]) => {
  if (!item.url) {
    uni.showToast({
      title: '功能暂未开放',
      icon: 'none',
    })
    return
  }

  uni.navigateTo({
    url: item.url,
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
const userAvatar = computed(() => {
  const avatar = userInfo.value?.avatar
  if (avatar?.startsWith('http') || avatar?.startsWith('/static'))
    return avatar
  return `${serviceUrl}${avatar}`
})
</script>

<template>
  <div :style="{ 'padding-top': `${paddingTop || 55}px` }">
    <div class="mx-3 space-y-3">
      <div class="flex items-center" @click="toSettings">
        <wd-avatar :src="userAvatar" :size="64" />
        <div class="ml-3">
          <div class="text-lg">
            {{ welcome() }}，{{ userInfo?.nickName }}
          </div>
          <div class="mt-1 text-sm text-gray">
            {{ jinrishici }}
          </div>
        </div>
        <div class="i-hugeicons-settings-03 ml-auto text-xl" />
      </div>
      <div>
        <div
          class="h-18 flex bg-contain bg-no-repeat px-4 -mb-4"
          :style="{ 'background-image': `url(${serviceUrl}/oss/assets/subscription/vip_equity_bg.webp)` }"
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

        <div class="rounded-2xl bg-white p-2">
          <wd-cell v-if="userFamilies && userFamilies.length" center is-link to="/pages/family/index" size="large">
            <template #title>
              <wd-avatar-group>
                <template v-for="i in userFamilies" :key="i.userId">
                  <wd-avatar :src="i.avatar" size="medium" />
                </template>
              </wd-avatar-group>
            </template>
            <div v-if="userFamilies.length < 5">
              家人共享
            </div>
          </wd-cell>
          <wd-cell v-else title="开通家人共享" is-link to="/pages/family/index" size="large" center>
            <template #prefix>
              <div class="i-hugeicons-home-12 mr-2 text-lg text-red" />
            </template>
          </wd-cell>
        </div>
      </div>

      <div class="quick-card rounded-2xl bg-white p-3">
        <div class="mb-3 flex items-center justify-between px-1">
          <div class="text-base text-gray-900 font-medium">
            常用功能
          </div>
          <div class="text-xs text-gray-400">
            快捷入口
          </div>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="item in quickActions"
            :key="item.title"
            class="quick-action"
            hover-class="quick-action--hover"
            @click="onQuickActionClick(item)"
          >
            <div class="quick-action__icon" :class="item.tone">
              <div :class="item.icon" />
            </div>
            <div class="quick-action__title">
              {{ item.title }}
            </div>
            <div class="quick-action__desc">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl bg-white p-2">
        <template v-for="(item, index) in mineCells" :key="item.title">
          <button v-if="item.openType === 'share'" class="reset-button" open-type="share">
            <wd-cell is-link :title="item.title" size="large" center>
              <template #prefix>
                <div class="cell-icon" :class="getCellTone(index)">
                  <div :class="item.icon" />
                </div>
              </template>
            </wd-cell>
          </button>
          <wd-cell v-else :title="item.title" is-link :to="item.url" size="large" center>
            <template #prefix>
              <div class="cell-icon" :class="getCellTone(index)">
                <div :class="item.icon" />
              </div>
            </template>
          </wd-cell>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quick-card {
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.quick-action {
  min-width: 0;
  min-height: 108rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20rpx;
  transition:
    background-color 0.18s ease,
    transform 0.18s ease;
}

.quick-action--hover {
  background-color: #f8fafc;
  transform: scale(0.97);
}

.quick-action__icon {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999rpx;
  font-size: 34rpx;
}

.cell-icon {
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16rpx;
  border-radius: 18rpx;
  font-size: 32rpx;
}

.tone-rose {
  color: #e25563;
  background-color: #fff1f3;
}

.tone-emerald {
  color: #18a47f;
  background-color: #ecfdf7;
}

.tone-amber {
  color: #c27a18;
  background-color: #fff7e8;
}

.tone-sky {
  color: #2d8edb;
  background-color: #eef7ff;
}

.tone-slate {
  color: #64748b;
  background-color: #f3f6f9;
}

.cell-tone-coral {
  color: #df5b57;
  background-color: #fff1ef;
}

.cell-tone-cyan {
  color: #1394a6;
  background-color: #ecfbfd;
}

.cell-tone-indigo {
  color: #5b6fd6;
  background-color: #f0f3ff;
}

.cell-tone-lime {
  color: #5f9f2f;
  background-color: #f3faec;
}

.cell-tone-violet {
  color: #8a63d2;
  background-color: #f7f1ff;
}

.cell-tone-orange {
  color: #c97824;
  background-color: #fff6eb;
}

.cell-tone-slate {
  color: #64748b;
  background-color: #f3f6f9;
}

.quick-action__title {
  max-width: 100%;
  margin-top: 12rpx;
  color: #1f2937;
  font-size: 26rpx;
  font-weight: 500;
  line-height: 1.2;
}

.quick-action__desc {
  max-width: 100%;
  margin-top: 4rpx;
  color: #9ca3af;
  font-size: 22rpx;
  line-height: 1.2;
}
</style>
