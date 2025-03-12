<script setup lang="ts">
import BookPage from './components/BookPage.vue'
import GiftOutPage from './components/GiftOutPage.vue'

enum TabType {
  BOOKS = 'books',
  GIFT_OUT = 'giftOut',
}
const tab = ref<TabType>(TabType.BOOKS)

const bookPageRef = ref<InstanceType<typeof BookPage> | null>(null)
const giftOutPageRef = ref<InstanceType<typeof GiftOutPage> | null>(null)

onShow(async () => {
  bookPageRef.value?.refreshAsync()
  giftOutPageRef.value?.refreshAsync()
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
const handleAddClick = () => {
  if (tab.value === TabType.BOOKS) {
    bookPageRef.value?.handleAdd()
  }
  else {
    giftOutPageRef.value?.handleAdd()
  }
}

const onSearchClick = () => {
  uni.navigateTo({
    url: '/pages/search/index',
    events: {
      // eslint-disable-next-line unused-imports/no-unused-vars
      acceptDataFromOpenedPage(e: string) {
        if (tab.value === TabType.BOOKS) {
          bookPageRef.value?.refreshAsync()
        }
        else {
          giftOutPageRef.value?.refreshAsync()
        }
      },
    },
  })
}
</script>

<template>
  <div class="h-full bg-[url('https://poemcode.cn/liji-oss/assets/bg/bg_giftout.png')] bg-contain bg-no-repeat">
    <safe-area-inset-top />
    <div class="mx-3">
      <wd-search custom-class="!p-0 w-52" light hide-cancel placeholder-left @click="onSearchClick" />
      <div class="mt-2 flex items-center justify-between">
        <div class="flex items-center">
          <div class="bg-contain bg-bottom bg-no-repeat p-2"
               :class="[tab === TabType.BOOKS ? 'text-red text-xl font-bold bg-[url(\'/static/shadow_r.png\')]' : 'text-gray text-lg']"
               @click="tab = TabType.BOOKS"
          >
            礼簿
          </div>
          <div class="bg-contain bg-bottom bg-no-repeat p-2"
               :class="[tab === TabType.GIFT_OUT ? 'text-red text-xl font-bold bg-[url(\'/static/shadow_r.png\')]' : 'text-gray text-lg']"
               @click="tab = TabType.GIFT_OUT"
          >
            送礼
          </div>
        </div>
        <div class="p-2" @click="handleAddClick()">
          <i class="i-hugeicons-plus-sign-circle text-lg text-red" />
        </div>
      </div>

      <book-page v-show="tab === TabType.BOOKS" ref="bookPageRef" />
      <gift-out-page v-show="tab === TabType.GIFT_OUT" ref="giftOutPageRef" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json" type="home">
{
  "style": {
    "navigationStyle": "custom",
    "enablePullDownRefresh": true
  }
}
</route>
