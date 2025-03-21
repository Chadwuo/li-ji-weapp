<script setup lang="ts">
const friendsList = ref<Array<{ index: string, data: Array<Api.Friend> }>>()
const search = ref({
  keyword: '',
  tag: '',
})
const loadData = async () => {
  apiFriendListGet({
    ...search.value,
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

onShow(() => {
  loadData()
})

onPullDownRefresh(async () => {
  await loadData()
  uni.stopPullDownRefresh()
})

const onTabsClick = (item: any) => {
  search.value.tag = item.value
  loadData()
}

const onFriendClick = (id?: string) => {
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

const performSearch = () => {
  uni.navigateTo({
    url: '/pages/search/index',
    events: {
      acceptDataFromOpenedPage(e: string) {
        search.value.keyword = e
        loadData()
      },
    },
  })
}
</script>

<template>
  <div class="h-full bg-[url('https://liji.poemcode.cn/oss/assets/bg/bg_friend.png')] bg-contain bg-no-repeat">
    <safe-area-inset-top />
    <div class="mx-3">
      <div class="w-36 flex items-center rounded-full bg-white p-1 px-2 text-gray" @click="performSearch()">
        <i class="i-hugeicons-search-02" />
        <div class="ms-1">
          搜索人情往来
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between">
        <div class="ms-2 text-2xl text-red font-bold">
          亲友
        </div>
        <div class="py-2 ps-2" @click="onFriendClick()">
          <i class="i-hugeicons-plus-sign-circle text-xl text-red" />
        </div>
      </div>
      <uv-tabs :list="useAuthStore().friendTabsList" line-color="#f87171" @click="onTabsClick" />
    </div>
    <div class="grow">
      <div v-if="friendsList?.length === 0" class="my-24">
        <uv-empty text="还没有亲友记录哦~" mode="favor">
          <div class="mt-6">
            <wd-button class="mt-6" type="primary" @click="onFriendClick()">
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
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationStyle": "custom",
    "enablePullDownRefresh": true
  }
}
</route>
