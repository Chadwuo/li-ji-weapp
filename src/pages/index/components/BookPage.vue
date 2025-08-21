<script setup lang="ts">
import { usePagination } from 'alova/client'

const { loading, page, data: dataList, isLastPage, reload } = usePagination((page, pageSize) => apiBookPageGet({ page, pageSize, field: 'date', order: 'desc' }), {
  data: response => response.items || [],
  append: true,
})

const onBookClick = (id?: string) => {
  if (id) {
    uni.navigateTo({
      url: `/pages/book/detail?id=${id}`,
    })
  }
}

const onAdd = () => {
  uni.navigateTo({
    url: '/pages/book/edit',
  })
}

const onSearch = () => {
  uni.navigateTo({
    url: `/pages/search/index?activeTab=1`,
  })
}
defineExpose({
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
    <div class="mt-3 flex items-center">
      <div class="w-full flex items-center rounded-full bg-white p-1 px-2 text-gray" @click="onSearch()">
        <i class="i-hugeicons-search-02" />
        <div class="ms-1">
          搜索人情往来
        </div>
      </div>
      <div class="flex text-xl text-red">
        <i class="i-hugeicons-plus-sign-circle ms-3" @click="onAdd()" />
      </div>
    </div>
    <div class="grid grid-cols-2 mt-3 gap-5 pb-5">
      <div v-for="i in dataList" :key="i.id" class="h-40 w-full rounded-l-5 rounded-r-10 bg-white py-5 shadow-lg"
           :class="{ memorial: hasMourningWords(i.title) }" @click="onBookClick(i.id)"
      >
        <div class="mx-4 h-full flex flex-col justify-around">
          <div class="line-clamp-2 text-lg text-red font-bold">
            {{ i.title }}
          </div>
          <div class="text-sm text-gray">
            共 <span font-bold>{{ i.count }}</span> 笔
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
      <div
        class="h-40 w-full flex flex-col items-center justify-center rounded-l-5 rounded-r-10 bg-white py-5 shadow-lg"
        @click="onAdd()"
      >
        <div class="i-hugeicons-plus-sign-circle text-3xl text-red font-bold" />
        <div class="mt-3">
          添加礼簿
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
