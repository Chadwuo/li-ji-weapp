<script setup lang="ts">
const friendsList = ref<Array<{ letter: string; items: Array<Api.Friend> }>>()
let instance: any = null
const search = ref({
    keyword: '',
    showAction: false,
})
onLoad(() => {
    loadData()
})
const loadData = () => {
    apiFriendListGet({}).then((res) => {
        if (res.succeeded) {
            // 根据首字母firstLetter进行分组
            const map = new Map()
            res.data?.forEach((item) => {
                const key = item.firstLetter?.toUpperCase()
                if (!map.has(key))
                    map.set(key, [])

                map.get(key).push(item)
            })

            const keys = Array.from(map.keys()).sort()
            friendsList.value = keys.map(key => ({
                letter: key,
                items: map.get(key),
            }))
        }
    })
}

onMounted(() => {
    instance = getCurrentInstance()?.proxy
})

function onFriendClick(e: Api.Friend) {
    const eventChannel = instance.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', e)
    uni.navigateBack()
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
</script>

<template>
    <div>
        <div class="bg-white px-5 pb-3">
            <wd-search v-model="search.keyword" :hide-cancel="!search.showAction" placeholder="请输入搜索内容" placeholder-left
                @search="searchOk" @cancel="searchCancel" @focus="search.showAction = true" />
        </div>
        <div>
            <uv-index-list custom-nav-height="90" :index-list="friendsList?.map(i => i.letter)" active-color="#f87171">
                <template v-for="(value, key) of friendsList" :key="key">
                    <uv-index-item>
                        <uv-index-anchor :text="value.letter" />
                        <view v-for="cell in value.items" :key="cell.id">
                            <uv-cell :title="cell.name" size="large" @click="onFriendClick(cell)" />
                        </view>
                    </uv-index-item>
                </template>
            </uv-index-list>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">{
    "layout": "blank",
    "style": {
        "navigationBarTitleText": "选择亲友"
    }
}</route>