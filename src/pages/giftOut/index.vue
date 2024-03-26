<template>
    <div>
        <uv-navbar placeholder bgColor="#f1f1f1">
            <template v-slot:left>
                <div class="flex items-center ms-4">
                    <div class="text-lg font-bold ms-2">送礼</div>
                </div>
            </template>
        </uv-navbar>
        <uv-search placeholder="请输入搜索内容" v-model="search.keyword" :showAction="search.showAction" actionText="取消"
            @focus="search.showAction = true" @custom="searchCancel" @search="searchOk">
        </uv-search>
        <div class="space-y-3">
            <div v-for="i in giftList" :key="i._id">
                <div class="bg-white rounded-2xl p-4 flex items-center">
                    <div class="rounded-full bg-red-50 w-12 h-12 flex">
                        <div class="m-auto w-8 h-8 text-red" :class="i.icon == '1' ? '' : 'i-mdi:account-school-outline'">
                        </div>
                    </div>
                    <div class="grow mx-4">
                        <div class="text-lg font-bold">{{ i.friendInfo.name }}</div>
                        <div>{{ i.title }}<span v-if="i.remarks">（{{ i.remarks }}）</span></div>
                        <div class="text-sm">{{ i.date.lunar_month }} {{ i.date.lunar_day }} {{ i.date.lunar_year }}
                        </div>
                    </div>
                    <div class="text-red font-bold"><span class="text-sm">￥</span>{{ i.money }}</div>
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
    "style": {
        "navigationStyle": "custom"
    }
}</route>