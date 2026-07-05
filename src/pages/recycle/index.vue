<script setup lang="ts">
import { useDialog } from '@wot-ui/ui'
import dayjs from 'dayjs'
import { apiBookDeleteConfirm, apiBookRecoveryPost, apiBookRecyclePageGet } from '@/api/modules/book'
import { apiBookItemDeleteConfirm, apiBookItemRecoveryPost, apiBookItemRecyclePageGet } from '@/api/modules/bookItem'
import { apiFriendDeleteConfirm, apiFriendRecoveryPost, apiFriendRecyclePageGet } from '@/api/modules/friend'
import { apiGiftDeleteConfirm, apiGiftRecoveryPost, apiGiftRecyclePageGet } from '@/api/modules/gift'

definePage({
  style: {
    navigationBarTitleText: '回收站',
    enablePullDownRefresh: true,
  },
})

type RecycleType = 'book' | 'friend' | 'bookItem' | 'gift'
type RecycleItem = (Api.Book | Api.Friend | Api.BookItem | Api.Gift) & {
  deleteTime?: string
}
type DrawerType = 'all' | RecycleType

interface RecycleRecord {
  type: RecycleType
  item: RecycleItem
}

interface RecycleConfig {
  type: RecycleType
  label: string
  shortLabel: string
  icon: string
  tone: string
  emptyTip: string
  page: (query: Api.PaginationQuery) => Promise<Api.PaginationResult<any>>
  recovery: (ids: Array<number | string>) => Promise<number>
  remove: (ids: Array<number | string>) => Promise<number>
  title: (item: RecycleItem) => string
  desc: (item: RecycleItem) => string
  money?: (item: RecycleItem) => number | undefined
}

const pageSize = 20
const allPageSize = 5
const dialog = useDialog()
const activeType = ref<DrawerType>('all')
const loading = ref(false)
const page = ref(1)
const total = ref(0)
const dataList = ref<RecycleRecord[]>([])
const drawerScrollLeft = ref(0)
const drawerScrollWidth = ref(0)
const drawerContentWidth = ref(0)
const typeTotals = ref<Record<RecycleType, number>>({
  book: 0,
  friend: 0,
  bookItem: 0,
  gift: 0,
})

const recycleConfigs: Record<RecycleType, RecycleConfig> = {
  book: {
    type: 'book',
    label: '礼簿',
    shortLabel: '礼簿',
    icon: 'i-hugeicons-book-open-02',
    tone: 'tone-rose',
    emptyTip: '没有已删除的礼簿',
    page: apiBookRecyclePageGet,
    recovery: apiBookRecoveryPost,
    remove: apiBookDeleteConfirm,
    title: item => ('title' in item && item.title) ? item.title : '未命名礼簿',
    desc: item => `${('count' in item && item.count) ? item.count : 0} 笔 · ${('date' in item && item.date) ? item.date : '无日期'}`,
    money: item => ('moneyTotal' in item ? item.moneyTotal : undefined),
  },
  friend: {
    type: 'friend',
    label: '亲友',
    shortLabel: '亲友',
    icon: 'i-hugeicons-user-group',
    tone: 'tone-emerald',
    emptyTip: '没有已删除的亲友',
    page: apiFriendRecyclePageGet,
    recovery: apiFriendRecoveryPost,
    remove: apiFriendDeleteConfirm,
    title: item => ('name' in item && item.name) ? item.name : '未命名亲友',
    desc: (item) => {
      const relation = ('relation' in item && item.relation) ? `@${item.relation}` : '未填写关系'
      const tags = ('tagList' in item && item.tagList?.length) ? item.tagList.join('、') : '无标签'
      return `${relation} · ${tags}`
    },
  },
  bookItem: {
    type: 'bookItem',
    label: '收礼',
    shortLabel: '收礼',
    icon: 'i-hugeicons-wallet-add-01',
    tone: 'tone-sky',
    emptyTip: '没有已删除的收礼记录',
    page: apiBookItemRecyclePageGet,
    recovery: apiBookItemRecoveryPost,
    remove: apiBookItemDeleteConfirm,
    title: (item) => {
      const friendName = ('friendName' in item && item.friendName) ? item.friendName : '未命名亲友'
      const title = ('title' in item && item.title) ? item.title : '收礼记录'
      return `${friendName} · ${title}`
    },
    desc: item => `${('date' in item && item.date) ? item.date : '无日期'} · ${('moneyType' in item && item.moneyType === 1) ? '实物' : '礼金'}`,
    money: item => ('money' in item ? item.money : undefined),
  },
  gift: {
    type: 'gift',
    label: '往来',
    shortLabel: '往来',
    icon: 'i-hugeicons-gift',
    tone: 'tone-amber',
    emptyTip: '没有已删除的人情往来记录',
    page: apiGiftRecyclePageGet,
    recovery: apiGiftRecoveryPost,
    remove: apiGiftDeleteConfirm,
    title: (item) => {
      const friendName = ('friendName' in item && item.friendName) ? item.friendName : '未命名亲友'
      const title = ('title' in item && item.title) ? item.title : '人情往来'
      return `${friendName} · ${title}`
    },
    desc: item => `${('date' in item && item.date) ? item.date : '无日期'} · ${('moneyType' in item && item.moneyType === 1) ? '实物' : '礼金'}`,
    money: item => ('money' in item ? item.money : undefined),
  },
}

