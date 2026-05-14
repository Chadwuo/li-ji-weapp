<script setup lang="ts">
definePage({
  style: {
    navigationStyle: 'custom',
  },
})

const version = ref('5.0.0')
// #ifdef MP-WEIXIN
version.value = uni.getAccountInfoSync().miniProgram.version
// #endif
const handleClickLeft = () => {
  uni.navigateBack()
}
</script>

<template>
  <div class="min-h-full overflow-hidden bg-contain bg-no-repeat">
    <safe-area-inset-top />
    <wd-navbar left-arrow custom-style="background-color: transparent !important;" @click-left="handleClickLeft" />
    <div class="mx-10">
      <div class="w-20 pt-12 text-center">
        <img class="h-20 w-20 drop-shadow-[0_12px_24px_rgba(248,113,113,0.16)]" src="/static/logo.png">
        <div class="mt-5 text-xl text-[#1f2937] font-bold">
          礼记
        </div>
        <div class="mt-2 text-xs text-[#6b7280]">
          当前版本 {{ version }}
        </div>
      </div>
      <div class="pt-12 text-[#374151] leading-loose">
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
