<script setup lang="ts">
import { useLoadMore } from 'vue-request'

const book = ref<Api.GiftBook>({})
const search = ref({
  keyword: '',
  showAction: false,
})
const popupShow = ref(false)
const { dataList, loading, loadMore, refresh } = useLoadMore<Api.LoadMoreDataType<Api.GiftIn>>(
  async (d) => {
    const _page = d?.page ? d.page + 1 : 1
    const response = await apiGiftInPageGet({
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
    manual: true,
  },
)
const netAmount = computed(() => {
  if (book.value.moneyTotal !== undefined && book.value.cost !== undefined) {
    return book.value.moneyTotal - book.value.cost;
  }
  return 0;
});

onLoad(async (option) => {
  if (option?.id) {
    await apiGiftBookGet({ id: option.id }).then((res) => {
      if (res.succeeded && res.data)
        book.value = res.data
    })
    loadMore()
  }
})

onReachBottom(() => {
  loadMore()
})

function searchOk() {
  refresh()
}
function searchCancel() {
  search.value = {
    keyword: '',
    showAction: false,
  }
  refresh()
}

const handleGiftClick = (gid?: number) => {
  wx.navigateTo({
    url: `/pages/giftIn/edit?id=${gid}`,
  })
}
const handleGiftAdd = () => {
  wx.navigateTo({
    url: `/pages/giftIn/edit?bookId=${book.value.id}`,
  })
}

const handleBookEdit = () => {
  wx.navigateTo({
    url: `/pages/book/edit?id=${book.value.id}`,
  })
}

</script>

<template>
  <div class="h-full flex flex-col">
    <div class="rounded-b-2xl bg-white px-5 pb-5 pt-3 space-y-3">
      <uv-search v-model="search.keyword" placeholder="请输入搜索内容" :show-action="search.showAction" action-text="取消"
        @focus="search.showAction = true" @custom="searchCancel" @search="searchOk" />
      <div class="flex items-center justify-between">
        <div>
          <div class="text-lg font-bold" :class="[hasMourningWords(book.title) ? 'text-gray' : 'text-red']">
            {{ book.title }}
          </div>
          <div class="mt-1 text-sm text-gray">
            <span>{{ book.lunarDate }}</span>
            <span class="ml-2">({{ book.date }}) </span>
          </div>
        </div>
        <div class="flex text-xl font-bold" :class="[hasMourningWords(book.title) ? 'text-gray' : 'text-red']">
          <div class="py-2 pl-2" @click="handleBookEdit">
            <div class="i-carbon-edit" />
          </div>
          <div class="py-2 pl-2" @click="handleGiftAdd">
            <div class="i-carbon-add-alt" />
          </div>
        </div>
      </div>
      <div class="flex items-end">
        <div class="i-mingcute-wallet-2-line p-1" />
        <div class="text-sm font-bold">
          礼金：<span class="text-xl">{{ book.moneyTotal }}</span>
        </div>
        <div class="ml-auto py-2 pl-2 text-gray" @click="popupShow = true">
          <div class="i-carbon-information-filled" />
        </div>
      </div>
      <div class="grid grid-cols-4 gap-5 divide-x">
        <div class="text-center">
          <div class="text-lg text-black font-bold">
            {{ book.giftCount }}
          </div>
          <div class="flex items-center justify-center text-xs text-gray space-x-1">
            <div class="i-carbon-home" />
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
            <div class="i-carbon-wallet" />
            <div>合计</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="dataList.length === 0" class="my-auto">
      <uv-empty />
    </div>
    <div class="my-5 rounded-2xl bg-white space-y-3">
      <div v-for="gift in dataList" :key="gift.id" @click="handleGiftClick(gift.id)">
        <div class="h-18 flex items-center justify-around">
          <div>
            <div class="text-lg">
              {{ gift.friend?.name }}
            </div>
            <div class="text-sm text-gray">
              出席：{{ gift.attendance || 0 }} 人
            </div>
          </div>
          <div class="text-right">
            <div class="text-lg font-bold" :class="[hasMourningWords(book.title) ? 'text-gray' : 'text-red']">
              <span class="text-sm">￥</span>{{ gift.money }}
            </div>
            <div class="text-sm text-gray">
              礼金
            </div>
          </div>
        </div>
      </div>

      <wd-loadmore :state="loading ? 'loading' : ''" />
    </div>

    <wd-popup v-model="popupShow" position="bottom">
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
            <span>表示人情往来次数，需预先备好伴手礼以表心意</span>
          </div>
          <div>
            <span class="font-bold">出席：</span>
            <span>需与亲友提前协商确定当日宴席的实际到场人数，并据此预定酒席，恭候亲朋光临</span>
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

<route lang="json">{
  "layout": "blank",
  "style": {
    "navigationBarTitleText": "详情"
  }
}</route>