const tabs = Object.values(recycleConfigs)
const drawerTabs = computed(() => [
  {
    type: 'all' as const,
    label: '全部',
    icon: 'i-hugeicons-inbox',
    total: Object.values(typeTotals.value).reduce((sum, value) => sum + value, 0),
  },
  ...tabs.map(tab => ({
    type: tab.type,
    label: tab.shortLabel,
    icon: tab.icon,
    total: typeTotals.value[tab.type],
  })),
])
const currentConfig = computed(() => activeType.value === 'all' ? null : recycleConfigs[activeType.value])
const isLastPage = computed(() => dataList.value.length >= total.value)
const isEmpty = computed(() => !loading.value && dataList.value.length === 0)
const loadmoreState = computed(() => loading.value ? 'loading' : isLastPage.value ? 'finished' : 'error')
const currentTitle = computed(() => currentConfig.value ? `${currentConfig.value.label}抽屉` : '全部抽屉')
const currentEmptyTip = computed(() => currentConfig.value?.emptyTip ?? '这里很干净，暂时没有可恢复的数据')
const showDrawerCue = computed(() => {
  if (drawerContentWidth.value <= drawerScrollWidth.value)
    return false

  return drawerScrollLeft.value + drawerScrollWidth.value < drawerContentWidth.value - 8
})

const formatDeleteTime = (deleteTime?: string) => {
  if (!deleteTime)
    return '未知时间'

  return dayjs(deleteTime).format('YYYY-MM-DD HH:mm')
}

const formatDeleteClock = (deleteTime?: string) => {
  if (!deleteTime)
    return '未知时间'

  return dayjs(deleteTime).format('HH:mm')
}

const getDeleteGroupLabel = (deleteTime?: string) => {
  if (!deleteTime)
    return '较早'

  const date = dayjs(deleteTime)
  if (date.isSame(dayjs(), 'day'))
    return '今天'

  if (date.isSame(dayjs().subtract(1, 'day'), 'day'))
    return '昨天'

  return date.format('MM月DD日')
}

const getItemId = (item: RecycleItem) => item.id
const getRecordConfig = (record: RecycleRecord) => recycleConfigs[record.type]

const createRecords = (type: RecycleType, items: RecycleItem[]) => items.map(item => ({ type, item }))

const sortRecordsByDeleteTime = (records: RecycleRecord[]) => {
  return records.sort((a, b) => dayjs(b.item.deleteTime || 0).valueOf() - dayjs(a.item.deleteTime || 0).valueOf())
}

const groupedRecords = computed(() => {
  return dataList.value.reduce((groups, record) => {
    const label = getDeleteGroupLabel(record.item.deleteTime)
    const group = groups.find(item => item.label === label)
    if (group) {
      group.records.push(record)
    }
    else {
      groups.push({
        label,
        records: [record],
      })
    }

    return groups
  }, [] as Array<{ label: string, records: RecycleRecord[] }>)
})

const loadData = async (reset = false) => {
  if (loading.value)
    return

  loading.value = true
  if (reset) {
    page.value = 1
    dataList.value = []
    total.value = 0
  }

  try {
    if (activeType.value === 'all') {
      const results = await Promise.all(tabs.map(async (config) => {
        const result = await config.page({
          page: page.value,
          pageSize: allPageSize,
          field: 'deleteTime',
          order: 'desc',
        })

        return {
          type: config.type,
          result,
        }
      }))

      const records = results.flatMap(({ type, result }) => createRecords(type, (result.items ?? []) as RecycleItem[]))
      const nextTotals = { ...typeTotals.value }
      results.forEach(({ type, result }) => {
        nextTotals[type] = result.total ?? 0
      })
      typeTotals.value = nextTotals
      dataList.value = reset ? sortRecordsByDeleteTime(records) : sortRecordsByDeleteTime([...dataList.value, ...records])
      total.value = Object.values(nextTotals).reduce((sum, value) => sum + value, 0)
      return
    }

    const config = recycleConfigs[activeType.value]
    const result = await config.page({
      page: page.value,
      pageSize,
      field: 'deleteTime',
      order: 'desc',
    })
    const records = createRecords(config.type, (result.items ?? []) as RecycleItem[])
    typeTotals.value = {
      ...typeTotals.value,
      [config.type]: result.total ?? 0,
    }
    dataList.value = reset ? records : [...dataList.value, ...records]
    total.value = result.total ?? dataList.value.length
  }
  finally {
    loading.value = false
    uni.stopPullDownRefresh()
  }
}

