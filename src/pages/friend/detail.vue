<script setup lang="ts">
import dayjs from 'dayjs'
import { useMessage } from 'wot-design-uni'

const message = useMessage()
const friend = ref<Api.Friend>({})

const statisticsData = ref({
  happyTotal: 0,
  sadTotal: 0,
  happyCount: 0,
  sadCount: 0,
})
const giftList = ref<Array<any>>()
const loading = ref(false)
const loadGifts = async () => {
  statisticsData.value = {
    happyTotal: 0,
    sadTotal: 0,
    happyCount: 0,
    sadCount: 0,
  }
  const { data, succeeded } = await apiFriendGiftListGet({ id: friend.value.id })
  if (!succeeded)
    return
  const giftInList = data?.giftInList ?? []
  const giftOutList = data?.giftOutList ?? []
  statisticsData.value.sadCount = giftOutList.length // 送礼次数
  statisticsData.value.happyCount = giftInList.length// 收礼次数
  const inList = giftInList.map((i) => {
    // 收礼金额总计
    statisticsData.value.happyTotal += i.money || 0
    return {
      id: i.id,
      title: i.title,
      money: i.money,
      date: i.date,
      lunarDate: i.lunarDate,
      year: dayjs(i.date).year(),
      giftBookId: i.giftBookId,
      attendance: i.attendance,
      self: false,
    }
  })
  const outList = giftOutList.map((i) => {
    // 送礼金额总计
    statisticsData.value.sadTotal += i.money || 0
    return {
      id: i.id,
      title: i.title,
      money: i.money,
      date: i.date,
      lunarDate: i.lunarDate,
      year: dayjs(i.date).year(),
      icon: i.icon,
      remarks: i.remarks,
      self: true,
    }
  })

  // Merge and sort all gifts by date
  const allGifts = [...inList, ...outList].sort(
    (a, b) => dayjs(b.date).unix() - dayjs(a.date).unix(),
  )

  // Group gifts by year
  const groupedGifts = allGifts.reduce((acc, curr) => {
    const year = curr.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(curr)
    return acc
  }, {} as { [key: number]: any[] })

  // Convert to array and sort by year
  giftList.value = Object.entries(groupedGifts)
    .map(([year, list]) => ({
      year: Number.parseInt(year, 10), // Ensure year is a number
      list,
    }))
    .sort((a, b) => b.year - a.year)
}

const loadData = async () => {
  await apiFriendGet({ id: friend.value.id }).then((res) => {
    if (res.succeeded && res.data)
      friend.value = res.data
  })
}

onLoad(async (option) => {
  loading.value = true
  if (option?.id) {
    friend.value.id = option.id
  }
})

onShow(async () => {
  await loadData()
  await loadGifts()
  loading.value = false
})

const onGiftClick = (e: Api.GiftIn | Api.GiftOut) => {
  if ('giftBookId' in e && e.giftBookId) {
    uni.navigateTo({
      url: `/pages/giftIn/detail?id=${e.id}`,
    })
  }
  else {
    uni.navigateTo({
      url: `/pages/giftOut/detail?id=${e.id}`,
    })
  }
}

