<script setup>
definePage({
  style: {
    navigationBarTitleText: '个性化',
  },
})
</script>

<template>
  <div>
    <wd-cell title="亲友标签" is-link to="/pages/friend/tag" size="large">
      <template #prefix>
        <div class="i-hugeicons-customize mr-2 text-lg text-red" />
      </template>
    </wd-cell>
    <wd-cell title="回收站" is-link to="/pages/recycle/index" size="large">
      <template #prefix>
        <div class="i-hugeicons-recycle-02 mr-2 text-lg text-red" />
      </template>
    </wd-cell>
  </div>
</template>

<style lang="scss" scoped>

</style>
