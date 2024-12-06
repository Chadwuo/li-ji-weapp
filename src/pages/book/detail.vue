<script setup>
import { page } from '~/alicloud/services/giftReceive'
import { hasMourningWords } from '~/utils/index'

const book = ref({
    date: {},
})
const giftList = ref([])
const pagination = ref({
    pageNo: 1,
    pageSize: 20,
    loading: false,
})
const search = ref({
    keyword: '',
    showAction: false,
})
const loadMoreStatus = ref('loadmore')
const popup = ref(null)

onLoad((option) => {
    book.value = { ...router.getQueryParse(option) }
    loadData()
})

onReachBottom(() => {
    if (loadMoreStatus.value === 'loading' || loadMoreStatus.value === 'nomore')
        return

    loadMoreStatus.value = 'loading'
    pagination.value.pageNo++
    loadData()
})

function loadData() {
    const { pageSize, pageNo } = pagination.value
    page({
        bookId: book.value._id,
        keyword: search.value.keyword,
        pageSize,
        pageNo,
    }).then((res) => {
        if (res.success) {
            giftList.value = pageNo === 1 ? res.result : [...giftList.value, ...res.result]
            loadMoreStatus.value = res.result.length < pageSize ? 'nomore' : 'loadmore'
        }
    })
}

function searchOk() {
    loadData()
}
function searchCancel() {
    search.value = {
        keyword: '',
        showAction: false,
    }
    loadData()
}

function handleInfoClick() {
    popup.value.open()
}

function handleGiftClick(e) {
    const { _id, money, attendance, remarks, friendInfo } = e
    router.push({
        path: '/pages/giftIn/edit',
        query: { _id, money, attendance, remarks, friendInfo },
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
                        {{
                            book.title }}
                    </div>
                    <div class="mt-1 text-sm text-gray">
                        <span>{{ book.date.lunar_month }} {{ book.date.lunar_day }} {{ book.date.lunar_year }}</span>
                        <span class="ml-2">({{ book.date.value }}) </span>
                    </div>
                </div>
                <div class="flex text-xl font-bold" :class="[hasMourningWords(book.title) ? 'text-gray' : 'text-red']">
                    <div class="py-2 pl-2" @click="router.push(`/pages/book/edit?id=${book._id}`)">
                        <div class="i-carbon-edit" />
                    </div>
                    <div class="py-2 pl-2" @click="router.push(`/pages/giftIn/edit?bookId=${book._id}`)">
                        <div class="i-carbon-add-alt" />
                    </div>
                </div>
            </div>
            <div class="flex items-end">
                <div class="i-mingcute-wallet-2-line p-1" />
                <div class="text-sm font-bold">
                    礼金：<span class="text-xl">{{ book.giftTotal }}</span>
                </div>
                <div class="ml-auto py-2 pl-2 text-gray" @click="handleInfoClick">
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
                        {{ book.giftTotal - book.cost }}
                    </div>
                    <div class="flex items-center justify-center text-xs text-gray space-x-1">
                        <div class="i-carbon-wallet" />
                        <div>合计</div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="giftList.length === 0" class="my-auto">
            <uv-empty />
        </div>
        <div class="my-5 rounded-2xl bg-white space-y-3">
            <div v-for="gift in giftList" :key="gift._id" @click="handleGiftClick(gift)">
                <div class="h-18 flex items-center justify-around">
                    <div>
                        <div class="text-lg">
                            {{ gift.friendInfo.name }}
                        </div>
                        <div class="text-sm text-gray">
                            出席：{{ gift.attendance || 0 }} 人
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-bold"
                            :class="[hasMourningWords(book.title) ? 'text-gray' : 'text-red']">
                            <span class="text-sm">￥</span>{{ gift.money }}
                        </div>
                        <div class="text-sm text-gray">
                            礼金
                        </div>
                    </div>
                </div>
            </div>

            <uv-load-more v-if="loadMoreStatus === 'loading'" loading-icon="circle" :status="loadMoreStatus" />
        </div>

        <uv-popup ref="popup" mode="bottom" round="10" closeable>
            <div class="px-5 pt-4">
                <div class="text-center font-bold">
                    名词解释
                </div>
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

<style lang="scss" scoped></style>

<route lang="json">{
    "layout": "blank",
    "style": {
        "navigationBarTitleText": "详情"
    }
}</route>
