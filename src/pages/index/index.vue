<script setup lang="ts">
import BookPage from './components/BookPage.vue'
import GiftPage from './components/GiftPage.vue'

definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    enablePullDownRefresh: true,
  },
})

const serviceUrl = import.meta.env.VITE_SERVICE_URL
const bookPageRef = ref<InstanceType<typeof BookPage> | null>(null)
const giftPageRef = ref<InstanceType<typeof GiftPage> | null>(null)
const activeTab = ref<'book' | 'gift'>('book')
const cur = computed(() => {
  switch (activeTab.value) {
    case 'book':
      return {
        bgImg: `${serviceUrl}/oss/assets/bg/bg_book.png`,
        loadMoreAsync: () => {
          bookPageRef.value?.loadMoreAsync()
        },
        refreshAsync: () => {
          bookPageRef.value?.refreshAsync()
        },
      }
    case 'gift':
      return {
        bgImg: `${serviceUrl}/oss/assets/bg/bg_gift.png`,
        loadMoreAsync: () => {
          giftPageRef.value?.loadMoreAsync()
        },
        refreshAsync: () => {
          giftPageRef.value?.refreshAsync()
        },
      }
    default:
      return null
  }
})

const onAdd = () => {
  if (activeTab.value === 'book') {
    uni.navigateTo({
      url: '/pages/book/edit',
    })
  }
  else {
    uni.navigateTo({
      url: '/pages/gift/edit',
    })
  }
}

watch(activeTab, () => {
  nextTick(() => {
    cur.value?.refreshAsync()
  })
})

onShow(() => {
  cur.value?.refreshAsync()
})

onPullDownRefresh(async () => {
  await cur.value?.refreshAsync()
  uni.stopPullDownRefresh()
})

onReachBottom(() => {
  cur.value?.loadMoreAsync()
})
</script>

<template>
  <div class="h-full bg-contain bg-no-repeat" :style="{ 'background-image': `url(${cur?.bgImg})` }">
    <safe-area-inset-top />
    <div class="mx-3">
      <div class="flex items-center space-x-xl">
        <div class="bg-contain bg-bottom bg-no-repeat"
             :class="[activeTab === 'book' ? 'text-red text-2xl font-bold line-bg' : 'text-gray-500 text-lg']"
             @click="activeTab = 'book'"
        >
          礼簿
        </div>
        <div class="bg-contain bg-bottom bg-no-repeat"
             :class="[activeTab === 'gift' ? 'text-red text-2xl font-bold line-bg' : 'text-gray-500 text-lg']"
             @click="activeTab = 'gift'"
        >
          人情往来
        </div>
      </div>
      <wd-tabs v-model="activeTab" swipeable animated>
        <wd-tab name="book">
          <book-page ref="bookPageRef" />
        </wd-tab>
        <wd-tab name="gift">
          <gift-page ref="giftPageRef" />
        </wd-tab>
      </wd-tabs>
    </div>
    <wd-fab v-show="activeTab === 'gift'" :gap="{ bottom: 64 }" :expandable="false" @click="onAdd" />
  </div>
</template>

<style lang="scss" scoped>
.line-bg {
  background-image: url('/static/title_line.webp');
}

:deep(.wd-tabs) {
  background: transparent !important;
}

:deep(.wd-tabs__nav) {
  display: none;
}
</style>
