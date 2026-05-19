<script setup>
definePage({
  style: {
    navigationBarTitleText: '个性化',
  },
})
</script>

<template>
  <div>
    <wd-cell title="亲友标签" is-link to="/pages/friend/tag.vue" size="large">
      <template #prefix>
        <div class="i-hugeicons-customize mr-2 text-lg text-red" />
      </template>
    </wd-cell>
  </div>
</template>

<style lang="scss" scoped>

</style>
