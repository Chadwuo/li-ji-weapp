<script setup lang="ts">
import { apiGiftBookPageGet } from '@/api/modules/book'
import { useLoadMore } from 'vue-request'
import logo from '/static/logo.png'

const { dataList, noMore, loadMore, refresh, mutate } = useLoadMore(
  apiGiftBookPageGet,
  {
    isNoMore: (d) => {
      return d?.list.length === d?.total
    },
    onSuccess: (data) => {
      if (data.succeeded) {
        const { items, page, total } = data.data
        const list = statistics(items)
        mutate({ list, page, total })
      }
    },
  },
)

onLoad(async () => {
  refresh()
})

onPullDownRefresh(async () => {
  await refresh()
  uni.stopPullDownRefresh()
})

onReachBottom(() => {
  loadMore()
})

// 计算礼簿收礼金额
function statistics(list: Api.GiftBook[]) {
  return list.map((i) => {
    // i.giftCount = i.giftList.length || 0
    // i.giftTotal = i.giftList.reduce(
    //   (total, item) => total + Number(item.money),
    //   0,
    // )
    // i.attendanceTotal = i.giftList.reduce(
    //   (total, item) => total + Number(item.attendance || 0),
    //   0,
    // )
    return i
  })
}

const handleBookClick = (id: string) => {
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
    <uv-navbar placeholder bg-color="#f1f1f1">
      <template #left>
        <div class="flex items-center">
          <img class="h-6 w-6" :src="logo">
          <div class="ms-2 text-lg font-bold">
            礼簿
          </div>
        </div>
      </template>
    </uv-navbar>

    <div class="grid grid-cols-2 mt-5 gap-5">
      <div
        v-for="i in dataList" :key="i._id" class="h-40 w-full rounded-l-5 rounded-r-10 bg-white py-5 shadow-lg"
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
            <span class="text-sm">￥</span>{{ i.giftTotal }}
          </div>
          <div class="text-sm text-gray">
            {{ i.date.value }}
          </div>
          <div class="text-xs text-gray">
            {{ i.date.lunar_month }} {{ i.date.lunar_day }}
            {{ i.date.lunar_year }}
          </div>
        </div>
        <div class="relative">
          <div
            class="absolute bottom-18 right-0 h-7 w-18 flex items-center rounded-l-full"
            :class="[hasMourningWords(i.title) ? 'bg-gray' : 'bg-red']"
          >
            <div
              class="ms-2 h-3 w-3 rounded-full" :class="[
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

<route lang="json" type="home">
{
  "style": {
    "navigationStyle": "custom",
    "enablePullDownRefresh": true
  }
}
</route>
