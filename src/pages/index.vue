<script setup>
import logo from '~/static/logo.png'
</script>

<template>
  <div class="h-full flex flex-col">
    <img class="m-auto h-14 w-14" :src="logo">
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json" type="home">
{
  "style": {
    "navigationStyle": "custom"
  }
}
</route>
