<script setup lang="ts">
import { usePagination } from 'alova/client'

const { keyword } = defineProps(['keyword'])

const { loading, page, data: dataList, isLastPage } = usePagination((page, pageSize) => apiBookItemPageGet({ page, pageSize, keyword: keyword.value }), {
  data: response => response.items || [],
  append: true,
  immediate: false,
  watchingStates: [keyword],
  debounce: [300],
  preloadPreviousPage: false,
  preloadNextPage: false,
})

const onGiftClick = (gid?: string) => {
  if (gid) {
    uni.navigateTo({
      url: `/pages/giftIn/detail?id=${gid}`,
    })
  }
}

defineExpose({
  loadMoreAsync: async () => {
    if (loading.value || isLastPage.value)
      return
    page.value++
  },
})
</script>

<template>
  <template v-if="dataList.length === 0">
    <div v-if="loading" class="mt-5 text-center">
      <wd-loading color="#f87171" />
      <div class="mt-3 text-gray">
        正在努力加载中...
      </div>
    </div>
    <div v-else class="my-24">
      <uv-empty mode="search" />
    </div>
  </template>
  <div v-else>
    <div v-for="(gift, index) in dataList" :key="gift.id" @click="onGiftClick(gift.id)">
      <uv-divider v-if="index" />
      <div class="flex justify-between text-lg">
        <div>
          {{ gift.friendName }}
        </div>
        <div class="text-red font-bold">
          +{{ gift.money }}
        </div>
      </div>
      <div class="line-clamp-1 text-sm text-gray">
        {{ gift.title }}
      </div>
      <div class="mt-1 text-xs text-gray">
        <span>{{ gift.lunarDate }}</span>
        <span class="ml-2">({{ gift.date }}) </span>
      </div>
    </div>
    <wd-loadmore :state="loading ? 'loading' : isLastPage ? 'finished' : ''"
                 :loading-props="{ color: '#f87171' }"
    />
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Vue3"
  }
}
</route>
