<script setup lang="ts">
import { friendCategory } from '@/constants/app'

const columns = friendCategory.map(i => ({ name: i, value: i }))
const instance: any = getCurrentInstance()
const eventChannel = instance.proxy.getOpenerEventChannel()
const friendsList = ref<Array<{ index: string, data: Array<Api.Friend> }>>()
const search = ref({
  keyword: '',
  tag: '',
  showAction: false,
})
const loadData = () => {
  apiFriendListGet({
    keyword: search.value.keyword,
    tag: search.value.tag,
  }).then((res) => {
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
        index: key,
        data: map.get(key),
      }))
    }
  })
}
onLoad(() => {
  loadData()
})

function onFriendClick(e: Api.Friend) {
  eventChannel.emit('acceptDataFromOpenedPage', e)
  uni.navigateBack()
}

const onTabsClick = (item: any) => {
  search.value.tag = item.value
  loadData()
}

function searchOk() {
  loadData()
}
function searchCancel() {
  search.value = {
    keyword: '',
    tag: '',
    showAction: false,
  }
  loadData()
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div>
      <wd-search v-model="search.keyword" light :hide-cancel="!search.showAction" placeholder="请输入搜索内容" placeholder-left
                 @search="searchOk" @cancel="searchCancel" @focus="search.showAction = true"
      />
      <uv-tabs :list="columns" line-color="#f87171" @click="onTabsClick" />
    </div>
    <div class="grow">
      <div v-if="friendsList?.length === 0" class="my-24">
        <uv-empty />
      </div>
      <wd-index-bar sticky>
        <div v-for="item in friendsList" :key="item.index">
          <wd-index-anchor :index="item.index" />
          <wd-cell v-for="cell in item.data" :key="cell.id" clickable border :title="cell.name"
                   @click="onFriendClick(cell)"
          />
        </div>
      </wd-index-bar>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "选择亲友"
  }
}
</route>
