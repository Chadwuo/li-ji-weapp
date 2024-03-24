<script setup>
import logo from '~/static/logo.png'
</script>

<template>
  <div class="flex flex-col h-full">
    <img class="h-14 w-14 m-auto" :src="logo" />
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