<template>
  <div>
    <div class="text-center mt-6 mb-4">
      <img class="h-14 w-14 m-auto" :src="logo" />
      <div class="my-3">
        <div class="text-2xl font-bold">礼记</div>
        <div class="mt-2 text-gray">v{{ version || '1.0.0' }}</div>
      </div>
    </div>
    <div class="indent-8 leading-relaxed">
      礼尚往来，是中华民族的传统美德，老一辈人一般会在举行宴席的时候用手写人情簿的方式来记录每一个亲友的礼金。这种方式存在很多弊端，比如人情簿丢失、无法携带在身边、很难搜索到某个人的送礼记录、由于手写原因无法辨认清楚内容等等。
    </div>
    <div class="indent-8 leading-relaxed">
      「礼记」致力于记录和管理人情往来中的随礼、礼金、份子钱、送礼、收礼，专业又懂你的人情记账簿，全家人共享账本，多维度查询统计亲友间往来记录。每一份人情都值得礼记。
    </div>
  </div>
</template>

<script setup>
import logo from '~/static/logo.png'
const accountInfo = uni.getAccountInfoSync();
const version = accountInfo.plugin.version
</script>

<style lang="scss" scoped></style>

<route lang="json">{
  "style": {
    "navigationBarTitleText": "关于礼记"
  }
}</route>