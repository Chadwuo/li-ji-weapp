<script setup lang="ts">
import { usePagination } from 'alova/client'

const search = reactive({
  keyword: '',
  field: 'id',
  order: 'asc',
})

const { loading, page, data: dataList, isLastPage, reload } = usePagination((page, pageSize) => apiGiftInPageGet({ page, pageSize, ...search }), {
  data: response => response.items || [],
  append: true,
  watchingStates: [search],
})

const loadingMoreState = computed(() => {
  if (loading.value) {
    return 'loading'
  }
  else if (isLastPage.value) {
    return 'finished'
  }
  return ''
})

const onGiftClick = (gid?: string) => {
  if (gid) {
    uni.navigateTo({
      url: `/pages/giftIn/detail?id=${gid}`,
    })
  }
}

const handleSearch = (input: any) => {
  search.keyword = input.keyword || ''
}

defineExpose({
  handleSearch,
  loadMoreAsync: async () => {
    if (loading.value || isLastPage.value)
      return
    page.value++
  },
  refreshAsync: async () => {
    await reload()
  },
})
</script>

<template>
  <div class="mx-3">
    <div v-if="dataList.length === 0" class="my-24">
      <uv-empty mode="search" />
    </div>
    <div v-else>
      <div class="mt-2">
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
      </div>
      <wd-loadmore :state="loadingMoreState" :loading-props="{ color: '#f87171' }" />
    </div>
  </div>
</template>
