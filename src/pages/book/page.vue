<script setup lang="ts">
import { apiGiftBookPageGet } from '@/api/modules/book'
import { useLoadMore } from 'vue-request'
import logo from '/static/logo.png'

interface DataType {
  list: Api.GiftBook[]
  page: number
  total: number
}

const { dataList, noMore, loadMore, refresh } = useLoadMore<DataType>(
  async () => {
    const response = await apiGiftBookPageGet({})
    const { items, page = 0, total = 0 } = response.data || { items: [], page: 0, total: 0 }
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
  },
)

onLoad(async () => {

})

onPullDownRefresh(async () => {
  await refresh()
  uni.stopPullDownRefresh()
})

onReachBottom(() => {
  loadMore()
})

const handleBookClick = (id: number) => {
  wx.navigateTo({
    url: `/pages/book/detail?id=${id}`,
  })
}
const handleBookAdd = () => {
  wx.navigateTo({
    url: '/pages/book/edit',
  })
}
</script>

<template>
  <div>
    <wd-navbar>
      <template #left>
        <div class="flex items-center">
          <img class="h-6 w-6" :src="logo">
          <div class="ms-2 text-lg font-bold">
            礼簿
          </div>
        </div>
      </template>
    </wd-navbar>
    <div class="grid grid-cols-2 mt-5 gap-5">
      <div v-for="i in dataList" :key="i.id" class="h-40 w-full rounded-l-5 rounded-r-10 bg-white py-5 shadow-lg"
           @click="handleBookClick(i.id)"
      >
        <div class="mx-4 h-full flex flex-col justify-around">
          <div class="text-lg font-bold" :class="[hasMourningWords(i.title) ? 'text-gray' : 'text-red']">
            {{ i.title }}
          </div>
          <div class="text-sm text-gray">
            共 <span font-bold>{{ i.giftCount }}</span> 笔
          </div>
          <div class="mt-auto text-lg font-bold">
            <span class="text-sm">￥</span>{{ i.moneyTotal }}
          </div>
          <div class="text-sm text-gray">
            {{ i.date }}
          </div>
          <div class="text-xs text-gray">
            {{ i.lunarDate }}
          </div>
        </div>
        <div class="relative">
          <div class="absolute bottom-18 right-0 h-7 w-18 flex items-center rounded-l-full"
               :class="[hasMourningWords(i.title) ? 'bg-gray' : 'bg-red']"
          >
            <div class="ms-2 h-3 w-3 rounded-full" :class="[
              hasMourningWords(i.title) ? 'bg-gray-300' : 'bg-red-300',
            ]"
            />
          </div>
        </div>
      </div>
      <div
        class="h-40 w-full flex flex-col items-center justify-center rounded-l-5 rounded-r-10 bg-white py-5 shadow-lg"
        @click="handleBookAdd()"
      >
        <div class="i-carbon-add-alt text-3xl text-red font-bold" />
        <div class="mt-3">
          添加礼簿
        </div>
      </div>
    </div>
    <wd-loadmore :state="noMore ? 'loading' : 'finished'" />
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationStyle": "custom",
    "enablePullDownRefresh": true
  }
}
</route>
