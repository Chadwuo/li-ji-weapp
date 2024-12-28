<script setup lang="ts">
const friendsList = ref<Array<{ letter: string; items: Array<Api.Friend> }>>()
const search = ref({
  keyword: '',
  showAction: false,
})

onLoad(() => {
  loadData()
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

const onFriendClick = (id?: number) => {
  if (!id) {
    uni.navigateTo({
      url: '/pages/friend/edit',
    })
  }
  else {
    uni.navigateTo({
      url: `/pages/friend/detail?id=${id}`,
    })
  }
}
</script>

<template>
  <div>
    <uv-navbar placeholder>
      <template #left>
        <div class="flex items-center">
          <div class="ms-2 text-lg font-bold">
            亲友
          </div>
          <div class="p-2" @click="onFriendClick">
            <div class="i-carbon-add-alt text-red" />
          </div>
        </div>
      </template>
    </uv-navbar>
    <div class="bg-white px-5 pb-3">
      <uv-search v-model="search.keyword" placeholder="请输入搜索内容" :show-action="search.showAction" action-text="取消"
        @focus="search.showAction = true" @custom="searchCancel" @search="searchOk" />
    </div>
    <div>
      <uv-index-list custom-nav-height="90" :index-list="friendsList?.map((i) => i.letter)" active-color="#f87171">
        <template v-for="(value, key) of friendsList" :key="key">
          <uv-index-item>
            <uv-index-anchor :text="value.letter" />
            <view v-for="cell in value.items" :key="cell.id">
              <uv-cell :title="cell.name" size="large" @click="onFriendClick(cell.id)" />
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
    "navigationStyle": "custom"
  }
}</route>
