import { friendCategory } from '@/constants/app'

const friendTags = ref<Array<Api.FriendTag>>([])

const friendTagPickerColumns = computed(() => {
  return [
    ...friendCategory.map(item => ({ label: item, value: item })),
    ...friendTags.value.map(item => ({ label: item.name, value: item.name })),
  ]
})

const friendTabsList = computed(() => {
  return ['全部', ...friendCategory, ...friendTags.value.map(item => item.name)]
    .map(item => ({ name: item, value: item }))
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
