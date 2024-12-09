<script setup lang="ts">
onLaunch(async () => {
  try {
    await useAuthStore().login()
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
