<script setup lang="ts">
import { useDialog, useQueue } from '@wot-ui/ui'
import dayjs from 'dayjs'

definePage({
  style: {
    navigationBarTitleText: '好友详情',
  },
})

const { closeOutside } = useQueue()
const dialog = useDialog()
const friend = ref<Api.Friend>({})

const statsData = ref({
  inCount: 0,
  outCount: 0,
  inTotal: 0,
  outTotal: 0,
})
const giftList = ref<Array<any>>()
const loading = ref(false)

const getRecordTone = (money?: number) => (money ?? 0) > 0 ? 'income' : 'expense'
const getRecordTypeText = (money?: number) => (money ?? 0) > 0 ? '收礼' : '送礼'

const loadGifts = async () => {
  const data = await apiFriendGiftListGet({ id: friend.value.id })
  if (!data)
    return
  const bookItems = data?.bookItems ?? []
  const gifts = data?.gifts ?? []

  const giftsRaw = [] as any[]

  bookItems.forEach((i) => {
    giftsRaw.push({
      id: i.id,
      title: i.title,
      money: i.money ?? 0,
      date: i.date,
      year: dayjs(i.date).year(),
      monthDay: dayjs(i.date).format('MM.DD'),
      bookId: i.bookId,
      attendance: i.attendance,
      remarks: i.remarks,
    })
  })

  gifts.forEach((i) => {
    giftsRaw.push({
      id: i.id,
      title: i.title,
      money: i.money ?? 0,
      date: i.date,
      year: dayjs(i.date).year(),
      monthDay: dayjs(i.date).format('MM.DD'),
      icon: i.icon,
      remarks: i.remarks,
    })
  })

  // 总体统计
  statsData.value = {
    inCount: giftsRaw.filter(item => item.money > 0).length,
    outCount: giftsRaw.filter(item => item.money < 0).length,
    inTotal: giftsRaw.filter(item => item.money > 0).reduce((acc, curr) => acc + (curr.money || 0), 0),
    outTotal: giftsRaw.filter(item => item.money < 0).reduce((acc, curr) => acc + (curr.money || 0), 0),
  }

  // Group gifts by year
  const groupedGifts = giftsRaw.sort(
    (a, b) => dayjs(b.date).unix() - dayjs(a.date).unix(),
  ).reduce((acc, curr) => {
    const year = curr.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(curr)
    return acc
  }, {} as { [key: number]: any[] })

  // Convert to array and sort by year
  giftList.value = Object.entries(groupedGifts)
    .map(([year, rawList]) => {
      const list = rawList as any[]
      return {
        year: Number.parseInt(year, 10), // Ensure year is a number
        list,
        netTotal: list.reduce((acc, curr) => acc + (curr.money || 0), 0),
      }
    })
    .sort((a, b) => b.year - a.year)
}

