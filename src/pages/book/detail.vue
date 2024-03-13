<template>
  <div>
    <div class="px-5 pt-3 pb-5 space-y-3 bg-white rounded-b-2xl">
      <uv-search placeholder="请输入搜索内容" v-model="search.keyword" :showAction="search.showAction" actionText="取消"
        @focus="search.showAction = true" @custom="searchCancel" @search="searchOk"></uv-search>
      <div class="flex justify-between items-center">
        <div>
          <div class="text-red font-bold text-lg">{{ book.title }}</div>
          <div class="text-sm text-gray mt-1">
            <span>{{ book.date.lunar_month }} {{ book.date.lunar_day }} {{ book.date.lunar_year }}</span>
            <span class="ml-2">({{ book.date.value }}) </span>
          </div>
        </div>
        <div><uv-button text="编辑" shape="circle" color="#E8E8E8" customStyle="color:#8799a3" size="mini"></uv-button>
        </div>
      </div>
      <div class="flex items-center">
        <div class="i-mingcute:wallet-2-line mr-1"></div>
        <div class="text-sm font-bold">礼金：</div>
        <uv-count-to customStyle="font-weight: 700;font-size: 1.25rem;line-height: 1.75rem;" :startVal="0"
          :endVal="book.giftTotal">
        </uv-count-to>
        <div class="i-carbon:information-filled ml-auto text-gray" @click="handleInfoClick"></div>
      </div>
      <div class="grid gap-5 grid-cols-4 divide-x">
        <div class="text-center">
          <div class="text-lg font-bold text-black">
            {{ book.giftCount }}
          </div>
          <div class="text-xs text-gray flex justify-center items-center space-x-1">
            <div class="i-carbon:home"></div>
            <div>亲友</div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-lg font-bold text-black">
            {{ book.attendanceTotal }}
          </div>
          <div class="text-xs text-gray flex justify-center items-center space-x-1">
            <div class="i-carbon:pedestrian-family"></div>
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
            <div class="i-carbon:wallet"></div>
            <div>合计</div>
          </div>
        </div>
      </div>
    </div>


    <div class="my-5">

      <uv-empty></uv-empty>
    </div>

    <uv-popup ref="popup" mode="bottom" round="10" closeable>
      <div class="px-5 pt-4">
        <div class="text-center font-bold">指标说明</div>
        <div class="mt-5 text-sm space-y-1">
          <div class="">礼金：是全部礼金收入</div>
          <div class="">亲友：是人情份数，提前准备好伴手礼哦</div>
          <div class="">出席：提前和亲友沟通参加当天宴席的人数，定好酒席，静待亲友</div>
          <div class="">支出：在礼簿编辑页面可以添加伴手礼、酒席等本次宴席的成本</div>
          <div class="">合计：很简单，全部礼金收入 - 成本支出</div>
        </div>
      </div>
    </uv-popup>
  </div>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
const search = ref({
  keyword: '',
  showAction: false
})

const book = ref({})

onLoad((option) => {
  book.value = { ...router.getQueryParse(option) }
})

const searchOk = (keyword) => {
  console.log('search', keyword)
  uni.showToast({
    title: keyword,
    duration: 2000
  });
}

const searchCancel = (keyword) => {
  search.value = {
    keyword: '',
    showAction: false
  }
}

const popup = ref(null)
const handleInfoClick = () => {
  popup.value.open()
}

</script>

<style lang="scss" scoped></style>

<route lang="json">{
  "style": {
    "navigationBarTitleText": "详情"
  }
}</route>