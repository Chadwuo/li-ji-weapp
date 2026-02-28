<script setup lang="ts">
import { useWatcher } from 'alova/client'
import { storeToRefs } from 'pinia'
import { apiSearchGet } from '@/api/modules/search'

definePage({
  style: {
    navigationBarTitleText: '搜索',
    navigationBarBackgroundColor: '#fff',
  },
})

const { searchHistory } = storeToRefs(useAppStore())
const keyword = ref<string>('')

const { loading, data } = useWatcher(
  () => apiSearchGet({
    keyword: keyword.value,
  }),
  [keyword],
  // {
  //   debounce: [300]
  // }
)
const onSearch = (word?: string) => {
  if (word) {
    keyword.value = word
  }
  if (!keyword.value)
    return
  if (!searchHistory.value?.includes(keyword.value)) {
    searchHistory.value?.unshift(keyword.value)
  }
}

const searchEmpty = computed(() => {
  return !data.value?.gifts?.length && !data.value?.bookItems?.length && !data.value?.friends?.length
})

const onCancel = () => {
  uni.navigateBack()
}

const onClear = () => {
  searchHistory.value = []
}

const onItemClick = (id?: string, type?: string) => {
  switch (type) {
    case 'friend':
      uni.navigateTo({
        url: `/pages/friend/detail?id=${id}`,
      })
      break
    case 'book-item':
      uni.navigateTo({
        url: `/pages/bookItem/detail?id=${id}`,
      })
      break
    case 'gift':
      uni.navigateTo({
        url: `/pages/gift/detail?id=${id}`,
      })
      break
  }
}

const onMoreClick = (type?: string) => {
  switch (type) {
    case 'friend':
      uni.navigateTo({
        url: `/pages/search/more/friend`,
      })
      break
    case 'book-item':
      uni.navigateTo({
        url: `/pages/search/more/bookItem`,
      })
      break
    case 'gift':
      uni.navigateTo({
        url: `/pages/search/more/gift`,
      })
      break
  }
}
</script>

<template>
  <div>
    <div class="sticky top-0 z-9 w-full uni-h5:top-40px">
      <wd-search v-model="keyword" :maxlength="20" focus placeholder="请输入亲友姓名/关键词" @search="onSearch()"
                 @cancel="onCancel"
      />
    </div>

    <div>
      <div v-if="!keyword" class="mx-3">
        <div class="my-2 flex items-center justify-between">
          <div class="text-lg font-bold">
            搜索历史
          </div>
          <i v-show="searchHistory?.length" class="i-hugeicons-delete-02 text-lg" @click="onClear" />
        </div>
        <div class="flex flex-wrap gap-3">
          <wd-tag v-for="(item, index) in searchHistory" :key="index" round @click="onSearch(item)">
            {{ item }}
          </wd-tag>
        </div>
        <div v-show="!searchHistory?.length" class="py-12">
          <uv-empty />
        </div>
      </div>
      <div v-else class="pb-4">
        <div v-show="loading" class="flex justify-center pt-5">
          <wd-loading color="#f87171" />
        </div>
        <div v-show="searchEmpty" class="py-16">
          <uv-empty mode="search" />
        </div>
        <div v-show="data?.friends?.length" class="mt-2 bg-white p-3">
          <div class="mb-2 flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <i class="i-hugeicons-user text-lg text-red" />
              <div class="text-sm font-bold">
                联系人
              </div>
            </div>
            <div v-show="data?.friends?.length > 4" class="flex items-center text-xs text-gray" @click="onMoreClick('friend')">
              更多
              <i class="i-hugeicons-arrow-right-01 ml-0.5" />
            </div>
          </div>
          <wd-cell v-for="cell in data?.friends" :key="cell.id" clickable border @click="onItemClick(cell.id, 'friend')">
            <template #title>
              <div class="flex items-center">
                <div class="font-bold">
                  {{ cell.name }}
                </div>
                <div v-if="cell.relation" class="ml-1 text-xs text-gray">
                  @{{ cell.relation }}
                </div>
              </div>
            </template>
          </wd-cell>
        </div>
        <div v-show="data?.bookItems?.length" class="mt-2 bg-white p-3">
          <div class="mb-2 flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <i class="i-hugeicons-notebook text-lg text-red" />
              <div class="text-sm font-bold">
                礼簿
              </div>
            </div>
            <div v-show="data?.bookItems?.length > 4" class="flex items-center text-xs text-gray" @click="onMoreClick('book-item')">
              更多
              <i class="i-hugeicons-arrow-right-01 ml-0.5" />
            </div>
          </div>
          <wd-cell v-for="cell in data?.bookItems" :key="cell.id" clickable center border @click="onItemClick(cell.id, 'book-item')">
            <template #title>
              <div>
                <div class="font-bold">
                  {{ cell.title }}
                </div>
                <div class="mt-0.5 text-xs text-gray">
                  {{ cell.friendName }}
                </div>
              </div>
            </template>
            <template #default>
              <money-amount :money="cell.money" />
            </template>
          </wd-cell>
        </div>
        <div v-show="data?.gifts?.length" class="mt-2 bg-white p-3">
          <div class="mb-2 flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <i class="i-mingcute-wallet-2-line text-lg text-red" />
              <div class="text-sm font-bold">
                人情往来
              </div>
            </div>
            <div v-show="data?.gifts?.length > 4" class="flex items-center text-xs text-gray" @click="onMoreClick('gift')">
              更多
              <i class="i-hugeicons-arrow-right-01 ml-0.5" />
            </div>
          </div>
          <wd-cell v-for="cell in data?.gifts" :key="cell.id" clickable center border @click="onItemClick(cell.id, 'gift')">
            <template #title>
              <div>
                <div class="flex items-center">
                  <div class="font-bold">
                    {{ cell.title }}
                  </div>
                </div>
                <div class="mt-0.5 text-xs text-gray">
                  {{ cell.friendName }}
                </div>
              </div>
            </template>
            <template #default>
              <money-amount :money="cell.money" />
            </template>
          </wd-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
