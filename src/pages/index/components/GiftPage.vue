<script setup lang="ts">
import { usePagination } from 'alova/client'
import { storeToRefs } from 'pinia'
import { useMessage } from 'wot-design-uni'
import { giftCategory } from '@/constants/app'

const columns = [
  { name: '全部', value: '' },
  ...Object.entries(giftCategory).map(([name, icon]) => ({
    name,
    value: icon,
  })),
]

let videoAd: any = null
const { isVip } = storeToRefs(useAuthStore())

const message = useMessage()
const search = reactive({
  keyword: '',
  icon: '',
})

const { loading, page, data: dataList, isLastPage, reload } = usePagination((page, pageSize) => apiGiftPageGet({ page, pageSize, field: 'date', order: 'desc', ...search }), {
  data: response => response.items || [],
  immediate: false,
  append: true,
  watchingStates: [search],
  preloadPreviousPage: false,
  preloadNextPage: false,
})

const handlePlayVideoAd = () => {
  if (videoAd) {
    videoAd.show().catch(() => {
      // 失败重试
      videoAd.load()
        .then(() => videoAd.show())
        .catch((err: any) => {
          uni.showToast({
            icon: 'none',
            title: '激励视频 广告显示失败',
          })
          console.error('激励视频 广告显示失败', err)
        })
    })
  }
}

const handleGiftExport = async () => {
  uni.showLoading({
    title: '正在导出数据...',
    mask: true,
  })
  const { tempFilePath } = await apiGiftOutExportGet()
  uni.openDocument({
    filePath: tempFilePath,
    showMenu: true,
    fileType: 'pdf',
    fail: (err) => {
      uni.showToast({
        icon: 'none',
        title: err.errMsg || '导出失败！',
      })
    },
  })
  uni.hideLoading()
}

const onGiftExport = () => {
  if (isVip.value) {
    handleGiftExport()
  }
  else {
    message.confirm({
      msg: '成为会员，即可解锁数据导出无限制权益',
      title: '数据导出权益',
      confirmButtonText: '开通会员',
      cancelButtonText: '看广告解锁',
    }).then(() => {
      uni.navigateTo({
        url: '/pages/subscription/plan',
      })
    }).catch(({ action }) => {
      if (action === 'cancel')
        handlePlayVideoAd()
    })
  }
}

const onGiftClick = (id?: string) => {
  if (id) {
    uni.navigateTo({
      url: `/pages/giftOut/detail?id=${id}`,
    })
  }
}

const onAdd = () => {
  uni.navigateTo({
    url: '/pages/gift/edit',
  })
}
const onSearch = () => {
  uni.navigateTo({
    url: `/pages/search/index?activeTab=1`,
  })
}

const onTabsClick = (item: any) => {
  search.icon = item.value
}

onMounted(() => {
  if (wx.createRewardedVideoAd) {
    videoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-f2113fa7b839e7e6',
    })
    videoAd.onLoad(() => { })
    videoAd.onError((err: any) => {
      console.error('激励视频广告加载失败', err)
    })
    videoAd.onClose((res: any) => {
      // 用户点击了【关闭广告】按钮
      if (res && res.isEnded) {
        // 正常播放结束，可以下发游戏奖励
        handleGiftExport()
      }
    })
  }
})

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
        <i class="i-hugeicons-cloud-download ms-3" @click="onGiftExport()" />
        <i class="i-hugeicons-plus-sign-circle ms-3" @click="onAdd()" />
      </div>
    </div>

    <div class="mt-3">
      <uv-tabs :list="columns" line-width="0" line-height="0" :active-style="{
        color: '#f87171',
        fontWeight: 'bold',
        transform: 'scale(1.1)',
      }" :inactive-style="{
        color: '#606266',
        transform: 'scale(1)',
      }" item-style="height: 35px;" @click="onTabsClick"
      />
    </div>
    <template v-if="dataList.length === 0">
      <div v-if="loading" class="mt-5 text-center">
        <wd-loading color="#f87171" />
        <div class="mt-3 text-gray">
          正在努力加载中...
        </div>
      </div>
      <div v-else class="my-24">
        <uv-empty v-if="!search.keyword" text="还没有人情往来记录哦~" mode="favor">
          <div class="mt-6">
            <wd-button class="mt-6" type="primary" @click="onAdd()">
              添加送礼
            </wd-button>
          </div>
        </uv-empty>
        <uv-empty v-else mode="search" />
      </div>
    </template>
    <div v-else class="m-2">
      <div v-for="(i, index) in dataList" :key="i.id" @click="onGiftClick(i.id)">
        <uv-divider v-if="index" />
        <div class="flex">
          <div class="h-12 w-12 flex flex-shrink-0 rounded-full" :class="[
            i.icon === 'i-tabler-candle'
              ? 'bg-gray-100 text-gray'
              : 'bg-red-50 text-red',
          ]"
          >
            <div class="m-auto h-8 w-8" :class="i.icon || 'i-mingcute-wallet-2-line'" />
          </div>
          <div class="mx-4 grow">
            <div class="text-lg font-bold">
              {{ i.friendName }}
            </div>
            <div class="text-gray">
              {{ i.title }}<span v-if="i.remarks">({{ i.remarks }})</span>
            </div>
            <div class="mt-1 text-xs text-gray">
              <span>{{ i.lunarDate }}</span>
              <span class="ml-2">({{ i.date }}) </span>
            </div>
          </div>
          <div class="text-lg font-bold" :class="[
            i.icon === 'i-tabler-candle' ? 'text-gray' : 'text-teal',
          ]"
          >
            -{{ i.money }}
          </div>
        </div>
      </div>
      <wd-loadmore :state="loading ? 'loading' : isLastPage ? 'finished' : ''"
                   :loading-props="{ color: '#f87171' }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