const loadMore = () => {
  if (loading.value || isLastPage.value)
    return

  page.value++
  loadData()
}

const updateDrawerMetrics = () => {
  nextTick(() => {
    const query = uni.createSelectorQuery()
    query.select('.drawer-scroll').boundingClientRect()
    query.select('.drawer-tabs').boundingClientRect()
    query.exec((rects) => {
      const scrollRect = rects?.[0] as UniApp.NodeInfo | undefined
      const contentRect = rects?.[1] as UniApp.NodeInfo | undefined
      drawerScrollWidth.value = scrollRect?.width ?? 0
      drawerContentWidth.value = contentRect?.width ?? 0
    })
  })
}

const onDrawerScroll = (event: any) => {
  drawerScrollLeft.value = event?.detail?.scrollLeft ?? 0
  if (event?.detail?.scrollWidth)
    drawerContentWidth.value = event.detail.scrollWidth
}

const onTabClick = (type: DrawerType) => {
  if (activeType.value === type)
    return

  activeType.value = type
}

const onRecovery = async (record: RecycleRecord) => {
  const id = getItemId(record.item)
  if (!id)
    return

  await getRecordConfig(record).recovery([id])
  uni.showToast({
    title: '恢复成功',
    icon: 'success',
  })
  await loadData(true)
}

const onDeleteConfirm = (record: RecycleRecord) => {
  const id = getItemId(record.item)
  if (!id)
    return

  dialog.confirm({
    title: '彻底删除',
    msg: '彻底删除后无法恢复，确定继续？',
    confirmButtonText: '彻底删除',
  }).then(async () => {
    await getRecordConfig(record).remove([id])
    uni.showToast({
      title: '已彻底删除',
      icon: 'success',
    })
    await loadData(true)
  })
}

watch(activeType, () => loadData(true))

onShow(() => loadData(true))

onMounted(() => updateDrawerMetrics())

onPullDownRefresh(() => loadData(true))

onReachBottom(() => loadMore())
</script>

