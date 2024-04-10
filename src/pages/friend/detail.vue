<template>
    <div class="h-full flex flex-col">
        <div class="px-5 pt-3 pb-5 space-y-3 bg-white rounded-b-2xl">
            <uv-search placeholder="请输入搜索内容" v-model="search.keyword" :showAction="search.showAction" actionText="取消"
                @focus="search.showAction = true" @custom="searchCancel" @search="searchOk">
            </uv-search>
            <div class="flex justify-between items-center">
                <div>
                    <div class="font-bold text-lg">
                        {{ dataSource.name }}
                    </div>
                    <div class="text-sm text-gray mt-1">
                        <span>{{ dataSource.relation }}</span>
                    </div>
                </div>
                <div class="flex text-xl font-bold text-red">
                    <div class="py-2 pl-2" @click="handleEditClick(dataSource)">
                        <div class="i-carbon-edit"></div>
                    </div>
                </div>
            </div>
            <div class="flex items-center">
                <div class="i-mingcute-wallet-2-line mr-1"></div>
                <div class="text-sm font-bold">礼金：</div>
                <uv-count-to customStyle="font-weight: 700;font-size: 1.25rem;line-height: 1.75rem;" :startVal="0"
                    :endVal="book.giftTotal">
                </uv-count-to>
            </div>
            <div class="grid gap-5 grid-cols-2 divide-x">
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
                        <div class="font-bold text-lg"
                            :class="[hasMourningWords(book.title) ? 'text-gray' : 'text-red']"><span
                                class="text-sm">￥</span>{{ gift.money }}</div>
                        <div class="text-gray text-sm">礼金</div>
                    </div>
                </div>
            </div>

            <uv-load-more loadingIcon="circle" :status="loadMoreStatus" v-if="loadMoreStatus == 'loading'" />
        </div>
    </div>
</template>

<script setup>
import { getGiftReceivePage } from '~/alicloud/services/giftReceive'
import { hasMourningWords } from '~/utils/index'

const dataSource = ref({
    date: {}
})
const giftList = ref([])
onLoad((option) => {
    dataSource.value = { ...router.getQueryParse(option) }
    loadData()
    uni.$on('friend_edit_page_update', () => {
        loadData()
    })
})
onUnload(() => {
    uni.$off('friend_edit_page_update')
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

const handleEditClick = (e) => {
    const { _id, name, relation, remarks } = e
    router.push({
        path: '/pages/friend/edit',
        query: { _id, name, relation, remarks }
    })
}
</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "layout": "blank",
    "style": {
        "navigationBarTitleText": "详情"
    }
}</route>