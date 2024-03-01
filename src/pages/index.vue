<script setup>
import logo from '~/static/logo.png'
</script>

<template>
  <div>
    <div flex flex-col style="height: 90vh;">
      <img h-14 w-14 m-auto :src="logo" />
    </div>
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