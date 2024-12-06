<script setup>
import logo from '~/static/logo.png'
import { page } from '~/alicloud/services/book'
import { hasMourningWords } from '~/utils/index'

const books = ref([])
const loadMoreStatus = ref('loadmore')
const pagination = ref({
  pageNo: 1,
  pageSize: 20,
  loading: false,
})

onLoad(async () => {
  // loadData()
  uni.$on('bookPageUpdate', async () => {
    await loadData()
  })
})

onPullDownRefresh(async () => {
  console.log('下拉刷新事件')
  pagination.value.pageNo = 1
  await loadData()
  uni.stopPullDownRefresh()
})

onReachBottom(() => {
  console.log('触底加载更多')
  if (loadMoreStatus.value === 'loading' || loadMoreStatus.value === 'nomore')
    return

  loadMoreStatus.value = 'loading'
  pagination.value.pageNo++
  loadData()
})

async function loadData() {
  const { pageSize, pageNo } = pagination.value
  await page({
    pageSize,
    pageNo,
  }).then((res) => {
    if (res.success) {
      const newGiftBooks = statistics(res.result)
      books.value = pageNo === 1 ? newGiftBooks : [...books.value, ...newGiftBooks]
      loadMoreStatus.value = newGiftBooks.length < pageSize ? 'nomore' : 'loadmore'
    }
  })
}

// 计算礼簿收礼金额
function statistics(datas) {
  return datas.map((i) => {
    i.giftCount = i.giftList.length || 0
    i.giftTotal = i.giftList.reduce(
      (total, item) => total + Number(item.money),
      0,
    )
    i.attendanceTotal = i.giftList.reduce(
      (total, item) => total + Number(item.attendance || 0),
      0,
    )
    return i
  })
}

function handleBookClick(e) {
  const { _id, title, date, giftCount, giftTotal, cost, attendanceTotal } = e
  router.push({
    path: '/pages/book/detail',
    query: { _id, title, date, giftCount, giftTotal, cost: cost || 0, attendanceTotal: attendanceTotal || 0 },
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
        v-for="i in books" :key="i._id" class="h-40 w-full rounded-l-5 rounded-r-10 bg-white py-5 shadow-lg"
        @click="handleBookClick(i)"
      >
        <div class="mx-4 h-full flex flex-col justify-around">
          <div class="text-lg font-bold" :class="[hasMourningWords(i.title) ? 'text-gray' : 'text-red']">
            {{
              i.title }}
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
            {{ i.date.lunar_month }} {{
              i.date.lunar_day }} {{ i.date.lunar_year }}
          </div>
        </div>
        <div class="relative">
          <div
            class="absolute bottom-18 right-0 h-7 w-18 flex items-center rounded-l-full"
            :class="[hasMourningWords(i.title) ? 'bg-gray' : 'bg-red']"
          >
            <div
              class="ms-2 h-3 w-3 rounded-full"
              :class="[hasMourningWords(i.title) ? 'bg-gray-300' : 'bg-red-300']"
            />
          </div>
        </div>
      </div>
      <div
        class="h-40 w-full flex flex-col items-center justify-center rounded-l-5 rounded-r-10 bg-white py-5 shadow-lg"
        @click="router.push('/pages/book/edit')"
      >
        <div class="i-carbon-add-alt text-3xl text-red font-bold" />
        <div class="mt-3">
          添加礼簿
        </div>
      </div>
    </div>

    <uv-load-more v-if="loadMoreStatus === 'loading'" loading-icon="circle" :status="loadMoreStatus" />
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
