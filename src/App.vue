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
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error) || '未知错误'
    uni.reLaunch({ url: `/pages/exception/500?error=${encodeURIComponent(errorMessage)}` })
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
