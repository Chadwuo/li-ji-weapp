<script setup>
import { list } from '~/alicloud/services/friend'

const friendsList = ref([])
const search = ref({
  keyword: '',
  showAction: false,
})
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
function loadData() {
  list({ keyword: search.value.keyword }).then((res) => {
    // 根据首字母firstLetter进行分组
    const map = new Map()
    res.result.forEach((item) => {
      const key = item.firstLetter.toUpperCase()
      if (!map.has(key))
        map.set(key, [])

      map.get(key).push(item)
    })

    const keys = Array.from(map.keys()).sort()
    friendsList.value = keys.map(key => ({
      letter: key,
      items: map.get(key),
    }))
  })
}
onLoad(() => {
  loadData()
})

let instance = null
onMounted(() => {
  instance = getCurrentInstance().proxy
})
function onFriendClick(e) {
  const eventChannel = instance.getOpenerEventChannel()
  eventChannel.emit('acceptDataFromOpenedPage', {
    friendId: e._id,
    friendName: e.name,
  })
  uni.navigateBack()
}
</script>

<template>
  <div>
    <div class="bg-white px-5 pb-3">
      <uv-search
        v-model="search.keyword" placeholder="请输入搜索内容" :show-action="search.showAction" action-text="取消"
        @focus="search.showAction = true" @custom="searchCancel" @search="searchOk"
      />
    </div>
    <div>
      <uv-index-list custom-nav-height="90" :index-list="friendsList.map(i => i.letter)" active-color="#f87171">
        <template v-for="(value, key) of friendsList" :key="key">
          <uv-index-item>
            <uv-index-anchor :text="value.letter" />
            <view v-for="cell in value.items" :key="cell._id">
              <uv-cell :title="cell.name" size="large" @click="onFriendClick(cell)" />
            </view>
          </uv-index-item>
        </template>
      </uv-index-list>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
    "layout": "blank",
    "style": {
        "navigationBarTitleText": "选择亲友"
    }
}
</route>
