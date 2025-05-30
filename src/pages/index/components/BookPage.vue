<script setup lang="ts">
import { useLoadMore } from 'vue-request'

const search = reactive({
  keyword: '',
})

const { dataList, loadingMore, loadMoreAsync, refreshAsync } = useLoadMore<Api.LoadMoreDataType<Api.GiftBook>>(
  async (d) => {
    const _page = d?.page ? d.page + 1 : 1
    const response = await apiGiftBookPageGet({
      page: _page,
      field: 'date',
      order: 'desc',
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

const onBookClick = (id?: string) => {
  if (id) {
    uni.navigateTo({
      url: `/pages/book/detail?id=${id}`,
    })
  }
}
const handleAdd = () => {
  uni.navigateTo({
    url: '/pages/book/edit',
  })
}

const handleSearch = (input: any) => {
  search.keyword = input.keyword || ''
}

watch(search, () => {
  refreshAsync()
})

defineExpose({
  handleAdd,
  handleSearch,
  loadMoreAsync,
  refreshAsync,
})
</script>

<template>
  <div>
    <div class="grid grid-cols-2 mt-2 gap-5">
      <div v-for="i in dataList" :key="i.id" class="h-40 w-full rounded-l-5 rounded-r-10 bg-white py-5 shadow-lg"
           :class="{ memorial: hasMourningWords(i.title) }" @click="onBookClick(i.id)"
      >
        <div class="mx-4 h-full flex flex-col justify-around">
          <div class="line-clamp-2 text-lg text-red font-bold">
            {{ i.title }}
          </div>
          <div class="text-sm text-gray">
            共 <span font-bold>{{ i.giftCount }}</span> 笔
          </div>
          <div class="mt-auto text-lg font-bold">
            <span class="text-sm">￥</span>{{ i.moneyTotal }}
          </div>
          <div class="mt-1 text-xs text-gray">
            <div>
              {{ i.date }}
            </div>
            <div>
              {{ i.lunarDate }}
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="absolute bottom-18 right-0 h-7 w-18 flex items-center rounded-l-full"
               :class="[hasMourningWords(i.title) ? 'bg-gray' : 'bg-red']"
          >
            <div class="ms-2 h-3 w-3 rounded-full bg-red-300" />
          </div>
        </div>
      </div>
      <div v-if="!search.keyword && dataList.length === 0"
           class="h-40 w-full flex flex-col items-center justify-center rounded-l-5 rounded-r-10 bg-white py-5 shadow-lg"
           @click="handleAdd()"
      >
        <div class="i-hugeicons-plus-sign-circle text-3xl text-red font-bold" />
        <div class="mt-3">
          添加礼簿
        </div>
      </div>
    </div>
    <div class="my-24">
      <uv-empty v-if="search.keyword && dataList.length === 0" mode="search" />
    </div>
    <wd-loadmore :state="loadingMore ? 'loading' : ''" :loading-props="{ color: '#f87171' }" />
  </div>
</template>

<style lang="scss" scoped></style>