const loadData = async () => {
  friend.value = await apiFriendGet({ id: friend.value.id })
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

const onGiftClick = (e: Api.BookItem | Api.Gift) => {
  if ('bookId' in e && e.bookId) {
    uni.navigateTo({
      url: `/pages/bookItem/detail?id=${e.id}`,
    })
  }
  else {
    uni.navigateTo({
      url: `/pages/gift/detail?id=${e.id}`,
    })
  }
}

const onFriendEdit = () => {
  uni.navigateTo({
    url: `/pages/friend/edit?id=${friend.value.id}`,
  })
}
const onFriendDel = () => {
  dialog.confirm({
    msg: '该亲友所有人情往来记录都将被删除，确定删除？',
    title: '删除亲友',
  }).then(async () => {
    await apiFriendDelete({ id: friend.value.id })
    uni.showToast({
      title: '删除成功',
      icon: 'success',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  })
}
const onAdd = () => {
  uni.navigateTo({
    url: `/pages/gift/edit?friendId=${friend.value.id}&friendName=${friend.value.name}`,
  })
}
const menu = ref<any[]>([
  {
    iconClass: 'edit',
    content: '编辑亲友',
  },
  {
    iconClass: 'delete',
    content: '删除亲友',
  },
])

function onMenuClick(e: any) {
  switch (e.index) {
    case 0:
      onFriendEdit()
      break
    case 1:
      onFriendDel()
      break
  }
}
</script>

<template>
  <div class="mx-3" @click="closeOutside">
    <div v-if="loading" class="rounded-2xl bg-white p-5">
      <wd-skeleton
        :row-col="[{ width: '30%' }, { width: '50%' }, [{ width: '0' }, { width: '30%' }, { width: '0' }], { width: '0' }, [{ width: '0' }, { width: '20%' }, { width: '20%' }, { width: '0' }]]"
      />
    </div>
    <div v-else class="gradient-card p-5 space-y-2">
      <div class="flex justify-between">
        <div>
          <div class="flex items-center">
            <div class="text-lg font-bold">
              {{ friend.name }}
            </div>
            <div class="ml-1 text-gray">
              @{{ friend.relation }}
            </div>
          </div>
          <div class="mt-1 flex flex-wrap items-center gap-1 text-sm text-gray">
            标签：
            <wd-tag v-for="(tag, index) in friend.tagList" :key="index" type="primary" variant="light" round>
              {{ tag }}
            </wd-tag>
          </div>
          <div class="mt-1 text-sm text-gray">
            备注：{{ friend.remarks }}
          </div>
        </div>
        <div>
          <wd-popover mode="menu" :content="menu" placement="bottom-end" @menuclick="onMenuClick">
            <i class="i-weui-more-filled text-xl" />
          </wd-popover>
        </div>
      </div>
      <div class="flex items-center justify-center text-center">
        <money-amount :money="statsData.inTotal + statsData.outTotal" size="text-2xl" />
        <span class="ms-1 text-sm text-gray">(收支差)</span>
      </div>
      <div class="grid grid-cols-2 gap-5 divide-x">
        <div class="text-center">
          <div class="text-lg text-red font-bold">
            <span class="text-sm">￥</span>{{ statsData.inTotal }}
          </div>
          <div class="flex items-center justify-center text-sm text-gray space-x-1">
            <div>收礼({{ statsData.inCount }})</div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-lg text-teal font-bold">
            <span class="text-sm">￥</span>{{ statsData.outTotal }}
          </div>
          <div class="flex items-center justify-center text-sm text-gray space-x-1">
            <div>送礼({{ statsData.outCount }})</div>
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
      <wd-empty tip="还没有人情往来记录哦~" />
    </div>
    <div v-if="giftList?.length" class="ledger-timeline pt-2">
      <div v-for="gift in giftList" :key="gift.year" class="timeline-year">
        <div class="year-marker">
          <div class="year-marker-main">
            <span class="year-marker-text">{{ gift.year }}</span>
            <span class="year-marker-count">{{ gift.list.length }} 笔</span>
          </div>
          <div class="year-marker-balance">
            小计
            <money-amount :money="gift.netTotal" size="text-sm" />
          </div>
        </div>

        <div class="record-flow">
          <div
            v-for="item in gift.list"
            :key="item.id"
            class="record-row"
            @click="onGiftClick(item)"
          >
            <div class="record-date">
              <div class="record-day">
                {{ item.monthDay }}
              </div>
            </div>

            <div class="record-axis">
              <div class="record-line" />
              <div class="record-dot" :class="`record-dot--${getRecordTone(item.money)}`">
                <i :class="item.money > 0 ? 'i-hugeicons-arrow-down-left-01' : 'i-hugeicons-arrow-up-right-01'" />
              </div>
            </div>

            <div
              class="record-card"
              :class="`record-card--${getRecordTone(item.money)}`"
            >
              <div class="record-card-head">
                <div class="record-title">
                  {{ item.title }}
                </div>
                <div class="record-money">
                  <money-amount :money="item.money" />
                </div>
              </div>

              <div class="record-meta">
                <div class="record-pill" :class="`record-pill--${getRecordTone(item.money)}`">
                  {{ getRecordTypeText(item.money) }}
                </div>
                <div v-if="item.attendance" class="record-pill">
                  出席 {{ item.attendance }} 人
                </div>
                <div class="record-full-date">
                  {{ item.date }}
                </div>
              </div>

              <div v-if="item.remarks" class="record-remarks">
                {{ item.remarks }}
              </div>
              <div v-else class="record-remarks record-remarks--empty">
                点击查看往来详情
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <wd-fab :gap="{ bottom: 64 }" :expandable="false" @click="onAdd" />
  </div>
</template>

<style lang="scss" scoped>
.ledger-timeline {
  margin: 28rpx 0 48rpx;
}

.timeline-year {
  margin-bottom: 28rpx;
}

.timeline-year:last-child {
  margin-bottom: 0;
}

.year-marker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 16rpx 118rpx;
  color: #9ca3af;
}

.year-marker-main,
.year-marker-balance {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.year-marker-text {
  color: #111827;
  font-size: 32rpx;
  font-weight: 800;
  line-height: 1;
}

.year-marker-count,
.year-marker-balance {
  font-size: 22rpx;
}

.year-marker-balance :deep(div) {
  line-height: 1;
}

.record-flow {
  margin-top: 0;
}

.record-row {
  display: grid;
  grid-template-columns: 104rpx 46rpx minmax(0, 1fr);
  column-gap: 14rpx;
  min-height: 172rpx;
}

.record-date {
  padding-top: 28rpx;
  text-align: right;
}

.record-day {
  color: #111827;
  font-size: 28rpx;
  font-weight: 700;
}

.record-axis {
  position: relative;
  display: flex;
  justify-content: center;
}

.record-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2rpx;
  transform: translateX(-50%);
  background: linear-gradient(180deg, rgba(248, 113, 113, 0.2), rgba(20, 184, 166, 0.22));
}

.record-dot {
  position: relative;
  z-index: 1;
  width: 36rpx;
  height: 36rpx;
  margin-top: 26rpx;
  border: 6rpx solid #efefef;
  border-radius: 50%;
  color: #fff;
  font-size: 22rpx;
  line-height: 30rpx;
  text-align: center;
  box-shadow: 0 8rpx 20rpx rgba(15, 23, 42, 0.1);
}

.record-dot--income {
  background: #f87171;
}

.record-dot--expense {
  background: #14b8a6;
}

.record-card {
  min-width: 0;
  overflow: hidden;
  margin-bottom: 20rpx;
  border: 1rpx solid rgba(229, 231, 235, 0.9);
  border-radius: 24rpx;
  background: #fff;
  padding: 22rpx 24rpx;
  box-shadow: 0 10rpx 28rpx rgba(15, 23, 42, 0.045);
}

.record-card--income {
  background: linear-gradient(90deg, rgba(255, 245, 245, 0.95), #fff 46%);
}

.record-card--expense {
  background: linear-gradient(90deg, rgba(240, 253, 250, 0.95), #fff 46%);
}

.record-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18rpx;
}

.record-title {
  min-width: 0;
  overflow: hidden;
  color: #111827;
  font-size: 32rpx;
  font-weight: 700;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.record-money {
  flex-shrink: 0;
  text-align: right;
}

.record-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10rpx;
  margin-top: 14rpx;
}

.record-pill {
  border-radius: 999rpx;
  background: #f3f4f6;
  padding: 6rpx 14rpx;
  color: #6b7280;
  font-size: 22rpx;
  line-height: 1.2;
}

.record-pill--income {
  background: #fee2e2;
  color: #ef4444;
}

.record-pill--expense {
  background: #ccfbf1;
  color: #0f766e;
}

.record-full-date {
  color: #9ca3af;
  font-size: 22rpx;
  line-height: 1.2;
}

.record-remarks {
  display: -webkit-box;
  overflow: hidden;
  margin-top: 14rpx;
  color: #6b7280;
  font-size: 26rpx;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.record-remarks--empty {
  color: #c4c4c4;
}
</style>
