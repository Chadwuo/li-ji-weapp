<script setup lang="ts">
onLaunch(async () => {
  uni.showLoading({
    title: '加载中...',
  })
  try {
    const authStore = useAuthStore()
    authStore.userInfo = await apiUserInfoGet()
    authStore.userFamilys = await apiUserFamilyListGet()
    authStore.friendTags = await apiFriendTagListGet()
  }
  finally {
    uni.hideLoading()
  }
})

onShow(() => {
})

onHide(() => {
})
</script>
