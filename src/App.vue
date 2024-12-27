<script setup lang="ts">
onLaunch(async () => {
  try {
    const authStore = useAuthStore()
    // await authStore.login()
    await authStore.getUserInfo()
  }
  catch (error) {
    console.error(error)
    uni.redirectTo({
      url: `/pages/exception/500?error=${error}`,
    })
  }
})
onShow(() => {
})

onHide(() => {
})
</script>
