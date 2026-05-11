<script setup lang="ts">
const bgClass = ref('')

function updateBgClass() {
  const pages = getCurrentPages()
  const currentPagePath = pages[pages.length - 1]?.route
  bgClass.value = currentPagePath ? `${currentPagePath.split('/')[1]}-page` : ''
}

onLoad(updateBgClass)
onShow(updateBgClass)
</script>

<template>
  <wd-toast />
  <wd-dialog />
  <wd-notify />
  <div class="h-full flex flex-col font-sans" :class="bgClass">
    <div class="grow">
      <slot />
    </div>
    <Footer />
    <uv-safe-bottom />
  </div>
</template>

<style lang="scss" scoped>
.index-page {
  background:
    linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, #efefef 100%) top / 100% 38vh no-repeat,
    radial-gradient(circle at 84% 0%, rgba(45, 212, 191, 0.16), transparent 35%) top / 100% 33vh no-repeat,
    radial-gradient(circle at 10% 8%, rgba(248, 113, 113, 0.22), transparent 34%) top / 100% 33vh no-repeat,
    linear-gradient(150deg, #fff5f5 0%, #ffffff 50%, #f0fdfa 100%) top / 100% 33vh no-repeat,
    #efefef;
}

.friend-page {
  background:
    linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, #efefef 100%) top / 100% 38vh no-repeat,
    radial-gradient(circle at 84% 0%, rgba(103, 232, 249, 0.17), transparent 35%) top / 100% 33vh no-repeat,
    radial-gradient(circle at 10% 8%, rgba(248, 113, 113, 0.2), transparent 34%) top / 100% 33vh no-repeat,
    linear-gradient(150deg, #fff5f5 0%, #ffffff 50%, #ecfeff 100%) top / 100% 33vh no-repeat,
    #efefef;
}

.mine-page {
  background:
    linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, #efefef 100%) top / 100% 38vh no-repeat,
    radial-gradient(circle at 82% 0%, rgba(244, 114, 182, 0.15), transparent 35%) top / 100% 33vh no-repeat,
    radial-gradient(circle at 10% 8%, rgba(248, 113, 113, 0.22), transparent 34%) top / 100% 33vh no-repeat,
    linear-gradient(150deg, #fff1f2 0%, #ffffff 50%, #fdf2f8 100%) top / 100% 33vh no-repeat,
    #efefef;
}

.stats-page {
  background:
    linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, #efefef 100%) top / 100% 38vh no-repeat,
    radial-gradient(circle at 84% 0%, rgba(96, 165, 250, 0.15), transparent 35%) top / 100% 33vh no-repeat,
    radial-gradient(circle at 10% 8%, rgba(248, 113, 113, 0.2), transparent 34%) top / 100% 33vh no-repeat,
    linear-gradient(150deg, #fff5f5 0%, #ffffff 50%, #eff6ff 100%) top / 100% 33vh no-repeat,
    #efefef;
}

.about-page {
  background: linear-gradient(145deg, #fff7f7 0%, #ffffff 46%, #eef9fb 100%);
}
</style>
