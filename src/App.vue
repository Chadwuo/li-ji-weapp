<script setup lang="ts">
onLaunch(async () => {
  console.log("App Launch");
  try {
    await useAuthStore().login();
  } catch (error) {
    console.log("App Launch Error :>> ", error);
    wx.redirectTo({
      url: "/pages/exception/500",
    });
  }
});
onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});
</script>
