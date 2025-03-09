<script setup lang="ts">
const friendsList = ref<Array<{ index: string, data: Array<Api.Friend> }>>()
const search = ref({
  keyword: '',
  tag: '',
  showAction: false,
})

const loadData = async () => {
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
const paddingTop = uni.getMenuButtonBoundingClientRect().top + 1
</script>

<template>
  <div class="h-full bg-[url('https://poemcode.cn/liji-oss/assets/bg/bg_friend.png')] bg-contain bg-no-repeat" :style="{ 'padding-top': `${paddingTop}px` }">
    <div class="mx-3">
      <wd-search v-model="search.keyword" custom-class="!p-0 w-52" :hide-cancel="!search.showAction" light placeholder-left
                 @search="searchOk" @cancel="searchCancel" @focus="search.showAction = true"
      />
      <div class="mt-2 flex items-center justify-between">
        <div class="ms-2 text-lg font-bold">
          亲友
        </div>
        <div class="p-2" @click="onFriendClick()">
          <i class="i-hugeicons-plus-sign-circle text-lg text-red" />
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
