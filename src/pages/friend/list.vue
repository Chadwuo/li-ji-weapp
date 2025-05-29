<script setup lang="ts">
import FriendList from './components/FriendList.vue'

const friendsListRef = ref<InstanceType<typeof FriendList> | null>(null)

onShow(() => {
  nextTick(() => {
    friendsListRef.value?.loadData()
  })
})

onPullDownRefresh(async () => {
  friendsListRef.value?.loadData()
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
  friendsListRef.value?.handleSearch({
    tag: item.value,
  })
}
</script>

<template>
  <div class="h-full bg-[url('https://liji.poetic.ltd/oss/assets/bg/bg_friend.png')] bg-contain bg-no-repeat">
    <safe-area-inset-top />
    <div class="mx-3">
      <div class="w-36 flex items-center rounded-full bg-white p-1 px-2 text-gray" @click="performSearch()">
        <i class="i-hugeicons-search-02" />
        <div class="ms-1">
          {{ '搜索人情往来' }}
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between">
        <div class="ms-2 text-2xl text-red font-bold">
          亲友
        </div>
        <div class="py-2 ps-2" @click="addNew()">
          <i class="i-hugeicons-plus-sign-circle text-xl text-red" />
        </div>
      </div>
    </div>
    <div>
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
    <friend-List ref="friendsListRef" />
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
