<script setup>
import { useWatcher } from 'alova/client'

const props = defineProps(['keyword'])
const emit = defineEmits(['selected'])
const { loading, data } = useWatcher(
  () => apiFriendListGet({
    keyword: props.keyword,
  }),
  [() => props.keyword],
  // {
  //   debounce: [300]
  // }
)

const friendSearchVisible = computed(() => {
  return data.value?.length > 0
})

const onSelect = (cell) => {
  emit('selected', cell)
  data.value = []
}
</script>

<template>
  <div v-show="friendSearchVisible"
       class="absolute left-30 z-9 w-46 border border-red rounded-xl border-solid bg-white p-2"
  >
    <wd-loading v-show="loading" color="#f87171" />
    <wd-cell v-for="cell in data" :key="cell.id" l clickable border :title="cell.name" @click="onSelect(cell)" />
  </div>
</template>

<style lang="scss" scoped></style>
