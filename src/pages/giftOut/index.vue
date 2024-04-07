<template>
    <div class="h-full flex flex-col">
        <uv-navbar placeholder>
            <template v-slot:left>
                <div class="flex items-center">
                    <div class="text-lg font-bold ms-2">送礼</div>
                    <div class="p-2" @click="router.push(`/pages/giftOut/edit`)">
                        <div class="i-carbon-add-alt text-red"></div>
                    </div>
                </div>
            </template>
        </uv-navbar>
        <div class="bg-white px-5 pb-5 rounded-b-2xl">
            <uv-search placeholder="请输入搜索内容" v-model="search.keyword" :showAction="search.showAction" actionText="取消"
                @focus="search.showAction = true" @custom="searchCancel" @search="searchOk">
            </uv-search>
            <div class="grid gap-5 grid-cols-2 divide-x mt-5">
                <div class="text-gray text-sm text-center">
                    <div class="text-lg font-bold text-black">
                        10
                    </div>
                    <div class="text-xs text-gray flex justify-center items-center space-x-1">
                        <div class="i-carbon:sprout"></div>
                        <div>次数</div>
                    </div>
                </div>
                <div class="text-gray text-sm text-center">
                    <div class="text-lg font-bold text-black">
                        11000
                    </div>
                    <div class="text-xs text-gray flex justify-center items-center space-x-1">
                        <div class="i-carbon-wallet"></div>
                        <div>总计</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-auto" v-if="giftList.length == 0">
            <uv-empty></uv-empty>
        </div>
        <div class="space-y-3 mt-5">
            <div v-for="i in giftList" :key="i._id">
                <div class="bg-white rounded-2xl p-4 flex items-center">
                    <div class="rounded-full w-12 h-12 flex"
                        :class="[i.icon == 'i-tabler-candle' ? 'bg-gray-100 text-gray' : 'bg-red-50 text-red']">
                        <div class="m-auto w-8 h-8" :class="i.icon"></div>
                    </div>
                    <div class="grow mx-4">
                        <div class="text-lg font-bold">{{ i.friendInfo.name }}</div>
                        <div>{{ i.title }}<span v-if="i.remarks">（{{ i.remarks }}）</span></div>
                        <div class="text-sm">{{ i.date.lunar_month }} {{ i.date.lunar_day }} {{ i.date.lunar_year }}
                        </div>
                    </div>
                    <div class="font-bold" :class="[i.icon == 'i-tabler-candle' ? 'text-gray' : 'text-red']">
                        <span class="text-sm">￥</span>{{ i.money }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { getGiftOutPage } from '~/alicloud/services/giftOut'

const giftList = ref([])
onLoad(() => {
    loadData()
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
    getGiftOutPage({
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

</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "layout": "blank",
    "style": {
        "navigationStyle": "custom"
    }
}</route>