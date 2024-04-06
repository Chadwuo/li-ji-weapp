<template>
    <div>
        <uv-navbar placeholder>
            <template v-slot:left>
                <div class="flex items-center">
                    <div class="text-lg font-bold ms-2">亲友</div>
                    <div class="p-2" @click="router.push(`/pages/friend/edit`)">
                        <div class="i-carbon-add-alt text-red"></div>
                    </div>
                </div>
            </template>
        </uv-navbar>
        <div class="bg-white px-5 pb-5 rounded-b-2xl">
            <uv-search placeholder="请输入搜索内容" v-model="search.keyword" :showAction="search.showAction" actionText="取消"
                @focus="search.showAction = true" @custom="searchCancel" @search="searchOk">
            </uv-search>
        </div>
        <div>

        </div>
    </div>
</template>

<script setup>
import { getFriendList } from '~/alicloud/services/friend'

const friendsList = ref([])
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
const pagination = ref({
    pageNo: 1,
    pageSize: 20,
    loading: false,
})
const loadData = () => {
    const { pageSize, pageNo } = pagination.value
    
}
onLoad(() => {
    loadData()
})
</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "layout": "blank",
    "style": {
        "navigationStyle": "custom"
    }
}</route>