const onFriendEdit = () => {
  uni.navigateTo({
    url: `/pages/friend/edit?id=${friend.value.id}`,
  })
}
const onFriendDel = () => {
  message.confirm({
    msg: '该亲友所有人情往来记录都将被删除，确定删除？',
    title: '删除亲友',
  }).then(async () => {
    const res = await apiFriendDelete({ id: friend.value.id })
    if (res.succeeded) {
      uni.showToast({
        title: '删除成功',
        icon: 'success',
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    }
  })
}
</script>

<template>
  <div class="mx-3">
    <div v-if="loading" class="rounded-2xl bg-white p-5">
      <wd-skeleton
        :row-col="[{ width: '30%' }, { width: '50%' }, [{ width: '0' }, { width: '30%' }, { width: '0' }], { width: '0' }, [{ width: '0' }, { width: '20%' }, { width: '20%' }, { width: '0' }]]"
      />
    </div>
    <div v-else class="rounded-2xl bg-white p-5 space-y-3">
      <div class="flex justify-between">
        <div>
          <div class="text-lg font-bold">
            {{ friend.name }}
          </div>
          <div class="mt-1 flex items-center text-sm text-gray">
            标签：
            <wd-tag v-if="friend.tag" type="primary" mark>
              {{ friend.tag }}
            </wd-tag>
          </div>
          <div class="mt-1 text-sm text-gray">
            备注：{{ friend.remarks }}
          </div>
        </div>
        <div class="flex text-xl text-red font-bold">
          <div class="py-2 pl-2" @click="onFriendDel">
            <div class="i-hugeicons-delete-02" />
          </div>
          <div class="py-2 pl-2" @click="onFriendEdit">
            <div class="i-hugeicons-edit-01" />
          </div>
        </div>
      </div>
      <div class="text-center">
        <span class="text-lg font-bold" :class="statisticsData.happyTotal >= statisticsData.sadTotal
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
            <span class="text-sm">￥</span>{{ statisticsData.happyTotal }}
          </div>
          <div class="flex items-center justify-center text-sm text-gray space-x-1">
            <div>收礼({{ statisticsData.happyCount }})</div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-lg text-green font-bold">
            <span class="text-sm">￥</span>{{ statisticsData.sadTotal }}
          </div>
          <div class="flex items-center justify-center text-sm text-gray space-x-1">
            <div>送礼({{ statisticsData.sadCount }})</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="mt-5 text-center">
      <wd-loading color="#f87171" />
      <div class="mt-3 text-gray">
        正在努力加载中...
      </div>
    </div>

    <div v-if="giftList?.length === 0 && !loading" class="my-24">
      <uv-empty text="还没有人情往来记录哦~" mode="favor" />
    </div>
    <div class="my-5 space-y-3">
      <div v-for="(gift, index) in giftList" :key="index" class="cu-timeline">
        <div class="cu-time">
          {{ gift.year }}
        </div>
        <div v-for="item in gift.list" :key="item._id" class="cu-item" @click="onGiftClick(item)">
          <div class="rounded-2xl bg-white p-4" :class="item.self ? 'text-green' : 'text-red'">
            <div class="flex justify-between">
              <div class="mr-3 flex flex-col space-y-1">
                <div class="text-bold text-lg">
                  {{ item.title }}
                </div>
                <div class="text-sm text-gray">
                  {{ item.remarks }}
                </div>
                <div class="mt-1 text-xs text-gray">
                  <span>{{ item.lunarDate }}</span>
                  <span class="ml-2">({{ item.date }}) </span>
                </div>
              </div>
              <div class="ml-3 flex-shrink-0 text-right text-lg font-bold">
                <div>
                  {{ item.self ? '-' : '+' }}{{ item.money }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

.cu-timeline>.cu-item {
  padding: 30rpx 0 30rpx 120rpx;
  position: relative;
  display: block;
  z-index: 0;
}

.cu-timeline>.cu-item:not([class*='text-']) {
  color: #ccc;
}

.cu-timeline>.cu-item::after {
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

.cu-timeline>.cu-item::before {
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

.cu-timeline>.cu-item[class*='cicon-']::before {
  background-color: var(--white);
  width: 50rpx;
  height: 50rpx;
  text-align: center;
  border: none;
  line-height: 50rpx;
  left: 36rpx;
}

.cu-timeline>.cu-item>.content {
  padding: 30rpx;
  border-radius: 6rpx;
  display: block;
  line-height: 1.6;
}

.cu-timeline>.cu-item>.content:not([class*='bg-']) {
  background-color: var(--ghostWhite);
  color: var(--black);
}

.cu-timeline>.cu-item>.content+.content {
  margin-top: 20rpx;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "详情"
  }
}
</route>
