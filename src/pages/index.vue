<script setup>
import { onLoad } from '@dcloudio/uni-app'
import logo from '~/static/logo.png'

import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
const { userInfo } = storeToRefs(useUserStore())


onMounted(() => {
  console.log('object :>> ', userInfo.value);
  // TODO: 监听用户信息变化，正确获取到用户信息后，跳转到首页
  router.push({
    path: '/pages/book/index',
    tabBar: true
  })
})

</script>

<template>
  <div>
    <div flex flex-col style="height: 90vh;">
      <image h-14 w-14 m-auto :src="logo" />
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