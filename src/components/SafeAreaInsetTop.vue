<script setup>
let height = 25
// #ifdef MP-WEIXIN
const top = uni.getMenuButtonBoundingClientRect().top
if (top) {
  height = top
}
// #endif
</script>

<template>
  <div :style="{ height: `${height}px` }" />
</template>

<style lang="scss" scoped></style>
