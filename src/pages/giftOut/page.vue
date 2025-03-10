<script setup lang="ts">
import { giftCategory } from '@/constants/app'
import { useLoadMore } from 'vue-request'

const loading = ref(false)
const columns = [
  { name: '全部', value: '' },
  ...Object.entries(giftCategory).map(([name, icon]) => ({ name, value: icon })),
]
const search = ref({
  keyword: '',
  icon: '',
  showAction: false,
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

onLoad(() => {
  loading.value = true
})

onShow(async () => {
  await refreshAsync()
  loading.value = false
})

onPullDownRefresh(async () => {
  await refreshAsync()
  uni.stopPullDownRefresh()
})

onReachBottom(() => {
  if (noMore.value)
    return
  loadMoreAsync()
})

function searchOk() {
  refreshAsync()
}
function searchCancel() {
  search.value = {
    keyword: '',
    icon: '',
    showAction: false,
  }
  refreshAsync()
}

const handleGiftClick = (id?: string) => {
  if (id) {
    uni.navigateTo({
      url: `/pages/giftOut/detail?id=${id}`,
    })
  }
  else {
    uni.navigateTo({
      url: '/pages/giftOut/edit',
    })
  }
}
</script>

<template>
  <div class="h-full bg-[url('https://poemcode.cn/liji-oss/assets/bg/bg_giftout.png')] bg-contain bg-no-repeat">
    <safe-area-inset-top />
    <div class="mx-3">
      <wd-search v-model="search.keyword" custom-class="!p-0 w-52" :hide-cancel="!search.showAction" light
                 placeholder-left @search="searchOk" @cancel="searchCancel" @focus="search.showAction = true"
      />
      <div class="mt-2 flex items-center justify-between">
        <div class="ms-2 text-lg font-bold">
          送礼
        </div>
        <div class="p-2" @click="handleGiftClick()">
          <i class="i-hugeicons-plus-sign-circle text-lg text-red" />
        </div>
      </div>
      <uv-tabs :list="columns" line-color="#f87171" @click="onTabsClick" />
    </div>
    <div class="mx-6">
      <div v-if="loading" class="mt-5 text-center">
        <div class="flex">
          <wd-skeleton :row-col="[{ size: '52px', type: 'circle' }]" />
          <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }"
                       :row-col="[{ width: '40%' }, { width: '100%' }, { width: '60%' }]"
          />
        </div>
      </div>
      <div v-else>
        <div v-if="dataList.length === 0" class="my-24">
          <uv-empty text="还没有人情往来记录哦~" mode="favor">
            <div class="mt-6">
              <wd-button type="primary" @click="handleGiftClick()">
                添加送礼
              </wd-button>
            </div>
          </uv-empty>
        </div>
        <div v-else class="my-5 space-y-5">
          <div v-for="i in dataList" :key="i.id" @click="handleGiftClick(i.id)">
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
              <div class="text-lg font-bold" :class="[i.icon === 'i-tabler-candle' ? 'text-gray' : 'text-red']">
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
  </div>
</template>

<style lang="scss" scoped></style>
