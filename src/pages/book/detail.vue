<script setup lang="ts">
import { usePagination } from 'alova/client'
import { storeToRefs } from 'pinia'
import { useMessage, useQueue } from 'wot-design-uni'

const { closeOutside } = useQueue()
let videoAd: any = null
const { isVip } = storeToRefs(useAuthStore())
const search = ref({
  field: 'id',
  order: 'asc',
  keyword: '',
})
const message = useMessage()
const popupShow = ref(false)
const book = ref<Api.Book>({})
const sortList = ref([
  { label: '默认', field: 'id', value: 1 },
  { label: '姓名', field: 'friendName', value: 0 },
  { label: '金额', field: 'money', value: 0 },
])

const { loading, page, data: dataList, isLastPage, reload } = usePagination((page, pageSize) => apiBookItemPageGet({ bookId: book.value.id, page, pageSize, ...search.value }), {
  data: response => response.items || [],
  total: response => response.total || 0,
  append: true,
  immediate: false,
  watchingStates: [search],
  debounce: [300],
  preloadPreviousPage: false,
  preloadNextPage: false,
})

const netAmount = computed(() => {
  if (book.value.moneyTotal !== undefined && book.value.cost !== undefined) {
    return book.value.moneyTotal - book.value.cost
  }
  return 0
})

const loadData = async () => {
  book.value = await apiBookGet({ id: book.value.id })
}
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

const handleBookExport = async () => {
  uni.showLoading({
    title: '正在导出数据...',
    mask: true,
  })
  const { tempFilePath } = await apiBookExportGet(book.value.id)
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

onLoad(async (option) => {
  loading.value = true
  if (option?.id) {
    book.value.id = option.id
  }

  // 在页面onLoad回调事件中创建激励视频广告实例
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
        handleBookExport()
      }
    })
  }
})

onShow(async () => {
  await loadData()
  await reload()
})

onReachBottom(() => {
  if (loading.value || isLastPage.value)
    return
  page.value++
})

const onSortChange = (sort: any) => {
  sortList.value.forEach((item) => {
    if (item.field !== sort.field) {
      item.value = 0
    }
  })

  search.value.field = sort?.field
  search.value.order = sort?.value === 1 ? 'asc' : 'desc'
}

const onGiftClick = (gid?: string) => {
  if (gid) {
    uni.navigateTo({
      url: `/pages/bookItem/detail?id=${gid}`,
    })
  }
}

const onGiftAdd = () => {
  uni.navigateTo({
    url: `/pages/bookItem/edit?bookId=${book.value.id}`,
  })
}

const onBookEdit = () => {
  uni.navigateTo({
    url: `/pages/book/edit?id=${book.value.id}`,
  })
}

const onBookExport = () => {
  if (isVip.value) {
    handleBookExport()
  }
  else {
    message
      .confirm({
        msg: '成为会员，即可解锁数据导出无限制权益',
        title: '数据导出权益',
        confirmButtonText: '开通会员',
        cancelButtonText: '看广告解锁',
      })
      .then(() => {
        uni.navigateTo({
          url: '/pages/subscription/plan',
        })
      })
      .catch(({ action }) => {
        if (action === 'cancel')
          handlePlayVideoAd()
      })
  }
}

