<script setup lang="ts">
const friendsList = ref<Array<{ index: string, data: Array<Api.Friend> }>>()
const search = ref({
  keyword: '',
  showAction: false,
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
        index: key,
        data: map.get(key),
      }))
    }
  })
}
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
    <wd-navbar safe-area-inset-top custom-style="background-color: transparent !important;">
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
    </wd-navbar>
    <div>
      <wd-search v-model="search.keyword" custom-class="background-color: transparent" light :hide-cancel="!search.showAction" placeholder="请输入搜索内容" placeholder-left
                 @search="searchOk" @cancel="searchCancel" @focus="search.showAction = true"
      />
      <div>
        <wd-index-bar sticky>
          <div v-for="item in friendsList" :key="item.index">
            <wd-index-anchor :index="item.index" />
            <wd-cell v-for="cell in item.data" :key="cell.id" clickable border :title="cell.name"
                     @click="onFriendClick(cell.id)"
            />
          </div>
        </wd-index-bar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "layout": "blank",
  "style": {
    "navigationStyle": "custom"
  }
}
</route>
