<script setup lang="ts">
onLaunch(async () => {
  try {
    const authStore = useAuthStore()
    if (!authStore.isLogin) {
      await authStore.login()
    }
  }
  catch (error) {
    console.error(error)
    uni.redirectTo({
      url: `/pages/exception/500?error=${error}`,
    })
  }

  // uni.redirectTo({
  //   url: `/pages/migrate/index`,
  // })
})
onShow(() => {
})

onHide(() => {
})
</script>
