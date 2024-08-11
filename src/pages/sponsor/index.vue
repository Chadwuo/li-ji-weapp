<script setup>
</script>

<template>
  <div class="mt-5">
    <div class="indent-8 text-sm leading-relaxed">
      "礼记"作为一个开放共享的项目，一直以来都致力于为用户提供高质量的服务与体验。由于项目的持续运行需要较大的资源投入，我们不得不在部分页面引入了少量广告以支持日常运营。
    </div>
    <div class="mt-2 indent-8 text-sm leading-relaxed">
      我们理解即使极少的广告也可能会影响到您的使用体验，为此，我们在<text class="text-red" @click="router.push('/pages/settings/index')">
        设置
      </text>中提供了关闭广告的功能。如果您希望支持“礼记”，让这个社区继续成长并为更多人服务，请考虑保持广告开启状态。
    </div>
  </div>
  <Advertisement class="mt-auto" adtyle="video" />
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "支持礼记"
  }
}
</route>
