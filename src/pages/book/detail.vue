<template>
  <div class="h-full flex flex-col">
    <div class="px-5 pt-3 pb-5 space-y-3 bg-white rounded-b-2xl">
      <uv-search placeholder="请输入搜索内容" v-model="search.keyword" :showAction="search.showAction" actionText="取消"
        @focus="search.showAction = true" @custom="searchCancel" @search="searchOk">
      </uv-search>
      <div class="flex justify-between items-center">
        <div>
          <div class="font-bold text-lg" :class="[hasMourningWords(book.title) ? 'text-gray' : 'text-red']">{{
        book.title }}</div>
          <div class="text-sm text-gray mt-1">
            <span>{{ book.date.lunar_month }} {{ book.date.lunar_day }} {{ book.date.lunar_year }}</span>
            <span class="ml-2">({{ book.date.value }}) </span>
          </div>
        </div>
        <div class="flex text-xl font-bold" :class="[hasMourningWords(book.title) ? 'text-gray' : 'text-red']">
          <!-- <uv-button text="编辑" shape="circle" color="#E8E8E8" customStyle="color:#8799a3" size="mini"
            @click="router.push(`/pages/book/edit?id=${book._id}`)">
          </uv-button> -->
          <div class="py-2 pl-2" @click="router.push(`/pages/book/edit?id=${book._id}`)">
            <div class="i-carbon-edit"></div>
          </div>
          <div class="py-2 pl-2" @click="router.push(`/pages/giftIn/edit?bookId=${book._id}`)">
            <div class="i-carbon-add-alt"></div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="i-mingcute-wallet-2-line mr-1"></div>
        <div class="text-sm font-bold">礼金：</div>
        <uv-count-to customStyle="font-weight: 700;font-size: 1.25rem;line-height: 1.75rem;" :startVal="0"
          :endVal="book.giftTotal">
        </uv-count-to>
        <div class="ml-auto text-gray py-2 pl-2" @click="handleInfoClick">
          <div class="i-carbon-information-filled "></div>
        </div>
      </div>
      <div class="grid gap-5 grid-cols-4 divide-x">
        <div class="text-center">
          <div class="text-lg font-bold text-black">
            {{ book.giftCount }}
          </div>
          <div class="text-xs text-gray flex justify-center items-center space-x-1">
            <div class="i-carbon-home"></div>
            <div>亲友</div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-lg font-bold text-black">
            {{ book.attendanceTotal }}
          </div>
          <div class="text-xs text-gray flex justify-center items-center space-x-1">
            <div class="i-carbon-pedestrian-family"></div>
            <div>出席</div>
          </div>
        </div>
        <div class="text-gray text-sm text-center">
          <div class="text-lg font-bold text-black">
            {{ book.cost }}
          </div>
          <div class="text-xs text-gray flex justify-center items-center space-x-1">
            <div class="i-carbon:sprout"></div>
            <div>支出</div>
          </div>
        </div>
        <div class="text-gray text-sm text-center">
          <div class="text-lg font-bold text-black">
            {{ book.giftTotal - book.cost }}
          </div>
          <div class="text-xs text-gray flex justify-center items-center space-x-1">
            <div class="i-carbon-wallet"></div>
            <div>合计</div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-auto" v-if="giftList.length == 0">
      <uv-empty></uv-empty>
    </div>
    <div class="my-5 space-y-3 bg-white rounded-2xl">
      <div v-for="gift in giftList" :key="gift._id" @click="handleGiftClick(gift)">
        <div class="flex justify-around items-center h-18">
          <div>
            <div class="text-lg">{{ gift.friendInfo.name }}</div>
            <div class="text-gray text-sm">出席：{{ gift.attendance }} 人</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-lg" :class="[hasMourningWords(book.title) ? 'text-gray' : 'text-red']"><span
                class="text-sm">￥</span>{{ gift.money }}</div>
            <div class="text-gray text-sm">礼金</div>
          </div>
        </div>
      </div>

      <uv-load-more loadingIcon="circle" :status="loadMoreStatus" v-if="loadMoreStatus == 'loading'" />
    </div>

    <uv-popup ref="popup" mode="bottom" round="10" closeable>
      <div class="px-5 pt-4">
        <div class="text-center font-bold">名词解释</div>
        <div class="mt-5 text-sm space-y-1">
          <div><span class="font-bold">礼金：</span> <span>指所有礼金收入的总和</span></div>
          <div><span class="font-bold">亲友：</span> <span>表示人情往来次数，需预先备好伴手礼以表心意</span></div>
          <div><span class="font-bold">出席：</span> <span>需与亲友提前协商确定当日宴席的实际到场人数，并据此预定酒席，恭候亲朋光临</span></div>
          <div><span class="font-bold">支出：</span> <span>在礼簿编辑阶段，可记录下诸如伴手礼、酒席等本次宴席相关成本费用</span></div>
          <div><span class="font-bold">合计：</span> <span>即全部礼金收入减去宴席相关成本后的净额</span></div>
        </div>
      </div>
    </uv-popup>
  </div>
</template>

<script setup>
import { getGiftReceivePage } from '~/alicloud/services/giftReceive'
import { hasMourningWords } from '~/utils/index'

const book = ref({
  date: {}
})
const giftList = ref([])
onLoad((option) => {
  book.value = { ...router.getQueryParse(option) }
  loadData()
  uni.$on('gift_in_edit_page_update', () => {
    loadData()
  })
})
onUnload(() => {
  uni.$off('gift_in_edit_page_update')
  console.log('book detail page unload');
})
const loadMoreStatus = ref('loadmore')
onReachBottom(() => {
  if (loadMoreStatus.value === 'loading' || loadMoreStatus.value === 'nomore') {
    return
  }
  loadMoreStatus.value = 'loading'
  pagination.value.pageNo++
  loadData()
})
const pagination = ref({
  pageNo: 1,
  pageSize: 20,
  loading: false,
})
const loadData = () => {
  const { pageSize, pageNo } = pagination.value
  getGiftReceivePage({
    bookId: book.value._id,
    keyword: search.value.keyword,
    pageSize,
    pageNo
  }).then(res => {
    if (res.success) {
      giftList.value = pageNo === 1 ? res.result : [...giftList.value, ...res.result]
      loadMoreStatus.value = res.result.length < pageSize ? 'nomore' : 'loadmore'
    }
  })
}

const search = ref({
  keyword: '',
  showAction: false
})
const searchOk = () => {
  loadData()
}
const searchCancel = () => {
  search.value = {
    keyword: '',
    showAction: false
  }
  loadData()
}

const popup = ref(null)
const handleInfoClick = () => {
  popup.value.open()
}

const handleGiftClick = (e) => {
  const { _id, money, attendance, remarks, friendInfo, bookId } = e
  router.push({
    path: '/pages/giftIn/edit',
    query: { _id, money, attendance, remarks, friendName: friendInfo.name }
  })
}
</script>

<style lang="scss" scoped>
</style>

<route lang="json">{
  "layout": "blank",
  "style": {
    "navigationBarTitleText": "详情"
  }
}</route>