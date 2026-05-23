import { friendCategory } from '@/constants/app'

const friendTags = ref<Array<Api.FriendTag>>([])

const friendTagPickerColumns = computed(() => {
  return [
    ...friendCategory.map(item => ({ label: item, value: item })),
    ...friendTags.value.map(item => ({ label: item.name, value: item.name })),
  ]
})

const friendTabsList = computed(() => {
  return [{ name: '全部', value: '' }, ...friendCategory.map(item => ({ name: item, value: item })), ...friendTags.value.map(item => ({ name: item.name, value: item.name }))]
})

const loadFriendTags = async () => {
  friendTags.value = await apiFriendTagListGet()
  return friendTags.value
}

export function useFriendTags() {
  return {
    friendTags,
    friendTagPickerColumns,
    friendTabsList,
    loadFriendTags,
  }
}
