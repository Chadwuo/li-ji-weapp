<script setup>
const top = uni.getMenuButtonBoundingClientRect().top
</script>

<template>
  <div :style="{ height: `${top || 25}px` }" />
</template>

<style lang="scss" scoped></style>
