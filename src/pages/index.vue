<script setup>
import { onLoad } from '@dcloudio/uni-app'
import mpserverless from "~/alicloud/releases";
import logo from '~/static/logo.png'

import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
const { userInfo } = storeToRefs(useUserStore())


onMounted(() => {
  setTimeout(() => {
    userInfo.value = {
      nickName: 'chadwuo',
      avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }
    router.push({
      path: '/pages/book/index',
      tabBar: true
    })
  }, 2000)
})

onLoad(async () => {
  console.log('loaded')
  const db = mpserverless.db;
  console.log('object :>> ', db);
  const res = await mpserverless.user.getInfo();
  console.log('user info', res);
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