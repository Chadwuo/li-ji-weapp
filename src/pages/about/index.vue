<script setup lang="ts">
const appStore = useAppStore()
const version = appStore.version
</script>

<template>
  <div class="bg-[url('https://liji.poemcode.cn/oss/assets/bg/bg_about.webp')] bg-contain bg-no-repeat">
    <div class="mx-10">
      <div class="w-20 pt-12 text-center">
        <img class="h-20 w-20" src="/static/logo.png">
        <div class="mt-5 text-xl font-bold">
          礼记
        </div>
        <div class="mt-2 text-xs text-gray">
          当前版本 {{ version }}
        </div>
      </div>
      <div class="pt-12 leading-loose">
        指尖的轻触
        <br>
        系住年轮诗意的轨迹
        <br>
        云端织就人情的绸缎
        <br>
        让礼记替我们留下爱的份量
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>
