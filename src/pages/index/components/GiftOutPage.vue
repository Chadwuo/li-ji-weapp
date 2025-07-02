<script setup lang="ts">
import { usePagination } from 'alova/client'

const search = reactive({
  keyword: '',
  icon: '',
})

const { loading, page, data: dataList, isLastPage, reload } = usePagination((page, pageSize) => apiGiftOutPageGet({ page, pageSize, field: 'date', order: 'desc', ...search }), {
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

const handleSearch = (input: any) => {
  search.keyword = input.keyword || ''
  search.icon = input.icon || ''
}

defineExpose({
  handleAdd,
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
  <div>
    <div class="mx-3">
      <div v-if="dataList.length === 0" class="my-24">
        <uv-empty v-if="!search.keyword" text="还没有人情往来记录哦~" mode="favor">
          <div class="mt-6">
            <wd-button class="mt-6" type="primary" @click="handleAdd()">
              添加送礼
            </wd-button>
          </div>
        </uv-empty>
        <uv-empty v-else mode="search" />
      </div>
      <div v-else class="my-5">
        <div v-for="(i, index) in dataList" :key="i.id" @click="onGiftClick(i.id)">
          <uv-divider v-if="index" />
          <div class="flex">
            <div class="h-12 w-12 flex flex-shrink-0 rounded-full" :class="[
              i.icon === 'i-tabler-candle'
                ? 'bg-gray-100 text-gray'
                : 'bg-red-50 text-red',
            ]"
            >
              <div class="m-auto h-8 w-8" :class="i.icon || 'i-mingcute-wallet-2-line'" />
            </div>
            <div class="mx-4 grow">
              <div class="text-lg font-bold">
                {{ i.friendName }}
              </div>
              <div class="text-gray">
                {{ i.title }}<span v-if="i.remarks">({{ i.remarks }})</span>
              </div>
              <div class="mt-1 text-xs text-gray">
                <span>{{ i.lunarDate }}</span>
                <span class="ml-2">({{ i.date }}) </span>
              </div>
            </div>
            <div class="text-lg font-bold" :class="[
              i.icon === 'i-tabler-candle' ? 'text-gray' : 'text-green',
            ]"
            >
              -{{ i.money }}
            </div>
          </div>
        </div>
        <wd-loadmore :state="loadingMoreState" :loading-props="{ color: '#f87171' }" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
