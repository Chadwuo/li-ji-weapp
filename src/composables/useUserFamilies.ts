const userFamilies = ref<Array<Api.UserFamily>>()

const loadUserFamilies = async () => {
  userFamilies.value = await apiUserFamilyListGet()
  return userFamilies.value
}

export function useUserFamilies() {
  return {
    userFamilies,
    loadUserFamilies,
  }
}
