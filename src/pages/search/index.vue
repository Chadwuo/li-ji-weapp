<script setup lang="ts">
import { useWatcher } from 'alova/client'
import { storeToRefs } from 'pinia'
import { apiSearchGet } from '@/api/modules/search'

const { searchHistory } = storeToRefs(useAppStore())
const keyword = ref<string>('')

const { loading, data } = useWatcher(
  () => apiSearchGet(),
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

const onCancel = () => {
  uni.navigateBack()
}

const onClear = () => {
  searchHistory.value = []
}

const onFriendClick = (id?: string) => {
  uni.navigateTo({
    url: `/pages/friend/detail?id=${id}`,
  })
}
</script>

<template>
  <div>
    <div class="fixed right-0 top-0 z-9 w-full uni-h5:top-40px">
      <wd-search v-model="keyword" :maxlength="20" focus placeholder="请输入亲友姓名/关键词" @search="onSearch()"
                 @cancel="onCancel"
      />
    </div>

    <div class="mx-3 mt-16">
      <div v-show="!keyword">
        <div>
          <div class="my-2 flex justify-between">
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
          <uv-empty v-show="!searchHistory?.length" />
        </div>
      </div>
      <div v-show="keyword">
        <div v-if="loading">
          <wd-loading color="#f87171" />
        </div>
        <wd-cell v-for="cell in data.friends" :key="cell.id" clickable border :title="cell.name"
                 @click="onFriendClick(cell.id)"
        />
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
