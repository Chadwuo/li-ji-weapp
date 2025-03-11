<script setup lang="ts">
import { storeToRefs } from 'pinia'

const instance: any = getCurrentInstance()
const eventChannel = instance.proxy.getOpenerEventChannel()

const { searchHistory } = storeToRefs(useAppStore())
const keyword = ref<string>('')
const search = () => {
  eventChannel.emit('acceptDataFromOpenedPage', keyword.value)
  searchHistory.value?.push(keyword.value)
  uni.navigateBack()
}
const cancel = () => {
  eventChannel.emit('acceptDataFromOpenedPage', '')
  uni.navigateBack()
}

const onClear = () => {
  searchHistory.value = []
}
const onSearch = (keyword: string) => {
  eventChannel.emit('acceptDataFromOpenedPage', keyword)
  uni.navigateBack()
}
</script>

<template>
  <wd-search v-model="keyword" light maxlength="10" focus placeholder="请输入亲友姓名/关键词" @search="search" @cancel="cancel" />
  <div v-if="searchHistory?.length" class="mx-3">
    <div class="my-2 flex justify-between">
      <div class="text-lg font-bold">
        搜索历史
      </div>
      <i class="i-hugeicons-delete-02 text-lg" @click="onClear" />
    </div>
    <div class="space-x-lg">
      <wd-tag v-for="(item, index) in searchHistory" :key="index" round @click="onSearch(item)">
        {{ item }}
      </wd-tag>
    </div>
  </div>
</template>

<style scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "搜索"
  }
}
</route>
