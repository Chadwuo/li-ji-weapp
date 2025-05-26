<script setup lang="ts">
import BookPage from './components/BookPage.vue'
import GiftOutPage from './components/GiftOutPage.vue'

enum TabType {
  BOOKS = 'books',
  GIFT_OUT = 'giftOut',
}

const authStore = useAuthStore()
const bookPageRef = ref<InstanceType<typeof BookPage> | null>(null)
const giftOutPageRef = ref<InstanceType<typeof GiftOutPage> | null>(null)

const tabs = [{
  name: TabType.BOOKS,
  keyword: '',
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
  handleSearch: (keyword: string) => {
    bookPageRef.value?.handleSearch(keyword)
  },
}, {
  name: TabType.GIFT_OUT,
  keyword: '',
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
  handleSearch: (keyword: string) => {
    giftOutPageRef.value?.handleSearch(keyword)
  },
}]

const curTabName = ref(TabType.BOOKS)
const curTab = computed(() => {
  return tabs.find(tab => tab.name === curTabName.value) || tabs[0]
})

onShow(() => {
  // if (authStore.isLogin) {
  //   nextTick(() => {
  //     curTab.value?.refreshAsync()
  //   })
  // }
  if (!authStore.isLogin || !bookPageRef.value || !giftOutPageRef.value)
    return
  curTab.value.refreshAsync()
})

onPullDownRefresh(async () => {
  await curTab.value.refreshAsync()
  uni.stopPullDownRefresh()
})

onReachBottom(() => {
  curTab.value.loadMoreAsync()
})
const addNew = () => {
  curTab.value.handleAdd()
}

const performSearch = () => {
  uni.navigateTo({
    url: `/pages/search/index?keyword=${curTab.value.keyword}`,
    events: {
      acceptDataFromOpenedPage(e: string) {
        curTab.value.keyword = e
      },
    },
  })
}

watch(() => curTab.value.keyword, (newVal) => {
  curTab.value.handleSearch(newVal)
})
</script>

<template>
  <div class="h-full bg-contain bg-no-repeat" :style="{ 'background-image': `url(${curTab.bgImg})` }">
    <safe-area-inset-top />
    <div class="mx-3">
      <div class="w-36 flex items-center rounded-full bg-white p-1 px-2 text-gray" @click="performSearch()">
        <i class="i-hugeicons-search-02" />
        <div class="ms-1">
          {{ curTab.keyword || '搜索人情往来' }}
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between">
        <div class="flex items-center space-x-xl">
          <div class="bg-contain bg-bottom bg-no-repeat"
               :class="[curTabName === TabType.BOOKS ? 'text-red text-2xl font-bold line-bg' : 'text-gray-500 text-lg']"
               @click="curTabName = TabType.BOOKS"
          >
            礼簿
          </div>
          <div class="bg-contain bg-bottom bg-no-repeat"
               :class="[curTabName === TabType.GIFT_OUT ? 'text-red text-2xl font-bold line-bg' : 'text-gray-500 text-lg']"
               @click="curTabName = TabType.GIFT_OUT"
          >
            送礼
          </div>
        </div>
        <div class="py-2 ps-2" @click="addNew()">
          <i class="i-hugeicons-plus-sign-circle text-xl text-red" />
        </div>
      </div>
      <wd-tabs v-model="curTabName" swipeable animated>
        <wd-tab :name="TabType.BOOKS">
          <book-page ref="bookPageRef" />
        </wd-tab>
        <wd-tab :name="TabType.GIFT_OUT">
          <gift-out-page ref="giftOutPageRef" />
        </wd-tab>
      </wd-tabs>
      <!-- <wd-transition :show="curTab.name === TabType.BOOKS" name="slide-left">
        <book-page ref="bookPageRef" />
      </wd-transition>
      <wd-transition :show="curTab.name === TabType.GIFT_OUT" name="slide-right">
        <gift-out-page ref="giftOutPageRef" />
      </wd-transition> -->
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