<template>
  <div class="recycle-page">
    <wd-dialog />

    <div class="drawer-hero">
      <div class="drawer-hero__mark">
        数据暂存
      </div>
      <div class="drawer-hero__title">
        回收站
      </div>
      <div class="drawer-hero__desc">
        这些数据还没有彻底离开，可以在这里恢复。
      </div>
    </div>

    <div class="drawer-scroll-wrap">
      <scroll-view scroll-x class="drawer-scroll" show-scrollbar="false" @scroll="onDrawerScroll">
        <div class="drawer-tabs">
          <div
            v-for="tab in drawerTabs"
            :key="tab.type"
            class="drawer-tab"
            :class="{ 'drawer-tab--active': activeType === tab.type }"
            @click="onTabClick(tab.type)"
          >
            <div class="drawer-tab__icon" :class="tab.icon" />
            <div class="drawer-tab__text">
              {{ tab.label }}
            </div>
            <div class="drawer-tab__count">
              {{ tab.total }}
            </div>
          </div>
        </div>
      </scroll-view>
      <div v-show="showDrawerCue" class="drawer-scroll-cue">
        <div class="i-hugeicons-arrow-right-02" />
      </div>
    </div>

    <div class="drawer-summary">
      <div class="drawer-summary__content">
        <div>
          <div class="drawer-summary__title">
            {{ currentTitle }}
          </div>
          <div class="drawer-summary__desc">
            按删除时间收纳，恢复后会回到原来的列表。
          </div>
        </div>
        <div class="drawer-summary__badge">
          {{ total }} 项
        </div>
      </div>
    </div>

    <template v-if="isEmpty">
      <div class="drawer-empty">
        <div class="drawer-empty__icon i-hugeicons-recycle-02" />
        <div class="drawer-empty__title">
          {{ currentEmptyTip }}
        </div>
        <div class="drawer-empty__desc">
          删除的数据会先放在这里，确认无用后再彻底删除。
        </div>
      </div>
    </template>

    <template v-else>
      <div class="paper-stack">
        <div
          v-for="group in groupedRecords"
          :key="group.label"
          class="paper-group"
        >
          <div class="paper-group__head">
            <div class="paper-group__label">
              {{ group.label }}
            </div>
            <div class="paper-group__count">
              {{ group.records.length }} 张纸页
            </div>
          </div>

          <div
            v-for="record in group.records"
            :key="`${record.type}-${record.item.id}`"
            class="paper-slip"
            :class="`paper-slip--${record.type}`"
          >
            <div class="paper-slip__edge" />
            <div class="paper-slip__main">
              <div class="paper-slip__meta">
                <div class="paper-slip__stamp">
                  <div class="paper-slip__stamp-icon" :class="getRecordConfig(record).icon" />
                  <div>{{ getRecordConfig(record).label }}</div>
                </div>
                <div class="paper-slip__time">
                  {{ formatDeleteClock(record.item.deleteTime) }}
                </div>
              </div>

              <div class="paper-slip__title">
                {{ getRecordConfig(record).title(record.item) }}
              </div>

              <div class="paper-slip__desc">
                {{ getRecordConfig(record).desc(record.item) }}
              </div>

              <div class="paper-slip__footer">
                <div class="paper-slip__deleted">
                  删除于 {{ formatDeleteTime(record.item.deleteTime) }}
                </div>
                <money-amount
                  v-if="getRecordConfig(record).money?.(record.item) !== undefined"
                  :money="getRecordConfig(record).money?.(record.item)"
                  size="text-base"
                />
              </div>

              <div class="paper-slip__actions">
                <wd-button size="small" round @click="onRecovery(record)">
                  恢复
                </wd-button>
                <button class="paper-slip__danger" @click="onDeleteConfirm(record)">
                  彻底删除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <wd-loadmore
        :state="loadmoreState"
        :loading-props="{ color: '#f87171' }"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.recycle-page {
  min-height: 100vh;
  padding: 8rpx 24rpx 48rpx;
  background:
    linear-gradient(180deg, rgba(248, 113, 113, 0.06), rgba(248, 250, 252, 0) 260rpx),
    #f8fafc;
}

.drawer-hero {
  padding: 24rpx 4rpx 18rpx;
}

.drawer-hero__mark {
  width: fit-content;
  border: 1rpx solid rgba(239, 68, 68, 0.18);
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.72);
  padding: 8rpx 18rpx;
  color: #ef4444;
  font-size: 22rpx;
  line-height: 1;
}

.drawer-hero__title {
  margin-top: 18rpx;
  color: #111827;
  font-size: 46rpx;
  font-weight: 800;
  line-height: 1.1;
}

.drawer-hero__desc {
  margin-top: 10rpx;
  color: #6b7280;
  font-size: 26rpx;
  line-height: 1.5;
}

.drawer-scroll-wrap {
  position: relative;
  overflow: hidden;
  margin-right: -24rpx;
}

.drawer-scroll {
  width: 100%;
  white-space: nowrap;
}

.drawer-tabs {
  display: flex;
  align-items: center;
  gap: 16rpx;
  min-width: max-content;
  padding: 8rpx 92rpx 18rpx 2rpx;
}

.drawer-scroll-cue {
  pointer-events: none;
  position: absolute;
  top: 8rpx;
  right: 0;
  bottom: 18rpx;
  width: 96rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 22rpx;
  background: linear-gradient(90deg, rgba(248, 250, 252, 0), #f8fafc 62%);
  color: #ef4444;
  font-size: 30rpx;
}

.drawer-tab {
  min-width: 148rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  border: 1rpx solid rgba(229, 231, 235, 0.9);
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.82);
  padding: 14rpx 18rpx;
  color: #6b7280;
  box-shadow: 0 8rpx 22rpx rgba(15, 23, 42, 0.035);
}

.drawer-tab--active {
  border-color: rgba(239, 68, 68, 0.22);
  background: #fff;
  color: #ef4444;
  box-shadow: 0 12rpx 28rpx rgba(239, 68, 68, 0.08);
}

.drawer-tab__icon {
  font-size: 28rpx;
}

.drawer-tab__text {
  font-size: 26rpx;
  font-weight: 700;
}

.drawer-tab__count {
  min-width: 34rpx;
  border-radius: 999rpx;
  background: #f3f4f6;
  padding: 3rpx 9rpx;
  color: #6b7280;
  font-size: 20rpx;
  line-height: 1.2;
  text-align: center;
}

.drawer-tab--active .drawer-tab__count {
  background: #fee2e2;
  color: #ef4444;
}

.drawer-summary {
  position: relative;
  margin-top: 2rpx;
}

