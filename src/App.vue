<script setup lang="ts">
onLaunch(async () => {
  try {
    const authStore = useAuthStore()
    await authStore.login()
    await authStore.getUserInfo()
  }
  catch {
    wx.redirectTo({
      url: '/pages/exception/500',
    })
  }
})
onShow(() => {
})

onHide(() => {
})
</script>
