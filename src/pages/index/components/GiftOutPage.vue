<script setup lang="ts">
import { giftCategory } from '@/constants/app'
import { useLoadMore } from 'vue-request'

const columns = [
  { name: '全部', value: '' },
  ...Object.entries(giftCategory).map(([name, icon]) => ({
    name,
    value: icon,
  })),
]
const search = ref({
  keyword: '',
  icon: '',
})
const { dataList, loadingMore, noMore, loadMoreAsync, refreshAsync } = useLoadMore<Api.LoadMoreDataType<Api.GiftOut>>(
  async (d) => {
    const _page = d?.page ? d.page + 1 : 1
    const response = await apiGiftOutPageGet({
      page: _page,
      field: 'date',
      order: 'desc',
      ...search.value,
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

const onTabsClick = (item: any) => {
  search.value.icon = item.value
  refreshAsync()
}

onMounted(() => {
  refreshAsync()
})

const onGiftClick = (id?: string) => {
  if (id) {
    uni.navigateTo({
      url: `/pages/giftOut/detail?id=${id}`,
    })
  }
}

const handleAdd = () => {
  uni.navigateTo({
    url: '/pages/giftOut/edit',
  })
}

const handleSearch = (keyword: string) => {
  search.value.keyword = keyword
  refreshAsync()
}

defineExpose({
  handleAdd,
  handleSearch,
  loadMoreAsync,
  refreshAsync,
})
</script>

<template>
  <div>
    <uv-tabs :list="columns" line-width="0" line-height="0" :active-style="{
      color: '#f87171',
      fontWeight: 'bold',
      transform: 'scale(1.1)',
    }" :inactive-style="{
      color: '#606266',
      transform: 'scale(1)',
    }" item-style="height: 35px;" @click="onTabsClick"
    />
    <div class="mx-3">
      <div v-if="dataList.length === 0" class="my-24">
        <uv-empty text="还没有人情往来记录哦~" mode="favor">
          <div class="mt-6">
            <wd-button type="primary" @click="handleAdd()">
              添加送礼
            </wd-button>
          </div>
        </uv-empty>
      </div>
      <div v-else class="my-5 space-y-5">
        <div v-for="i in dataList" :key="i.id" @click="onGiftClick(i.id)">
          <div class="flex">
            <div class="h-12 w-12 flex flex-shrink-0 rounded-full" :class="[
              i.icon === 'i-tabler-candle'
                ? 'bg-gray-100 text-gray'
                : 'bg-red-50 text-red',
            ]"
            >
              <div class="m-auto h-8 w-8" :class="i.icon" />
            </div>
            <div class="mx-4 grow">
              <div class="text-lg font-bold">
                {{ i.friendName }}
              </div>
              <div class="text-gray">
                {{ i.title }}<span v-if="i.remarks">({{ i.remarks }})</span>
              </div>
              <div class="mt-1 text-xs text-gray">
                <span>{{ i.date }}</span>
                <span class="ml-2">({{ i.lunarDate }}) </span>
              </div>
            </div>
            <div class="text-lg font-bold" :class="[
              i.icon === 'i-tabler-candle' ? 'text-gray' : 'text-red',
            ]"
            >
              <span class="text-sm">￥</span>{{ i.money }}
            </div>
          </div>
        </div>
        <wd-loadmore :state="loadingMore ? 'loading' : noMore ? 'finished' : ''"
                     :loading-props="{ color: '#f87171' }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
