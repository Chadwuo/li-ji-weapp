<template>
  <div class="bg-white">
    <div class="p-3 space-y-4">
      <uv-search placeholder="请输入搜索内容" v-model="search.keyword" :showAction="search.showAction" actionText="取消"
        @focus="search.showAction = true" @custom="searchCancel" @search="searchOk"></uv-search>
      <div class="flex justify-between items-center">
        <div>
          <div class="text-red font-bold text-lg">{{ book.title }}</div>
          <div class="text-sm text-gray space-x-3">
            <span>{{ book.date.value }}</span>
            <span>{{ book.date.lunar_month }} {{ book.date.lunar_day }} {{ book.date.lunar_year }}</span>
          </div>
        </div>
        <div><uv-button text="编辑" shape="circle" color="#E8E8E8" customStyle="color:#8799a3" size="mini"></uv-button>
        </div>
      </div>
      <div>
        <span>合计：</span>
        <span class="text-xl font-bold"><span class="text-sm">￥</span>1000</span>
      </div>
      <div class="grid gap-5 grid-cols-4 divide-x">
        <div class="text-sm text-gray text-center">
          <div>
            <span class="text-lg font-bold text-black">{{ book.giftCount }}</span>
            <span> 位</span>
          </div>
          <div>亲友</div>
        </div>
        <div class="text-sm text-gray text-center">
          <div>
            <span class="text-lg font-bold text-black">10</span>
            <span> 位</span>
          </div>
          <div>出席</div>
        </div>
        <div class="text-gray text-sm text-center">
          <div>
            <span class="text-lg font-bold text-black">{{ book.giftTotal }}</span>
            <span> 元</span>
          </div>
          <div>礼金</div>
        </div>
        <div class="text-gray text-sm text-center">
          <div>
            <span class="text-lg font-bold text-black">1000</span>
            <span class="text-gray"> 元</span>
          </div>
          <div>支出</div>
        </div>
      </div>
    </div>
    <div>
      <uv-collapse :border="false">
        <uv-collapse-item title="指标说明">
          <div>
            <div class="text-lg border-l-2 border-red">亲友</div>
          </div>
        </uv-collapse-item>
      </uv-collapse>
    </div>
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

</script>

<style lang="scss" scoped></style>

<route lang="json">{
  "style": {
    "navigationBarTitleText": "详情"
  }
}</route>