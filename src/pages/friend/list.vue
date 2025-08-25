<script setup lang="ts">
const friendsList = ref<Array<{ index: string, data: Array<Api.Friend> }>>()
const search = reactive({
  tag: '',
})
const loadData = async () => {
  const data = await apiFriendListGet({
    ...search,
  })
  // 根据首字母firstLetter进行分组
  const map = new Map()
  data?.forEach((item) => {
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
onShow(() => {
  loadData()
})

const addNew = () => {
  uni.navigateTo({
    url: '/pages/friend/edit',
  })
}
const performSearch = () => {
  uni.navigateTo({
    url: '/pages/search/index',
  })
}

const onTabsClick = (item: any) => {
  search.tag = item.value
  loadData()
}

const onFriendClick = (id?: string) => {
  uni.navigateTo({
    url: `/pages/friend/detail?id=${id}`,
  })
}
</script>

<template>
  <div class="h-full bg-[url('https://liji.poetic.ltd/oss/assets/bg/bg_friend.png')] bg-contain bg-no-repeat">
    <safe-area-inset-top />
    <div class="mx-3">
      <div class="text-2xl text-red font-bold">
        亲友
      </div>
      <div class="mt-3 flex items-center">
        <div class="w-full flex items-center rounded-full bg-white p-1 px-2 text-gray" @click="performSearch()">
          <i class="i-hugeicons-search-02" />
          <div class="ms-1">
            {{ '搜索人情往来' }}
          </div>
        </div>
        <div class="ms-3 text-xl text-red">
          <i class="i-hugeicons-plus-sign-circle" @click="addNew()" />
        </div>
      </div>
    </div>
    <div class="mt-3">
      <uv-tabs :list="useAuthStore().friendTabsList" line-width="0" line-height="0" :active-style="{
        color: '#f87171',
        fontWeight: 'bold',
        transform: 'scale(1.1)',
      }" :inactive-style="{
        color: '#606266',
        transform: 'scale(1)',
      }" item-style="height: 35px;" @click="onTabsClick"
      />
    </div>
    <div v-if="friendsList?.length === 0" class="my-24">
      <uv-empty text="还没有亲友记录哦~" mode="favor">
        <div class="mt-6">
          <wd-button class="mt-6" type="primary" @click="addNew()">
            添加亲友
          </wd-button>
        </div>
      </uv-empty>
    </div>
    <wd-index-bar sticky>
      <div v-for="item in friendsList" :key="item.index">
        <wd-index-anchor :index="item.index" />
        <wd-cell v-for="cell in item.data" :key="cell.id" clickable border :title="cell.name"
                 @click="onFriendClick(cell.id)"
        />
      </div>
    </wd-index-bar>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationStyle": "custom"
  }
}
</route>
