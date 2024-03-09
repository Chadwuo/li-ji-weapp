<template>
    <div>
        <uv-navbar placeholder bgColor="#f1f1f1">
            <template v-slot:left>
                <div class="flex items-center ms-4">
                    <img class="h-6 w-6" :src="logo" />
                    <div class="text-lg font-bold ms-2">礼簿</div>
                </div>
            </template>
        </uv-navbar>

        <div class="grid grid-cols-2 gap-5 mx-5 pt-6">
            <div v-for="i in books" :key="i._id" class="h-48 w-full rounded-l-xl rounded-r-3xl bg-white">
                <div class="flex flex-col justify-around h-full">
                    <div class="mx-4">
                        <div class="text-lg text-red font-bold">{{ i.title }}</div>
                        <div class="text-sm text-gray">共 <span font-bold>{{ i.giftCount }}</span> 笔</div>
                    </div>
                    <div class="mx-4">
                        <div class="text-lg font-bold"> ￥{{ i.giftTotal }}</div>
                        <div class="text-sm text-gray">{{ i.date.value }}</div>
                        <div class="text-xs text-gray">{{ i.date.lunar_month }}{{ i.date.lunar_day }}</div>
                    </div>
                </div>
                <div class="relative">
                    <div class="h-7 w-18 bg-red rounded-l-3xl flex items-center absolute right-0 bottom-22">
                        <div class="rounded-full w-3 h-3 bg-red-300 ms-2"></div>
                    </div>
                </div>
            </div>
            <div class="h-48 w-full rounded-l-xl rounded-r-3xl bg-white flex flex-col items-center justify-center"
                @click="router.push('/pages/book/edit')">
                <div class="i-carbon-add-alt text-3xl text-red font-bold"></div>
                <div class="mt-3">添加礼簿</div>
            </div>
        </div>
        <uv-load-more loadingIcon="circle" :status="loadMoreStatus" v-if="loadMoreStatus == 'loading'" />
    </div>
</template>

<script setup>
import { onLoad, onShow, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'
import logo from '~/static/logo.png'
import { getBookPage } from '~/alicloud/services/book'

const books = ref([])

onLoad(async () => {
    loadData()
})

onShow(() => {
    console.log('book index page show')
})

const loadMoreStatus = ref('loadmore')

onReachBottom(() => {
    console.log('触底加载更多')
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
    getBookPage({
        pageSize,
        pageNo
    }).then(res => {
        if (res.success) {
            console.log('object :>> ', res);
            if (res.result.length == 0) {
                loadMoreStatus.value = 'nomore'
            } else {
                const newGiftBooks = statistics(res.result)
                books.value = pageNo === 1 ? newGiftBooks : [...books.value, ...newGiftBooks]
                loadMoreStatus.value = 'loadmore'
            }
        }
    })
}

// 计算礼簿收礼金额
const statistics = (datas) => {
    return datas.map((i) => {
        i.giftCount = i.giftList.length || 0;
        i.giftTotal = i.giftList.reduce(
            (total, item) => total + Number(item.money),
            0
        );
        return i;
    });
}

</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "style": {
        "navigationStyle": "custom"
    }
}</route>