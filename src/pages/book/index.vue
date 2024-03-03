<template>
    <div>
        <uni-nav-bar :statusBar="true" :border="false" backgroundColor="#f1f1f1" fixed :leftWidth="100">
            <template v-slot:left>
                <div flex items-center ms-4>
                    <img h-6 w-6 :src="logo" />
                    <div text-lg font-bold ms-2>礼簿</div>
                </div>
            </template>
        </uni-nav-bar>

        <div grid grid-cols-2 gap-5 mx-5 pt-6>
            <div v-for="i in books" :key="i._id" h-48 w-full rounded-l-xl rounded-r-3xl bg-white>
                <div flex flex-col justify-center h-full>
                    <div mx-4 my-auto>
                        <div text-lg text-red font-bold>{{ i.title }}</div>
                        <div text-sm text-gray>共 <span font-bold>{{ i.giftCount }}</span> 笔</div>
                    </div>
                    <div h-7 w-18 bg-red self-end rounded-l-3xl flex items-center>
                        <div rounded-full w-3 h-3 bg-red-300 ms-2></div>
                    </div>
                    <div mx-4 my-auto>
                        <div text-lg font-bold> ￥{{ i.giftTotal }}</div>
                        <div text-sm text-gray>{{ i.date.value }}</div>
                        <div text-xs text-gray>{{ i.date.lunar_month }}{{ i.date.lunar_day }}</div>
                    </div>
                </div>

            </div>
            <div h-48 w-full rounded-l-xl rounded-r-3xl bg-white flex flex-col items-center justify-center
                @click="router.push('/pages/book/edit')">
                <div i-carbon-add-alt text-3xl text-red font-bold></div>
                <div mt-3>添加礼簿</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onLoad, onShow } from '@dcloudio/uni-app'
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

const pagination = ref({
    pageNo: 1,
    pageSize: 20,
    loading: false
})

const loadData = () => {
    const { pageSize, pageNo } = pagination.value
    getBookPage({
        pageSize,
        pageNo
    }).then(res => {
        if (res.success) {
            const newGiftBooks = statistics(res.result);
            books.value = pageNo === 1 ? newGiftBooks : [...books.value, ...newGiftBooks];
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