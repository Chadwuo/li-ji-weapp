<template>
    <div>
        <uni-nav-bar :statusBar="true" :border="false" backgroundColor="#f1f1f1" fixed :leftWidth="100">
            <template v-slot:left>
                <div flex items-center ms-4>
                    <image h-8 w-8 :src="logo" />
                    <div text-lg font-bold ms-2>礼记</div>
                </div>
            </template>
        </uni-nav-bar>

        <div grid grid-cols-2 gap-5 mx-5 pt-6>
            <div v-for="(i, key) in 10" h-48 w-full rounded-l-xl rounded-r-3xl bg-white>
                <div flex flex-col justify-center h-full>
                    <div mx-4 my-auto>
                        <div text-lg text-red font-bold>你好</div>
                        <div text-sm text-gray>共 <span font-bold>{{ i }}</span> 笔</div>
                    </div>
                    <div h-7 w-18 bg-red self-end rounded-l-3xl flex items-center>
                        <div rounded-full w-3 h-3 bg-red-300 ms-2></div>
                    </div>
                    <div mx-4 my-auto>
                        <div text-lg font-bold> ￥1000</div>
                        <div text-sm text-gray>20240202</div>
                        <div text-xs text-gray>正月初二</div>
                    </div>
                </div>

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
    pageNo: 0,
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
            books.value = res.result
        }
    })
}

</script>

<style lang="scss" scoped></style>

<route lang="json">
{
    "style": {
        "navigationStyle": "custom"
    }
}
</route>