<script setup lang="ts">
const friendsList = ref<Array<{ index: string, data: Array<Api.Friend> }>>()
const search = reactive({
  keyword: '',
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

const addNew = () => {
  uni.navigateTo({
    url: '/pages/friend/edit',
  })
}

const onFriendClick = (id?: string) => {
  uni.navigateTo({
    url: `/pages/friend/detail?id=${id}`,
  })
}

const handleSearch = (input: any) => {
  search.keyword = input.keyword || ''
  search.tag = input.tag || ''
}

watch(search, () => {
  loadData()
})

defineExpose({
  handleSearch,
  loadData,
})
</script>

<template>
  <div>
    <div v-if="friendsList?.length === 0" class="my-24">
      <uv-empty v-if="!search.keyword" text="还没有亲友记录哦~" mode="favor">
        <div class="mt-6">
          <wd-button class="mt-6" type="primary" @click="addNew()">
            添加亲友
          </wd-button>
        </div>
      </uv-empty>
      <uv-empty v-else mode="search" />
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
