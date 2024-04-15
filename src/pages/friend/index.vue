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
        <div class="bg-white px-5 pb-3">
            <uv-search placeholder="请输入搜索内容" v-model="search.keyword" :showAction="search.showAction" actionText="取消"
                @focus="search.showAction = true" @custom="searchCancel" @search="searchOk">
            </uv-search>
        </div>
        <div>
            <uv-index-list custom-nav-height="90" :index-list="friendsList.map(i => i.letter)" activeColor="#f87171">
                <template v-for="(value, key) of friendsList" :key="key">
                    <uv-index-item>
                        <uv-index-anchor :text="value.letter"></uv-index-anchor>
                        <view v-for="(cell, index) in value.items">
                            <uv-cell :title="cell.name" size="large" @click="onFriendClick(cell)"></uv-cell>
                        </view>
                    </uv-index-item>
                </template>
            </uv-index-list>
        </div>
    </div>
</template>

<script setup>
import { list } from '~/alicloud/services/friend'

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
const loadData = () => {
    list({ keyword: search.value.keyword }).then(res => {
        // 根据首字母firstLetter进行分组
        const map = new Map()
        res.result.forEach(item => {
            const key = item.firstLetter.toUpperCase()
            if (!map.has(key)) {
                map.set(key, [])
            }
            map.get(key).push(item);
        })

        const keys = Array.from(map.keys()).sort();
        friendsList.value = keys.map(key => ({
            letter: key,
            items: map.get(key)
        }));
    })
}
onLoad(() => {
    loadData()
})
const onFriendClick = (e) => {
    const { _id, name, relation, remarks } = e
    router.push({
        path: '/pages/friend/detail',
        query: { _id, name, relation, remarks }
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