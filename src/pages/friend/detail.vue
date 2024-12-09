<script setup>
const dataSource = ref({
  date: {},
})
const statisticsData = ref({
  happyTotal: 0,
  sadTotal: 0,
})
const giftList = ref([])
const loading = ref(false)

onLoad((option) => {
  dataSource.value = { ...router.getQueryParse(option) }
  loadData()
})

async function loadData() {
  loading.value = true
  const res = await getFriendGifts({ _id: dataSource.value._id })
  if (res.success) {
    const { giftOutList, giftReceiveList } = res.result
    statisticsData.value.sadCount = giftOutList.length // 送礼次数
    statisticsData.value.happyCount = giftReceiveList.length // 收礼次数
    const inList = giftReceiveList.map((i) => {
      // 收礼金额总计
      statisticsData.value.happyTotal += i.money
      return {
        _id: i._id,
        title: i.bookInfo.title,
        money: i.money,
        date: i.bookInfo.date,
        year: i.bookInfo.date.year,
        bookId: i.bookInfo._id,
        attendance: i.attendance,
        self: false,
      }
    })
    const outList = giftOutList.map((i) => {
      // 送礼金额总计
      statisticsData.value.sadTotal += i.money
      return {
        _id: i._id,
        title: i.title,
        money: i.money,
        date: i.date,
        year: i.date.year,
        icon: i.icon,
        self: true,
        remarks: i.remarks,
      }
    })

    const allGifts = [...inList, ...outList]
    const sortedGifts = allGifts.sort(
      (a, b) => dayjs(b.date.value).unix() - dayjs(a.date.value).unix(),
    )

    const groupedGifts = sortedGifts.reduce((acc, curr) => {
      acc[curr.year] = acc[curr.year] ? [...acc[curr.year], curr] : [curr]
      return acc
    }, {})

    const sortedGroupedGifts = Object.entries(groupedGifts)
      .map(([year, list]) => ({
        year,
        list,
      }))
      .sort((a, b) => b.year - a.year)

    giftList.value = sortedGroupedGifts
  }

  loading.value = false
}

function onGiftClick(e) {
  const { _id, title, money, icon, remarks, date, attendance, bookId } = e
  if (bookId) {
    router.push({
      path: '/pages/giftIn/edit',
      query: { _id, money, attendance, remarks, friendInfo: dataSource.value },
    })
  }
  else {
    router.push({
      path: '/pages/giftOut/edit',
      query: {
        _id,
        title,
        money,
        icon,
        remarks,
        date,
        friendInfo: dataSource.value,
      },
    })
  }
}

function handleEditClick(e) {
  const { _id, name, relation, remarks } = e
  router.push({
    path: '/pages/friend/edit',
    query: { _id, name, relation, remarks },
  })
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="rounded-b-2xl bg-white px-5 pb-5 pt-3 space-y-3">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-lg font-bold">
            {{ dataSource.name }}
          </div>
          <div class="mt-1 text-sm text-gray">
            <span>{{ dataSource.relation }}</span>
          </div>
        </div>
        <div class="flex text-xl text-red font-bold">
          <div class="py-2 pl-2" @click="handleEditClick(dataSource)">
            <div class="i-carbon-edit" />
          </div>
        </div>
      </div>
      <div class="text-center">
        <span
          class="text-lg font-bold"
          :class="
            statisticsData.happyTotal >= statisticsData.sadTotal
              ? 'text-red'
              : 'text-green'
          "
        >
          {{ statisticsData.happyTotal - statisticsData.sadTotal }}
        </span>
        <span class="text-sm">(收支差)</span>
      </div>
      <div class="grid grid-cols-2 gap-5 divide-x">
        <div class="text-center">
          <div class="text-lg text-red font-bold">
            {{ statisticsData.happyTotal }}
          </div>
          <div
            class="flex items-center justify-center text-sm text-gray space-x-1"
          >
            <div class="i-icon-park-outline-income" />
            <div>收礼({{ statisticsData.happyCount }})</div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-lg text-green font-bold">
            {{ statisticsData.sadTotal }}
          </div>
          <div
            class="flex items-center justify-center text-sm text-gray space-x-1"
          >
            <div class="i-icon-park-outline:expenses" />
            <div>送礼({{ statisticsData.sadCount }})</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="mt-5">
      <uv-loading-icon mode="circle" text="努力加载中..." :vertical="true" />
    </div>

    <div v-if="giftList.length === 0 && !loading" class="my-auto">
      <uv-empty />
    </div>
    <div class="my-5 space-y-3">
      <view v-for="(gift, index) in giftList" :key="index" class="cu-timeline">
        <view class="cu-time">
          {{ gift.year }}
        </view>
        <view
          v-for="item in gift.list"
          :key="item._id"
          class="cu-item"
          @click="onGiftClick(item)"
        >
          <view
            class="rounded-2xl bg-white p-4"
            :class="item.self ? 'text-green' : 'text-red'"
          >
            <view class="flex items-center justify-between">
              <view class="flex flex-col space-y-1">
                <text class="text-bold text-lg">
                  {{ item.title }}
                </text>
                <text class="text-sm text-gray">
                  {{ item.remarks }}
                </text>
                <view class="text-sm text-gray">
                  {{ item.date.value }} {{ item.date.lunar_month
                  }}{{ item.date.lunar_day }}
                </view>
              </view>
              <view class="mr-4 text-center">
                <view>
                  <text class="text-sm">
                    ￥
                  </text><text class="text-lg font-bold">
                    {{ item.money }}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </div>
    <uv-safe-bottom />
  </div>
</template>

<style lang="scss" scoped>
/* ==================
         时间轴
 ==================== */

.cu-timeline {
  display: block;
  background-color: var(--white);
}

.cu-timeline .cu-time {
  width: 120rpx;
  text-align: center;
  padding: 20rpx 0;
  font-size: 26rpx;
  color: #888;
  display: block;
}

.cu-timeline > .cu-item {
  padding: 30rpx 30rpx 30rpx 120rpx;
  position: relative;
  display: block;
  z-index: 0;
}

.cu-timeline > .cu-item:not([class*='text-']) {
  color: #ccc;
}

.cu-timeline > .cu-item::after {
  content: '';
  display: block;
  position: absolute;
  width: 1rpx;
  background-color: #ddd;
  left: 60rpx;
  height: 100%;
  top: 0;
  z-index: 8;
}

.cu-timeline > .cu-item::before {
  font-family: 'cuIcon';
  display: block;
  position: absolute;
  top: 36rpx;
  z-index: 9;
  background-color: var(--white);
  width: 50rpx;
  height: 50rpx;
  text-align: center;
  border: none;
  line-height: 50rpx;
  left: 36rpx;
}

.cu-timeline > .cu-item[class*='cicon-']::before {
  background-color: var(--white);
  width: 50rpx;
  height: 50rpx;
  text-align: center;
  border: none;
  line-height: 50rpx;
  left: 36rpx;
}

.cu-timeline > .cu-item > .content {
  padding: 30rpx;
  border-radius: 6rpx;
  display: block;
  line-height: 1.6;
}

.cu-timeline > .cu-item > .content:not([class*='bg-']) {
  background-color: var(--ghostWhite);
  color: var(--black);
}

.cu-timeline > .cu-item > .content + .content {
  margin-top: 20rpx;
}
</style>

<route lang="json">
{
  "layout": "blank",
  "style": {
    "navigationBarTitleText": "详情"
  }
}
</route>
