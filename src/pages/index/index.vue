<script setup lang="ts">
import BookPage from './components/BookPage.vue'
import GiftOutPage from './components/GiftOutPage.vue'

const authStore = useAuthStore()

enum TabType {
  BOOKS = 'books',
  GIFT_OUT = 'giftOut',
}
const tab = ref<TabType>(TabType.BOOKS)

const bookPageRef = ref<InstanceType<typeof BookPage> | null>(null)
const giftOutPageRef = ref<InstanceType<typeof GiftOutPage> | null>(null)

onShow(async () => {
  if (!authStore.isLogin || !bookPageRef.value || !giftOutPageRef.value)
    return
  await bookPageRef.value.refreshAsync()
  await giftOutPageRef.value.refreshAsync()
})

onPullDownRefresh(async () => {
  if (tab.value === TabType.BOOKS) {
    await bookPageRef.value?.refreshAsync()
  }
  else {
    await giftOutPageRef.value?.refreshAsync()
  }
  uni.stopPullDownRefresh()
})

onReachBottom(() => {
  if (tab.value === TabType.BOOKS) {
    bookPageRef.value?.loadMoreAsync()
  }
  else {
    giftOutPageRef.value?.loadMoreAsync()
  }
})
const addNew = () => {
  if (tab.value === TabType.BOOKS) {
    bookPageRef.value?.handleAdd()
  }
  else {
    giftOutPageRef.value?.handleAdd()
  }
}

const performSearch = () => {
  uni.navigateTo({
    url: '/pages/search/index',
    events: {
      acceptDataFromOpenedPage(e: string) {
        if (tab.value === TabType.BOOKS) {
          bookPageRef.value?.handleSearch(e)
        }
        else {
          giftOutPageRef.value?.handleSearch(e)
        }
      },
    },
  })
}

const bgImg = computed(() => {
  if (tab.value === TabType.BOOKS) {
    return 'https://liji.poemcode.cn/oss/assets/bg/bg_book.png'
  }
  else {
    return 'https://liji.poemcode.cn/oss/assets/bg/bg_giftout.png'
  }
})
</script>

<template>
  <div class="h-full bg-contain bg-no-repeat" :style="{ 'background-image': `url(${bgImg})` }">
    <safe-area-inset-top />
    <div class="mx-3">
      <div class="w-36 flex items-center rounded-full bg-white p-1 px-2 text-gray" @click="performSearch()">
        <i class="i-hugeicons-search-02" />
        <div class="ms-1">
          搜索人情往来
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between">
        <div class="flex items-center">
          <div class="bg-contain bg-bottom bg-no-repeat p-2"
               :class="[tab === TabType.BOOKS ? 'text-red text-2xl font-bold line-bg' : 'text-gray-500 text-lg']"
               @click="tab = TabType.BOOKS"
          >
            礼簿
          </div>
          <div class="bg-contain bg-bottom bg-no-repeat p-2"
               :class="[tab === TabType.GIFT_OUT ? 'text-red text-2xl font-bold line-bg' : 'text-gray-500 text-lg']"
               @click="tab = TabType.GIFT_OUT"
          >
            送礼
          </div>
        </div>
        <div class="p-2" @click="addNew()">
          <i class="i-hugeicons-plus-sign-circle text-xl text-red" />
        </div>
      </div>

      <wd-transition :show="tab === TabType.BOOKS" name="slide-left">
        <book-page ref="bookPageRef" />
      </wd-transition>
      <wd-transition :show="tab === TabType.GIFT_OUT" name="slide-right">
        <gift-out-page ref="giftOutPageRef" />
      </wd-transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line-bg {
  background-image: url('/static/shadow_r.png');
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
