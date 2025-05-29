<script setup lang="ts">
import { giftCategory } from '@/constants/app'
import BookPage from './components/BookPage.vue'
import GiftOutPage from './components/GiftOutPage.vue'

const columns = [
  { name: '全部', value: '' },
  ...Object.entries(giftCategory).map(([name, icon]) => ({
    name,
    value: icon,
  })),
]
const authStore = useAuthStore()
const bookPageRef = ref<InstanceType<typeof BookPage> | null>(null)
const giftOutPageRef = ref<InstanceType<typeof GiftOutPage> | null>(null)
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
        handleAdd: () => {
          bookPageRef.value?.handleAdd()
        },
      }
    case 1:
      return {
        bgImg: `${import.meta.env.VITE_SERVICE_URL}/oss/assets/bg/bg_giftout.png`,
        loadMoreAsync: () => {
          giftOutPageRef.value?.loadMoreAsync()
        },
        refreshAsync: () => {
          giftOutPageRef.value?.refreshAsync()
        },
        handleAdd: () => {
          giftOutPageRef.value?.handleAdd()
        },
      }
    default:
      return null
  }
})

onShow(() => {
  if (authStore.isLogin) {
    nextTick(() => {
      cur.value?.refreshAsync()
    })
  }
})

onPullDownRefresh(async () => {
  await cur.value?.refreshAsync()
  uni.stopPullDownRefresh()
})

onReachBottom(() => {
  cur.value?.loadMoreAsync()
})
const addNew = () => {
  cur.value?.handleAdd()
}

const performSearch = () => {
  uni.navigateTo({
    url: '/pages/search/index',
  })
}

const onTabsClick = (item: any) => {
  giftOutPageRef.value?.handleSearch({
    icon: item.value,
  })
}

watch(activeTab, () => {
  nextTick(() => {
    cur.value?.refreshAsync()
  })
})
</script>

<template>
  <div class="h-full bg-contain bg-no-repeat" :style="{ 'background-image': `url(${cur?.bgImg})` }">
    <safe-area-inset-top />
    <div class="mx-3">
      <div class="w-36 flex items-center rounded-full bg-white p-1 px-2 text-gray" @click="performSearch()">
        <i class="i-hugeicons-search-02" />
        <div class="ms-1">
          搜索人情往来
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between">
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
            送礼
          </div>
        </div>
        <div class="py-2 ps-2" @click="addNew()">
          <i class="i-hugeicons-plus-sign-circle text-xl text-red" />
        </div>
      </div>
      <wd-tabs v-model="activeTab" swipeable animated>
        <wd-tab>
          <book-page ref="bookPageRef" />
        </wd-tab>
        <wd-tab>
          <div>
            <uv-tabs :list="columns" line-width="0" line-height="0" :active-style="{
              color: '#f87171',
              fontWeight: 'bold',
              transform: 'scale(1.1)',
            }" :inactive-style="{
              color: '#606266',
              transform: 'scale(1)',
            }" item-style="height: 35px;" @click="onTabsClick"
            />
          </div>
          <gift-out-page ref="giftOutPageRef" />
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
