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
        <div class="bg-white px-5 pb-3 rounded-b-2xl">
            <uv-tabs :list="tabsList" @click="onTabsClick" lineColor="#f87171"></uv-tabs>
            <div class="mt-3">
                <uv-search placeholder="请输入搜索内容" v-model="search.keyword" :showAction="search.showAction"
                    actionText="取消" @focus="search.showAction = true" @custom="searchCancel" @search="searchOk">
                </uv-search>
            </div>
        </div>

        <div class="my-auto" v-if="giftList.length == 0">
            <uv-empty></uv-empty>
        </div>
        <div class="space-y-3 mt-5 bg-white">
            <div v-for="i in giftList" :key="i._id" @click="handleGiftClick(i)">
                <div class="p-4 flex items-center">
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
                        <span class="text-sm">￥</span>{{ i.money }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { page } from '~/alicloud/services/giftOut'

const tabsList = ref([{
    name: "全部",
    value: "",
}, {
    name: "结婚",
    value: "i-bi-postcard-heart",
},
{
    name: "宝宝",
    value: "i-mingcute-baby-line",
},
{
    name: "周岁",
    value: "i-icon-park-outline-baby-feet",
},
{
    name: "乔迁",
    value: "i-tabler-home-move",
},
{
    name: "生日",
    value: "i-mingcute-cake-line",
},
{
    name: "升学",
    value: "i-carbon-education",
},
{
    name: "压岁",
    value: "i-icon-park-outline-red-envelope",
},
{
    name: "探望",
    value: "i-healthicons-fruits-outline",
},
{
    name: "白事",
    value: "i-tabler-candle",
},
{
    name: "其他",
    value: "i-mingcute-wallet-2-line",
},
])
const onTabsClick = (item) => {
    search.value.icon = item.value
    loadData()
}
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
    page({
        ...search.value,
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
    icon: '',
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
const handleGiftClick = (e) => {
    const { _id, title, money, icon, remarks, date, friendInfo } = e
    router.push({
        path: '/pages/giftOut/edit',
        query: { _id, title, money, icon, remarks, date, friendName: friendInfo.name }
    })
}
</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "layout": "blank",
    "style": {
        "navigationStyle": "custom"
    }
}</route>