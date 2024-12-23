<script setup lang="ts">
onLaunch(async () => {
  try {
    const authStore = useAuthStore()
    await authStore.login()
    await authStore.getUserInfo()
    throw new Error('test')
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
