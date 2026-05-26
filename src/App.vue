<script setup lang="ts">
onLaunch(async () => {
  uni.showLoading({
    title: '加载中...',
  })
  await useAuthStore().loadUserInfo().finally(() => {
    uni.hideLoading()
  })
})

onShow(() => {
})

onHide(() => {
})
</script>
