<script setup>
definePage({
  style: {
    navigationBarTitleText: '小工具',
  },
})
</script>

<template>
  <div>
    <wd-cell title="万年历" is-link to="/pages/tools/calendar" size="large">
      <template #prefix>
        <div class="i-hugeicons-calendar-01 mr-2 text-lg" />
      </template>
    </wd-cell>
    <wd-cell title="择吉日" is-link to="/pages/tools/lucky-day" size="large">
      <template #prefix>
        <div class="i-hugeicons-calendar-love-02 mr-2 text-lg" />
      </template>
    </wd-cell>
  </div>
</template>

<style lang="scss" scoped>

</style>
