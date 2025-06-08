<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import FriendList from '@/pages/friend/components/FriendList.vue'
import GiftOutPage from '@/pages/index/components/GiftOutPage.vue'
import GiftInList from '@/pages/search/components/GiftInList.vue'

const { searchHistory } = storeToRefs(useAppStore())
const keyword = ref<string>('')
const activeTab = ref(0)
const giftInListRef = ref<InstanceType<typeof GiftInList> | null>(null)
const giftOutPageRef = ref<InstanceType<typeof GiftOutPage> | null>(null)
const friendsListRef = ref<InstanceType<typeof FriendList> | null>(null)

const searchResultRef = computed(() => {
  switch (activeTab.value) {
    case 0:
      return giftInListRef.value
    case 1:
      return giftOutPageRef.value
    case 2:
      return friendsListRef.value
    default:
      return null
  }
})

const onSearch = (word?: string) => {
  if (word) {
    keyword.value = word
  }
  if (!keyword.value)
    return
  if (!searchHistory.value?.includes(keyword.value)) {
    searchHistory.value?.unshift(keyword.value)
  }
  nextTick(() => {
    searchResultRef.value?.handleSearch({
      keyword: keyword.value,
    })
  })
}

const debouncedSearch = useDebounceFn(onSearch, 1000)

const onCancel = () => {
  uni.navigateBack()
}

const onClear = () => {
  searchHistory.value = []
}

onLoad((option) => {
  if (option?.keyword)
    keyword.value = option.keyword
})

onReachBottom(() => {
  if (activeTab.value === 0) {
    giftInListRef.value?.loadMoreAsync()
  }
  else if (activeTab.value === 1) {
    giftOutPageRef.value?.loadMoreAsync()
  }
})
</script>

<template>
  <div>
    <div class="fixed right-0 top-0 z-9 w-full uni-h5:top-40px">
      <wd-search v-model="keyword" :maxlength="20" focus placeholder="请输入亲友姓名/关键词" @search="onSearch()"
                 @change="debouncedSearch()" @cancel="onCancel"
      />
    </div>

    <div class="mx-3 mt-16">
      <div v-show="!keyword">
        <div v-if="searchHistory?.length">
          <div class="my-2 flex justify-between">
            <div class="text-lg font-bold">
              搜索历史
            </div>
            <i class="i-hugeicons-delete-02 text-lg" @click="onClear" />
          </div>
          <div class="flex flex-wrap gap-3">
            <wd-tag v-for="(item, index) in searchHistory" :key="index" round @click="onSearch(item)">
              {{ item }}
            </wd-tag>
          </div>
        </div>
      </div>
      <div v-show="keyword">
        <wd-tabs v-model="activeTab" color="#f87171" slidable="always" swipeable animated @change="onSearch()">
          <wd-tab title="收礼">
            <gift-in-list ref="giftInListRef" />
          </wd-tab>
          <wd-tab title="送礼">
            <gift-out-page ref="giftOutPageRef" />
          </wd-tab>
          <wd-tab title="亲友">
            <friend-list ref="friendsListRef" />
          </wd-tab>
        </wd-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.wd-tabs) {
  background: transparent !important;
}

:deep(.wd-tabs__nav) {
  position: fixed !important;
  top: 40px;
  /*  #ifdef H5  */
  top: 80px;
  /*  #endif  */

  z-index: 9;
}

:deep(.wd-tabs__container) {
  padding-top: 24px;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "搜索"
  }
}
</route>
