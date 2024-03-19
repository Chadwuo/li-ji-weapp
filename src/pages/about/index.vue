<template>
  <div class="mx-5">
    <div class="text-center mt-6 mb-4">
      <img class="h-14 w-14 m-auto" :src="logo" />
      <div class="my-3">
        <div class="text-xl font-bold">礼记</div>
        <div class="mt-2 text-gray text-sm">v{{ version }}</div>
      </div>
    </div>
    <div class="indent-8 leading-relaxed text-sm">
      礼尚往来，是中华民族的传统美德，老一辈人一般会在举行宴席的时候用手写人情簿的方式来记录每一个亲友的礼金。这种方式存在很多弊端，比如人情簿丢失、无法携带在身边、很难搜索到某个人的送礼记录、由于手写原因无法辨认清楚内容等等。
    </div>
    <div class="indent-4 leading-relaxed text-sm mt-2">
      「礼记」致力于记录和管理人情往来中的随礼、礼金、份子钱、送礼、收礼，专业又懂你的人情记账簿，全家人共享账本，多维度查询统计亲友间往来记录。每一份人情都值得礼记。
    </div>
    <div class="bg-white rounded-xl mt-5 py-4">
      <uv-cell title="开发团队" isLink :border="false" url="/pages-sub/contributors/index"></uv-cell>
      <uv-cell title="开源协议" :border="false" value="GPL-3.0 license"></uv-cell>
    </div>
    <div class="bg-white rounded-xl mt-5 py-4">
      <uv-cell isLink :border="false">
        <template v-slot:title>
          <button class="uv-reset-button" open-type="contact">在线客服</button>
        </template>
      </uv-cell>
      <uv-cell isLink :border="false">
        <template v-slot:title>
          <button class="uv-reset-button" open-type="feedback">意见反馈</button>
        </template>
      </uv-cell>
    </div>
  </div>
</template>

<script setup>
import logo from '~/static/logo.png'
const { miniProgram } = uni.getAccountInfoSync();
const version = miniProgram.version || '3.0.0'
</script>

<style lang="scss" scoped></style>

<route lang="json">{
  "style": {
    "navigationBarTitleText": "关于礼记"
  }
}</route>