<script setup lang="ts">
import { usePagination } from 'alova/client'

const keyword = ref<string>('')
const { loading, page, data: dataList, isLastPage } = usePagination((page, pageSize) => apiBookItemPageGet({ page, pageSize, keyword: keyword.value }), {
  data: response => response.items || [],
  append: true,
  immediate: false,
  watchingStates: [keyword],
  preloadPreviousPage: false,
  preloadNextPage: false,
})

const onClick = (gid?: string) => {
  if (gid) {
    uni.navigateTo({
      url: `/pages/bookitem/detail?id=${gid}`,
    })
  }
}

const onCancel = () => {
  uni.navigateBack()
}

onLoad((options: any) => {
  keyword.value = options.keyword
})
onReachBottom(() => {
  if (loading.value || isLastPage.value)
    return
  page.value++
})
</script>

<template>
  <div>
    <div class="fixed right-0 top-0 z-9 w-full uni-h5:top-40px">
      <wd-search v-model="keyword" :maxlength="20" focus placeholder="请输入亲友姓名/关键词"
                 @cancel="onCancel"
      />
    </div>
    <div class="mt-10">
      <div v-if="loading" class="flex justify-center py-3">
        <wd-loading color="#f87171" />
      </div>
      <div v-for="(item, index) in dataList" :key="item.id" @click="onClick(item.id)">
        <uv-divider v-if="index" />
        <div class="flex justify-between text-lg">
          <div>
            {{ item.friendName }}
          </div>
          <div class="text-red font-bold">
            +{{ item.money }}
          </div>
        </div>
        <div class="line-clamp-1 text-sm text-gray">
          {{ item.title }}
        </div>
        <div class="mt-1 text-xs text-gray">
          <span>{{ item.lunarDate }}</span>
          <span class="ml-2">({{ item.date }}) </span>
        </div>
      </div>
      <wd-loadmore :state="loading ? 'loading' : isLastPage ? 'finished' : ''" :loading-props="{ color: '#f87171' }" />
    </div>
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "搜索结果"
  }
}
</route>