.drawer-summary__content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx;
  border: 1rpx solid rgba(229, 231, 235, 0.78);
  border-radius: 20rpx;
  background: #fff;
  padding: 24rpx;
  box-shadow: 0 12rpx 30rpx rgba(15, 23, 42, 0.04);
}

.drawer-summary__title {
  color: #111827;
  font-size: 30rpx;
  font-weight: 800;
  line-height: 1.2;
}

.drawer-summary__desc {
  margin-top: 8rpx;
  color: #9ca3af;
  font-size: 23rpx;
  line-height: 1.4;
}

.drawer-summary__badge {
  flex-shrink: 0;
  border-radius: 999rpx;
  background: #f3f4f6;
  padding: 8rpx 18rpx;
  color: #4b5563;
  font-size: 24rpx;
}

.drawer-empty {
  margin: 140rpx 28rpx 0;
  text-align: center;
}

.drawer-empty__icon {
  width: 104rpx;
  height: 104rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 34rpx;
  background: #fff;
  color: #cbd5e1;
  font-size: 56rpx;
  box-shadow: 0 12rpx 28rpx rgba(15, 23, 42, 0.04);
}

.drawer-empty__title {
  margin-top: 24rpx;
  color: #374151;
  font-size: 30rpx;
  font-weight: 700;
}

.drawer-empty__desc {
  margin-top: 10rpx;
  color: #9ca3af;
  font-size: 24rpx;
  line-height: 1.5;
}

.paper-stack {
  margin-top: 28rpx;
}

.paper-group {
  position: relative;
}

.paper-group + .paper-group {
  margin-top: 34rpx;
}

.paper-group__head {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 16rpx;
  padding: 0 4rpx;
}

.paper-group__label {
  color: #111827;
  font-size: 28rpx;
  font-weight: 800;
  line-height: 1;
}

.paper-group__count {
  color: #9ca3af;
  font-size: 22rpx;
  line-height: 1;
}

.paper-slip {
  position: relative;
  overflow: hidden;
  display: flex;
  min-width: 0;
  border: 1rpx solid rgba(229, 231, 235, 0.86);
  border-radius: 18rpx;
  background:
    linear-gradient(90deg, rgba(248, 250, 252, 0.95), rgba(255, 255, 255, 0) 110rpx),
    #fff;
  box-shadow: 0 12rpx 30rpx rgba(15, 23, 42, 0.052);
}

.paper-slip + .paper-slip {
  margin-top: 18rpx;
}

.paper-slip__edge {
  width: 12rpx;
  flex-shrink: 0;
  background: #ef4444;
}

.paper-slip--friend .paper-slip__edge {
  background: #18a47f;
}

.paper-slip--bookItem .paper-slip__edge {
  background: #2d8edb;
}

.paper-slip--gift .paper-slip__edge {
  background: #c27a18;
}

.paper-slip__main {
  min-width: 0;
  flex: 1;
  padding: 24rpx 24rpx 22rpx;
}

.paper-slip__meta,
.paper-slip__footer,
.paper-slip__actions {
  display: flex;
  align-items: center;
}

.paper-slip__meta {
  justify-content: space-between;
  gap: 16rpx;
}

.paper-slip__stamp {
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: 8rpx;
  border-radius: 999rpx;
  background: #f8fafc;
  padding: 7rpx 14rpx;
  color: #64748b;
  font-size: 22rpx;
  line-height: 1.2;
}

.paper-slip__stamp-icon {
  font-size: 24rpx;
}

.paper-slip__time {
  flex-shrink: 0;
  color: #cbd5e1;
  font-size: 22rpx;
  font-weight: 700;
}

.paper-slip__title {
  display: -webkit-box;
  overflow: hidden;
  margin-top: 18rpx;
  color: #111827;
  font-size: 32rpx;
  font-weight: 800;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.paper-slip__desc {
  overflow: hidden;
  margin-top: 10rpx;
  color: #6b7280;
  font-size: 25rpx;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.paper-slip__footer {
  justify-content: space-between;
  gap: 16rpx;
  margin-top: 16rpx;
}

.paper-slip__deleted {
  min-width: 0;
  overflow: hidden;
  color: #9ca3af;
  font-size: 22rpx;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.paper-slip__actions {
  justify-content: flex-end;
  gap: 18rpx;
  margin-top: 18rpx;
}

.paper-slip__danger {
  margin: 0;
  border: 0;
  background: transparent;
  padding: 0;
  color: #9ca3af;
  font-size: 24rpx;
  line-height: 56rpx;
}

.paper-slip__danger::after {
  display: none;
}
</style>
