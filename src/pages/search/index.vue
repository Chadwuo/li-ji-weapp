<script setup lang="ts">
import { storeToRefs } from 'pinia'

const instance: any = getCurrentInstance()
const eventChannel = instance.proxy.getOpenerEventChannel()

const { searchHistory } = storeToRefs(useAppStore())
const keyword = ref<string>('')
function search() {
  eventChannel.emit('acceptDataFromOpenedPage', keyword.value)
  searchHistory.value?.push(keyword.value)
  uni.navigateBack()
}
const cancel = () => {
  uni.navigateBack()
}

const clear = () => {
  searchHistory.value = []
}
</script>

<template>
  <wd-search v-model="keyword" light maxlength="10" @search="search" @cancel="cancel" />
  <div v-if="searchHistory?.length" class="mx-3">
    <div class="my-2 flex justify-between">
      <div class="text-lg font-bold">
        搜索历史
      </div>
      <i class="i-hugeicons-delete-02 text-lg" @click="clear" />
    </div>
    <div class="space-x-lg">
      <wd-tag v-for="(item, index) in searchHistory" :key="index" round>
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
