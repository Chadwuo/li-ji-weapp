<script setup lang="ts">
import { useLoadMore } from 'vue-request'

const tabsList = ref([
  {
    name: '全部',
    value: '',
  },
  {
    name: '结婚',
    value: 'i-bi-postcard-heart',
  },
  {
    name: '宝宝',
    value: 'i-mingcute-baby-line',
  },
  {
    name: '周岁',
    value: 'i-icon-park-outline-baby-feet',
  },
  {
    name: '乔迁',
    value: 'i-tabler-home-move',
  },
  {
    name: '生日',
    value: 'i-mingcute-cake-line',
  },
  {
    name: '升学',
    value: 'i-carbon-education',
  },
  {
    name: '压岁',
    value: 'i-icon-park-outline-red-envelope',
  },
  {
    name: '探望',
    value: 'i-healthicons-fruits-outline',
  },
  {
    name: '白事',
    value: 'i-tabler-candle',
  },
  {
    name: '其他',
    value: 'i-mingcute-wallet-2-line',
  },
])
const search = ref({
  keyword: '',
  icon: '',
  showAction: false,
})
const { dataList, loadingMore, loadMoreAsync, refreshAsync } = useLoadMore<Api.LoadMoreDataType<Api.GiftOut>>(
  async (d) => {
    const _page = d?.page ? d.page + 1 : 1
    const response = await apiGiftOutPageGet({
      page: _page,
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
  },
)

function onTabsClick(item: any) {
  search.value.icon = item.value
  refreshAsync()
}

onPullDownRefresh(async () => {
  await refreshAsync()
  uni.stopPullDownRefresh()
})

onReachBottom(() => {
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

const handleGiftClick = (id?: number) => {
  if (!id) {
    uni.navigateTo({
      url: '/pages/giftOut/edit',
    })
  }
  else {
    uni.navigateTo({
      url: `/pages/giftOut/edit?id=${id}`,
    })
  }
}
</script>

<template>
  <div>
    <wd-navbar safe-area-inset-top custom-style="background-color: transparent !important;">
      <template #left>
        <div class="flex items-center">
          <div class="ms-2 text-lg font-bold">
            送礼
          </div>
          <div class="p-2" @click="handleGiftClick">
            <div class="i-carbon-add-alt text-red" />
          </div>
        </div>
      </template>
    </wd-navbar>

    <div class="rounded-2xl bg-white p-5">
      <uv-tabs :list="tabsList" line-color="#f87171" @click="onTabsClick" />
      <div class="mt-3">
        <uv-search v-model="search.keyword" placeholder="请输入搜索内容" :show-action="search.showAction" action-text="取消"
                   @focus="search.showAction = true" @custom="searchCancel" @search="searchOk"
        />
      </div>

      <div v-if="dataList.length === 0" class="my-auto">
        <uv-empty />
      </div>
      <div v-else class="mt-5 bg-white space-y-3">
        <div v-for="i in dataList" :key="i.id" @click="handleGiftClick(i.id)">
          <div class="flex flex-shrink-0 items-center justify-between py-4">
            <div class="h-12 w-12 flex flex-shrink rounded-full" :class="[
              i.icon === 'i-tabler-candle'
                ? 'bg-gray-100 text-gray'
                : 'bg-red-50 text-red',
            ]"
            >
              <div class="m-auto h-8 w-8" :class="i.icon" />
            </div>
            <div class="mx-4">
              <div class="text-lg font-bold">
                {{ i.friendName }}
              </div>
              <div>
                {{ i.title }}<span v-if="i.remarks">（{{ i.remarks }}）</span>
              </div>
              <div class="mt-1 text-xs text-gray">
                {{ i.date }} {{ i.lunarDate }}
              </div>
            </div>
            <div class="font-bold" :class="[i.icon === 'i-tabler-candle' ? 'text-gray' : 'text-red']">
              <span class="text-sm">￥</span>{{ i.money }}
            </div>
          </div>
        </div>
        <wd-loadmore :state="loadingMore ? 'loading' : ''" :loading-props="{ color: '#f87171' }" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationStyle": "custom"
  }
}
</route>
