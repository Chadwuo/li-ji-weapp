<script setup lang="ts">
const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'select', value: Api.Friend): void
}>()

const popupVisible = computed({
  get: () => props.visible,
  set: value => emit('update:visible', value),
})

const friendsList = ref<Array<{ index: string, data: Array<Api.Friend> }>>([])
const search = ref({
  keyword: '',
  tag: '',
  showAction: false,
})
const { friendTabsList, loadFriendTags } = useFriendTags()

const loadData = async () => {
  const data = await apiFriendListGet({
    keyword: search.value.keyword,
    tag: search.value.tag,
  })

  const map = new Map<string, Array<Api.Friend>>()
  data?.forEach((item) => {
    const key = item.firstLetter?.toUpperCase() || '#'
    if (!map.has(key))
      map.set(key, [])

    map.get(key)?.push(item)
  })

  const keys = Array.from(map.keys()).sort()
  friendsList.value = keys.map(key => ({
    index: key,
    data: map.get(key) || [],
  }))
}

watch(popupVisible, async (visible) => {
  if (!visible)
    return

  await loadFriendTags()
  await loadData()
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

function onFriendClick(friend: Api.Friend) {
  emit('select', friend)
  popupVisible.value = false
}
</script>

<template>
  <wd-popup
    v-model="popupVisible"
    position="bottom"
    closable
    safe-area-inset-bottom
    custom-class="friend-selector-popup"
  >
    <div class="friend-selector">
      <div class="px-4 pb-2 pt-4 text-center text-base font-bold">
        选择亲友
      </div>
      <wd-search
        v-model="search.keyword"
        :hide-cancel="!search.showAction"
        placeholder="请输入搜索内容"
        placeholder-left
        light
        @search="searchOk"
        @cancel="searchCancel"
        @focus="search.showAction = true"
      />
      <uv-tabs
        :list="friendTabsList"
        line-width="0"
        line-height="0"
        :active-style="{
          color: '#f87171',
          fontWeight: 'bold',
          transform: 'scale(1.1)',
        }"
        :inactive-style="{
          color: '#606266',
          transform: 'scale(1)',
        }"
        item-style="height: 35px;"
        @click="onTabsClick"
      />
      <div class="friend-selector__body">
        <div v-if="friendsList.length === 0" class="py-16">
          <wd-empty />
        </div>
        <wd-index-bar v-else sticky>
          <div v-for="item in friendsList" :key="item.index">
            <wd-index-anchor :index="item.index" />
            <wd-cell
              v-for="cell in item.data"
              :key="cell.id"
              clickable
              border
              :title="cell.name"
              @click="onFriendClick(cell)"
            />
          </div>
        </wd-index-bar>
      </div>
    </div>
  </wd-popup>
</template>

<style lang="scss" scoped>
:deep(.friend-selector-popup) {
  height: 520px;
  border-radius: 24px 24px 0 0;
}

.friend-selector {
   height: 520px;
  display: flex;
  flex-direction: column;
}

.friend-selector__body {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
}
</style>
