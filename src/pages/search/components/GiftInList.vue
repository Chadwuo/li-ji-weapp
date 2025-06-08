<script setup lang="ts">
import { useLoadMore } from 'vue-request'

const search = reactive({
  keyword: '',
  field: 'id',
  order: 'asc',
})
const { dataList, loadingMore, noMore, loadMoreAsync, refreshAsync } = useLoadMore<Api.LoadMoreDataType<Api.GiftIn>>(
  async (d) => {
    const _page = d?.page ? d.page + 1 : 1
    const response = await apiGiftInPageGet({
      page: _page,
      ...search,
    })
    const { items, page = 0, total = 0 } = response.data || {}
    return {
      list: items || [],
      page,
      total,
    }
  },
  {
    isNoMore: (d) => {
      return d?.list.length === d?.total
    },
    manual: true,
  },
)

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

watch(search, () => {
  refreshAsync()
})

defineExpose({
  handleSearch,
  loadMoreAsync,
  refreshAsync,
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
      <wd-loadmore :state="loadingMore ? 'loading' : noMore ? 'finished' : ''" :loading-props="{ color: '#f87171' }" />
    </div>
  </div>
</template>
