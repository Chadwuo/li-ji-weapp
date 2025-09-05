<script setup lang="ts">
import BookPage from './components/BookPage.vue'
import GiftPage from './components/GiftPage.vue'

const bookPageRef = ref<InstanceType<typeof BookPage> | null>(null)
const giftPageRef = ref<InstanceType<typeof GiftPage> | null>(null)
const activeTab = ref(0)
const cur = computed(() => {
  switch (activeTab.value) {
    case 0:
      return {
        bgImg: `${import.meta.env.VITE_SERVICE_URL}/oss/assets/bg/bg_book.png`,
        loadMoreAsync: () => {
          bookPageRef.value?.loadMoreAsync()
        },
        refreshAsync: () => {
          bookPageRef.value?.refreshAsync()
        },
      }
    case 1:
      return {
        bgImg: `${import.meta.env.VITE_SERVICE_URL}/oss/assets/bg/bg_giftout.png`,
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
             :class="[activeTab === 0 ? 'text-red text-2xl font-bold line-bg' : 'text-gray-500 text-lg']"
             @click="activeTab = 0"
        >
          礼簿
        </div>
        <div class="bg-contain bg-bottom bg-no-repeat"
             :class="[activeTab === 1 ? 'text-red text-2xl font-bold line-bg' : 'text-gray-500 text-lg']"
             @click="activeTab = 1"
        >
          日常往来
        </div>
      </div>
      <wd-tabs v-model="activeTab" swipeable animated>
        <wd-tab>
          <book-page ref="bookPageRef" />
        </wd-tab>
        <wd-tab>
          <gift-page ref="giftPageRef" />
        </wd-tab>
      </wd-tabs>
    </div>
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

<route lang="json" type="home">
{
  "style": {
    "navigationStyle": "custom",
    "enablePullDownRefresh": true
  }
}
</route>
