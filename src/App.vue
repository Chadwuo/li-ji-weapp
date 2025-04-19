<script setup lang="ts">
onLaunch(async () => {
  uni.showLoading({
    title: '加载中...',
  })

  try {
    const authStore = useAuthStore()
    if (!authStore.isLogin) {
      uni.navigateTo({
        url: '/pages/welcome/index',
      })
    }
    else {
      await authStore.setupApp()
    }
  }
  catch (error) {
    console.error(error)
    uni.redirectTo({
      url: `/pages/exception/500?error=${error}`,
    })
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
