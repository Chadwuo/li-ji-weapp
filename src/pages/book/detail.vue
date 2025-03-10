<script setup lang="ts">
import { useLoadMore } from 'vue-request'
import { useMessage } from 'wot-design-uni'

const message = useMessage()
const loading = ref(false)
const popupShow = ref(false)
const book = ref<Api.GiftBook>({})
const search = ref({
  keyword: '',
  showAction: false,
})
const sortList = ref([
  { label: '默认', field: 'id', value: 1 },
  { label: '姓名', field: 'friendName', value: 0 },
  { label: '金额', field: 'money', value: 0 },
])

const { dataList, loadingMore, noMore, loadMoreAsync, refreshAsync } = useLoadMore<Api.LoadMoreDataType<Api.GiftIn>>(
  async (d) => {
    const _page = d?.page ? d.page + 1 : 1
    const sort = sortList.value.find(item => item.value !== 0)
    const response = await apiGiftInPageGet({
      page: _page,
      giftBookId: book.value.id,
      keyword: search.value.keyword,
      field: sort?.field,
      order: sort?.value === 1 ? 'asc' : 'desc',
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

const netAmount = computed(() => {
  if (book.value.moneyTotal !== undefined && book.value.cost !== undefined) {
    return book.value.moneyTotal - book.value.cost
  }
  return 0
})

const loadData = async () => {
  await apiGiftBookGet({ id: book.value.id }).then((res) => {
    if (res.succeeded && res.data)
      book.value = res.data
  })
}

onLoad(async (option) => {
  loading.value = true
  if (option?.id) {
    book.value.id = option.id
  }
})

onShow(async () => {
  await loadData()
  await refreshAsync()
  loading.value = false
})

onReachBottom(() => {
  if (noMore.value)
    return
  loadMoreAsync()
})

const handleSortChange = (sort: any) => {
  sortList.value.forEach((item) => {
    if (item.field !== sort.field) {
      item.value = 0
    }
  })
  refreshAsync()
}

const handleGiftClick = (gid?: string) => {
  if (gid) {
    uni.navigateTo({
      url: `/pages/giftIn/detail?id=${gid}`,
    })
  }
  else {
    uni.navigateTo({
      url: `/pages/giftIn/edit?bookId=${book.value.id}`,
    })
  }
}

const handleBookEdit = () => {
  uni.navigateTo({
    url: `/pages/book/edit?id=${book.value.id}`,
  })
}

const handleBookDel = () => {
  message.confirm({
    msg: '该礼簿所有人情往来记录都将被删除，确定删除？',
    title: '删除礼簿',
  }).then(async () => {
    const res = await apiGiftBookDelete({ id: book.value.id })
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
  <div class="mx-3" :class="{ memorial: hasMourningWords(book.title) }">
    <div v-if="loading" class="mb-5 rounded-2xl bg-white p-5">
      <wd-skeleton
        :row-col="[{ width: '30%' }, { width: '60%' }, { width: '20%' }, [{ width: '20%' }, { width: '20%' }, { width: '20%' }, { width: '20%' }]]"
      />
    </div>

    <div v-else class="mb-5 rounded-2xl bg-white px-5 pb-5 pt-3 space-y-3">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-lg text-red font-bold">
            {{ book.title }}
          </div>
          <div class="mt-1 text-sm text-gray">
            <span>{{ book.lunarDate }}</span>
            <span class="ml-2">({{ book.date }}) </span>
          </div>
        </div>
        <div class="flex text-xl text-red">
          <div class="py-2 pl-2" @click="handleBookDel">
            <div class="i-hugeicons-delete-02" />
          </div>
          <div class="py-2 pl-2" @click="handleBookEdit">
            <div class="i-hugeicons-edit-01" />
          </div>
        </div>
      </div>
      <div class="flex items-end">
        <div class="i-mingcute-wallet-2-line p-1" />
        <div class="ml-1 text-sm font-bold">
          礼金：<span class="text-xl">{{ book.moneyTotal }}</span>
        </div>
        <div class="ml-auto p-1 text-gray" @click="() => popupShow = true">
          <div class="i-ant-design-info-circle-filled" />
        </div>
      </div>
      <div class="grid grid-cols-4 gap-5 divide-x">
        <div class="text-center">
          <div class="text-lg text-black font-bold">
            {{ book.giftCount }}
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
            <div class="i-hugeicons-bitcoin-wallet" />
            <div>合计</div>
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-2xl bg-white p-5">
      <div class="w-full flex items-center justify-between">
        <div class="space-x-3">
          <wd-sort-button v-for="(item, index) in sortList" :key="index" v-model="item.value" :title="item.label"
                          @change="handleSortChange(item)"
          />
        </div>

        <div class="i-hugeicons-plus-sign-circle mr-3 pr-2 text-xl text-red" @click="handleGiftClick()" />
      </div>

      <div v-if="loading" class="mt-5 text-center">
        <wd-loading color="#f87171" />
        <div class="mt-3 text-gray">
          正在努力加载中...
        </div>
      </div>
      <div v-else>
        <div v-if="dataList.length === 0" class="my-24">
          <uv-empty text="还没有人情往来记录哦~" mode="favor">
            <div class="mt-6">
              <wd-button class="mt-6" type="primary"
                         @click="handleGiftClick()"
              >
                添加收礼
              </wd-button>
            </div>
          </uv-empty>
        </div>
        <div v-else>
          <div v-for="gift in dataList" :key="gift.id" @click="handleGiftClick(gift.id)">
            <wd-cell center size="large" :title="gift.friendName" :label="`出席：${gift.attendance || 0}人`">
              <div class="text-lg text-red font-bold">
                <span class="text-sm">￥</span>{{ gift.money }}
              </div>
            </wd-cell>
          </div>
          <wd-loadmore :state="loadingMore ? 'loading' : noMore ? 'finished' : ''"
                       :loading-props="{ color: '#f87171' }"
          />
        </div>
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