const onBookDel = () => {
  message.confirm({
    msg: '该礼簿所有人情往来记录都将被删除，确定删除？',
    title: '删除礼簿',
  }).then(async () => {
    await apiBookDelete({ id: book.value.id })
    uni.showToast({
      title: '删除成功',
      icon: 'success',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  })
}

const menu = ref<Array<Record<string, any>>>([
  {
    iconClass: 'edit-1',
    content: '编辑礼簿',
  },
  {
    iconClass: 'cloud-download',
    content: '数据导出',
  },
  {
    iconClass: 'delete1',
    content: '删除礼簿',
  },
])

function onMenuClick(e: any) {
  switch (e.index) {
    case 0:
      onBookEdit()
      break
    case 1:
      onBookExport()
      break
    case 2:
      onBookDel()
      break
  }
}
</script>

<template>
  <div class="mx-3" :class="{ memorial: hasMourningWords(book.title) }" @click="closeOutside">
    <div v-if="!book.title" class="rounded-2xl bg-white p-5">
      <wd-skeleton
        :row-col="[{ width: '30%' }, { width: '60%' }, { width: '20%' }, [{ width: '20%' }, { width: '20%' }, { width: '20%' }, { width: '20%' }]]"
      />
    </div>

    <div v-else class="rounded-2xl bg-white px-5 pb-5 pt-3 space-y-3">
      <div>
        <div class="flex items-center justify-between">
          <div class="text-lg text-red font-bold">
            {{ book.title }}
          </div>
          <div>
            <wd-popover mode="menu" :content="menu" placement="bottom-end" @menuclick="onMenuClick">
              <i class="i-weui-more-filled text-xl" />
            </wd-popover>
          </div>
        </div>

        <div class="mt-1 text-sm text-gray">
          <span>{{ book.lunarDate }}</span>
          <span class="ml-2">({{ book.date }}) </span>
        </div>
      </div>
      <div class="text-sm font-bold">
        <i class="i-hugeicons-information-circle text-sm text-gray" @click="() => popupShow = true" /> 礼金：<span
          class="text-sm"
        >￥</span><span class="text-xl">{{ book.moneyTotal }}</span>
      </div>
      <div class="grid grid-cols-4 gap-5 divide-x">
        <div class="text-center">
          <div class="text-lg text-black font-bold">
            {{ book.count }}
          </div>
          <div class="flex items-center justify-center text-xs text-gray space-x-1">
            <div class="i-hugeicons-home-12" />
            <div>亲友</div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-lg text-black font-bold">
            {{ book.attendanceTotal }}
          </div>
          <div class="flex items-center justify-center text-xs text-gray space-x-1">
            <div class="i-carbon-pedestrian-family" />
            <div>出席</div>
          </div>
        </div>
        <div class="text-center text-sm text-gray">
          <div class="text-lg text-black font-bold">
            {{ book.cost }}
          </div>
          <div class="flex items-center justify-center text-xs text-gray space-x-1">
            <div class="i-carbon:sprout" />
            <div>支出</div>
          </div>
        </div>
        <div class="text-center text-sm text-gray">
          <div class="text-lg text-black font-bold">
            {{ netAmount }}
          </div>
          <div class="flex items-center justify-center text-xs text-gray space-x-1">
            <div class="i-mingcute-wallet-2-line" />
            <div>合计</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 rounded-2xl bg-white p-3 px-5">
      <div class="w-full flex items-center justify-between">
        <wd-search v-model="search.keyword" custom-class="!p-0 w-full" :maxlength="20" placeholder="请输入亲友姓名/关键词"
                   hide-cancel placeholder-left
        />
        <div class="flex text-xl text-red">
          <!-- <i class="i-hugeicons-search-02" @click="onSearchClick" /> -->
          <i class="i-hugeicons-plus-sign-circle ms-3" @click="onGiftAdd" />
        </div>
      </div>
      <div class="space-x-3">
        <wd-sort-button v-for="(item, index) in sortList" :key="index" v-model="item.value" :title="item.label"
                        @change="onSortChange(item)"
        />
      </div>
      <div class="mt-3">
        <template v-if="dataList.length === 0">
          <div v-if="loading" class="mt-5 text-center">
            <wd-loading color="#f87171" />
            <div class="mt-3 text-gray">
              正在努力加载中...
            </div>
          </div>
          <div v-else class="my-24">
            <uv-empty text="还没有人情往来记录哦~" mode="favor">
              <div class="mt-6">
                <wd-button class="mt-6" type="primary" @click="onGiftAdd()">
                  添加收礼
                </wd-button>
              </div>
            </uv-empty>
          </div>
        </template>
        <template v-else>
          <div v-for="(gift, index) in dataList" :key="gift.id" @click="onGiftClick(gift.id)">
            <uv-divider v-if="index" />
            <div class="flex justify-between text-lg">
              <div>
                {{ gift.friendName }}
              </div>
              <div class="text-red font-bold">
                +{{ gift.money }}
              </div>
            </div>
            <div class="text-sm text-gray">
              <div v-if="gift.attendance">
                {{ `出席：${gift.attendance}人` }}
              </div>
              <div class="line-clamp-1">
                {{ gift.remarks }}
              </div>
            </div>
          </div>
          <wd-loadmore :state="loading ? 'loading' : isLastPage ? 'finished' : ''"
                       :loading-props="{ color: '#f87171' }"
          />
        </template>
      </div>
    </div>

    <wd-popup v-model="popupShow" safe-area-inset-bottom position="bottom" custom-class="rounded-t-2xl">
      <div class="px-5 pt-4">
        <div class="text-center font-bold">
          名词解释
        </div>
        <div class="mt-5 text-sm space-y-1">
          <div>
            <span class="font-bold">礼金：</span>
            <span>指所有礼金收入的总和</span>
          </div>
          <div>
            <span class="font-bold">亲友：</span>
            <span>统计亲友来礼份数，预先备好伴手礼以表心意</span>
          </div>
          <div>
            <span class="font-bold">出席：</span>
            <span>与亲友提前协商确定当日宴席的实际到场人数，并据此预定酒席，恭候亲朋光临</span>
          </div>
          <div>
            <span class="font-bold">支出：</span>
            <span>在礼簿编辑阶段，可记录下诸如伴手礼、酒席等本次宴席相关成本费用</span>
          </div>
          <div>
            <span class="font-bold">合计：</span>
            <span>即全部礼金收入减去宴席相关成本后的净额</span>
          </div>
        </div>
      </div>
    </wd-popup>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "详情"
  }
}
</route>
